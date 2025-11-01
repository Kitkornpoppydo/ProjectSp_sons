using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Projectpi4.Models;
using System.Data;

[ApiController]
[Route("api/[controller]")]
public class ProductCategoriesController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public ProductCategoriesController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private NpgsqlConnection GetConnection()
    {
        return new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }

    [HttpGet("push-product")]
    public async Task<ActionResult<IEnumerable<ProductCategory>>> GetAll()
    {
        var list = new List<ProductCategory>();

        using var conn = GetConnection();
        await conn.OpenAsync();

        using var cmd = new NpgsqlCommand("SELECT id, name, image FROM product_categories ORDER BY id", conn);
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            list.Add(new ProductCategory
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Image = reader.IsDBNull(2) ? null : reader.GetString(2)
            });
        }

        return Ok(list);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult> Create([FromForm] ProductCategoryCreateDto dto)
    {
        string? imageUrl = null;

        if (dto.ImageFile != null && dto.ImageFile.Length > 0)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.ImageFile.CopyToAsync(stream);
            }

            imageUrl = $"/uploads/{uniqueFileName}";
        }

        using var conn = GetConnection();
        await conn.OpenAsync();

        var cmd = new NpgsqlCommand("INSERT INTO product_categories (name, image) VALUES (@name, @image)", conn);
        cmd.Parameters.AddWithValue("name", dto.Name);
        cmd.Parameters.AddWithValue("image", (object?)imageUrl ?? DBNull.Value);

        await cmd.ExecuteNonQueryAsync();

        return Ok(new { message = "Category created", image = imageUrl });
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        using var conn = GetConnection();
        await conn.OpenAsync();

        var cmd = new NpgsqlCommand("DELETE FROM product_categories WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("id", id);

        var rows = await cmd.ExecuteNonQueryAsync();
        if (rows == 0) return NotFound();

        return Ok(new { message = "Category deleted" });
    }
}
