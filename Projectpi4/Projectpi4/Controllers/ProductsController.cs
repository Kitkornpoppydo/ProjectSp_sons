using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using Projectpi4.Models;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IConfiguration _config;

    public ProductsController(IConfiguration config)
    {
        _config = config;
    }

    private NpgsqlConnection GetConnection() =>
        new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));

    [HttpGet]
    public IActionResult GetAll()
    {
        string query = @"
            SELECT 
                p.id, p.name, p.price_per_unit, p.unit, p.color, p.image,
                c.id AS category_id, c.name AS category_name
            FROM products p
            JOIN product_categories c ON p.category_id = c.id
            ORDER BY p.id";

        DataTable table = new DataTable();
        using var conn = GetConnection();
        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();
        table.Load(reader);

        var result = table.AsEnumerable().Select(row => table.Columns.Cast<DataColumn>().ToDictionary(
            col => col.ColumnName,
            col => row[col]
        )).ToList();

        return Ok(result);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] ProductFormData model)
    {
        string filePath = null;
        if (model.Image != null && model.Image.Length > 0)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(model.Image.FileName);
            var savePath = Path.Combine("wwwroot", "product", fileName);
            Directory.CreateDirectory(Path.GetDirectoryName(savePath));
            using var stream = new FileStream(savePath, FileMode.Create);
            await model.Image.CopyToAsync(stream);
            filePath = "/product/" + fileName;
        }

        string query = @"
            INSERT INTO products (name, price_per_unit, unit, color, image, category_id)
            VALUES (@name, @price, @unit, @color, @image, @category_id)";

        using var conn = GetConnection();
        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@name", model.Name);
        cmd.Parameters.AddWithValue("@price", model.PricePerUnit);
        cmd.Parameters.AddWithValue("@unit", model.Unit);
        cmd.Parameters.AddWithValue("@color", model.Color);
        cmd.Parameters.AddWithValue("@image", filePath ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@category_id", model.CategoryId);
        cmd.ExecuteNonQuery();

        return Ok("Product created successfully.");
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        string query = "DELETE FROM products WHERE id = @id";

        using var conn = GetConnection();
        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@id", id);
        cmd.ExecuteNonQuery();

        return Ok("Product deleted.");
    }
}
