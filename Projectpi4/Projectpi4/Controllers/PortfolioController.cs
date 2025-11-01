using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using Projectpi4.Models;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public PortfolioController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public IActionResult GetAllPortfoliosWithImages()
    {
        var list = new List<object>();

        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        conn.Open();

        string sql = @"
        SELECT p.portfolios_ID, p.project_name, p.description, p.created_at,
               pi.image_url
        FROM portfolios p
        LEFT JOIN (
            SELECT DISTINCT ON (portfolio_id) * 
            FROM portfolio_images
            ORDER BY portfolio_id, portfolio_images_ID DESC
        ) pi ON pi.portfolio_id = p.portfolios_ID
        ORDER BY p.created_at DESC
    ";

        using var cmd = new NpgsqlCommand(sql, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            list.Add(new
            {
                portfolios_ID = reader.GetInt32(0),
                project_name = reader.GetString(1),
                description = reader.IsDBNull(2) ? "" : reader.GetString(2),
                created_at = reader.GetDateTime(3),
                image_url = reader.IsDBNull(4) ? null : reader.GetString(4)
            });
        }

        return Ok(list);
    }


    [HttpGet("{id}")]
    public IActionResult GetPortfolioWithImages(int id)
    {
        Portfolio? portfolio = null;
        var images = new List<PortfolioImage>();

        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        conn.Open();

        
        using (var cmd = new NpgsqlCommand("SELECT * FROM portfolios WHERE portfolios_ID = @id", conn))
        {
            cmd.Parameters.AddWithValue("id", id);
            using var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                portfolio = new Portfolio
                {
                    portfolios_ID = reader.GetInt32(0),
                    project_name = reader.GetString(1),
                    description = reader.IsDBNull(2) ? "" : reader.GetString(2),
                    created_at = reader.GetDateTime(3)
                };
            }
        }

        if (portfolio == null)
            return NotFound("Portfolio not found");

    
        using (var cmd = new NpgsqlCommand("SELECT * FROM portfolio_images WHERE portfolio_id = @id", conn))
        {
            cmd.Parameters.AddWithValue("id", id);
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                images.Add(new PortfolioImage
                {
                    portfolio_images_ID = reader.GetInt32(0),
                    image_url = reader.GetString(1),
                    portfolio_id = reader.GetInt32(2)
                });
            }
        }

        return Ok(new { portfolio, images });
    }


    [HttpPost]
    public IActionResult CreatePortfolio([FromBody] Portfolio portfolio)
    {
        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        conn.Open();

        using var cmd = new NpgsqlCommand("INSERT INTO portfolios (project_name, description) VALUES (@name, @desc) RETURNING portfolios_ID", conn);
        cmd.Parameters.AddWithValue("name", portfolio.project_name);
        cmd.Parameters.AddWithValue("desc", (object?)portfolio.description ?? DBNull.Value);

        var newId = cmd.ExecuteScalar();

        if (newId != null && int.TryParse(newId.ToString(), out int id))
        {
            return CreatedAtAction(nameof(GetPortfolioWithImages), new { id = id }, new { portfolios_ID = id });
        }
        else
        {
            return BadRequest("ไม่สามารถสร้างโปรเจกต์ได้");
        }
    }

    [HttpPost("upload-multiple")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadMultipleImages([FromForm] List<IFormFile> files, [FromForm] int portfolio_id)
    {
        if (files == null || files.Count == 0)
            return BadRequest("กรุณาเลือกไฟล์อย่างน้อย 1 รูป");

        var uploadedImages = new List<object>();
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
        Directory.CreateDirectory(uploadsFolder);

        using var conn = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        await conn.OpenAsync();

        foreach (var file in files)
        {
            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = $"/images/{uniqueFileName}";

            using var cmd = new NpgsqlCommand("INSERT INTO portfolio_images (image_url, portfolio_id) VALUES (@url, @pid) RETURNING portfolio_images_ID", conn);
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("url", imageUrl);
            cmd.Parameters.AddWithValue("pid", portfolio_id);

            var newId = await cmd.ExecuteScalarAsync();
            if (newId != null && int.TryParse(newId.ToString(), out int id))
            {
                uploadedImages.Add(new { portfolio_images_ID = id, image_url = imageUrl });
            }
        }

        return Ok(uploadedImages);
    }
    



}
