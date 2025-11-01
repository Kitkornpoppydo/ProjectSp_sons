using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Projectpi4.Models;

[ApiController]
[Route("api/[controller]")]
public class EstimateOrdersController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public EstimateOrdersController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] EstimateOrderRequest request)
    {
        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        conn.Open();

        string insertOrderSql = @"
        INSERT INTO estimate_orders (customer_name, customer_phone, customer_email, customer_address)
        VALUES (@name, @phone, @email, @address)
        RETURNING id";

        using var cmd = new NpgsqlCommand(insertOrderSql, conn);
        cmd.Parameters.AddWithValue("name", request.CustomerName);
        cmd.Parameters.AddWithValue("phone", request.CustomerPhone);
        cmd.Parameters.AddWithValue("email", (object?)request.CustomerEmail ?? DBNull.Value);
        cmd.Parameters.AddWithValue("address", (object?)request.CustomerAddress ?? DBNull.Value);
        int orderId = (int)cmd.ExecuteScalar();

        string productQuery = @"
        SELECT p.id, p.name, p.price_per_unit, pc.name AS product_category_name
        FROM products p
        INNER JOIN product_categories pc ON p.category_id = pc.id
        WHERE p.category_id = @categoryId
        LIMIT 1"; 

        foreach (var item in request.Items)
        {
            using var prodCmd = new NpgsqlCommand(productQuery, conn);
            prodCmd.Parameters.AddWithValue("categoryId", item.ProductId); 
            using var reader = prodCmd.ExecuteReader();

            if (!reader.Read())
            {
                return BadRequest($"Category id {item.ProductId} not found");
            }

            string category = reader.GetString(reader.GetOrdinal("product_category_name"));
            decimal pricePerUnit = reader.GetDecimal(reader.GetOrdinal("price_per_unit"));
            reader.Close();

            var calc = CalculatePrice(item.Width, item.Height, category, pricePerUnit);

            
            string insertItemSql = @"
            INSERT INTO estimate_items 
            (order_id, product_id, width, height, fabric_yard, fabric_price, labor_price, total_price)
            VALUES
            (@orderId, @productId, @width, @height, @yard, @fabricPrice, @laborPrice, @totalPrice)";

            using var insertCmd = new NpgsqlCommand(insertItemSql, conn);
            insertCmd.Parameters.AddWithValue("orderId", orderId);
            insertCmd.Parameters.AddWithValue("productId", item.ProductId); 
            insertCmd.Parameters.AddWithValue("width", Round2((decimal)item.Width));
            insertCmd.Parameters.AddWithValue("height", Round2((decimal)item.Height));
            insertCmd.Parameters.AddWithValue("yard", calc.Yard);
            insertCmd.Parameters.AddWithValue("fabricPrice", calc.FabricPrice);
            insertCmd.Parameters.AddWithValue("laborPrice", calc.LaborPrice);
            insertCmd.Parameters.AddWithValue("totalPrice", calc.TotalPrice);

            insertCmd.ExecuteNonQuery();
        }

        return Ok(new { orderId });
    }



    private (decimal Yard, decimal FabricPrice, decimal LaborPrice, decimal TotalPrice) CalculatePrice(
        float width, float height, string category, decimal pricePerUnit)
    {
        decimal fabricMultiplier = category switch // สำหรับคำนวนเพื่อออกเป็นหลา
        {
            "ม่านลอน" => 3.0M,
            "ม่านจีบ" => 2.5M,
            "ม่านพับ" => 1.0M,
            "ม่านม้วน" => 1.2M,
            "มูลี่" => 1.2M,
            "ฉากกั้นห้อง" => 1.2M,
        };

        decimal laborRate = category switch
        {
            "ม่านลอน" or "ม่านจีบ" => 650,
            "ม่านพับ" => 950,
            "ม่านม้วน" => 650,
            "มูลี่" => 650,
            "ฉากกั้นห้อง" => 1000,
        };

        decimal unitDivider = 0.90M; //สำหรับ ม่านลอน ม่านจีบ และม่านพับ
        decimal extra = 0.3M; //สำหรับม่านพับ


        decimal totalWidth = Round2((decimal)width);
        decimal totalHeight = Round2((decimal)height);



        decimal yard = 0;
        decimal fabricPrice = 0;
        decimal laborPrice = 0;
        decimal totalPrice = 0;

        if (category == "ม่านลอน" || category == "ม่านจีบ")
        {
            decimal length = totalWidth * fabricMultiplier;
            yard = length / unitDivider;
            fabricPrice = yard * pricePerUnit;
            laborPrice = totalWidth * laborRate;
            totalPrice = fabricPrice + laborPrice;
        }
        else if (category == "ม่านม้วน" || category == "มูลี่")
        {
            yard = totalWidth * totalHeight * fabricMultiplier;
            fabricPrice = yard * pricePerUnit;
            laborPrice = totalWidth * laborRate;
            totalPrice = fabricPrice + laborPrice;
        }
        else if (category == "ม่านพับ")
        {
            yard = (totalWidth + extra) / unitDivider;
            fabricPrice = yard * pricePerUnit;
            laborPrice = totalWidth * laborRate;
            totalPrice = fabricPrice + laborPrice;
        }
        else if (category == "ฉากกั้นห้อง")
        {
            yard = totalWidth * totalHeight * fabricMultiplier;
            fabricPrice = yard * pricePerUnit;
            laborPrice = totalWidth * laborRate;
            totalPrice = fabricPrice + laborPrice;
        }
       

        yard = Math.Round(yard, 2);
        fabricPrice = Math.Round(fabricPrice, 2);
        laborPrice = Math.Round(laborPrice, 2);
        totalPrice = Math.Round(totalPrice, 2);


        return (yard, fabricPrice, laborPrice, totalPrice);
    }

    private decimal Round2(decimal value) => Math.Round(value, 2);

    [HttpPost("preview")]
    public IActionResult PreviewCalculation([FromBody] EstimatePreviewRequest request)
    {
        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        conn.Open();

        decimal totalYard = 0;
        decimal totalFabricPrice = 0;
        decimal totalLaborPrice = 0;
        decimal totalPrice = 0;

        foreach (var item in request.Items)
        {
            string productQuery = @"
        SELECT p.id, p.name, p.price_per_unit, pc.name AS product_category_name
        FROM products p
        INNER JOIN product_categories pc ON p.category_id = pc.id
        WHERE p.category_id = @categoryId
        LIMIT 1";

            using var cmd = new NpgsqlCommand(productQuery, conn);
            cmd.Parameters.AddWithValue("categoryId", item.ProductId);
            using var reader = cmd.ExecuteReader();

            if (!reader.Read())
            {
                return BadRequest($"Category id {item.ProductId} not found");
            }

            string category = reader.GetString(reader.GetOrdinal("product_category_name"));
            decimal pricePerUnit = reader.GetDecimal(reader.GetOrdinal("price_per_unit"));
            reader.Close();

            var result = CalculatePrice(item.Width, item.Height, category, pricePerUnit);

            totalYard += result.Yard;
            totalFabricPrice += result.FabricPrice;
            totalLaborPrice += result.LaborPrice;
            totalPrice += result.TotalPrice;
        }

        return Ok(new
        {
            totalYard = Math.Round(totalYard, 2),
            totalFabricPrice = Math.Round(totalFabricPrice, 2),
            totalLaborPrice = Math.Round(totalLaborPrice, 2),
            totalPrice = Math.Round(totalPrice, 2)
        });
    }


}
