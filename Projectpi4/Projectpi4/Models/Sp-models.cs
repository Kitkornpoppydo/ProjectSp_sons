namespace Projectpi4.Models
{
    public class Stocks
    {
        public int Id { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string? Category { get; set; }
        public int Quantity { get; set; }
        public string? unit { get; set; }
        public string? Supplier { get; set; }
        public DateTime LastUpdate { get; set; } = DateTime.UtcNow;
    }
    public class StockTransaction
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
    public class ProductFormData
    {
        public string Name { get; set; }
        public decimal PricePerUnit { get; set; }
        public string Unit { get; set; }
        public string Color { get; set; }
        public int CategoryId { get; set; }
        public IFormFile Image { get; set; }
    }
    public class ProductCategoryCreateDto
    {
        public string Name { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
    public class ProductCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
    }
    public class PortfolioImage
    {
        public int portfolio_images_ID { get; set; }
        public string image_url { get; set; }
        public int portfolio_id { get; set; }
    }
     public class Portfolio
    {
        public int portfolios_ID { get; set; }
        public string project_name { get; set; }
        public string? description { get; set; }
        public DateTime created_at { get; set; }
    }
    public class EstimatePreviewRequest
    {
        public List<EstimateItemRequest> Items { get; set; } = new();
    }
     public class EstimateItemRequest
    {
        internal object catagoryId;

        public int ProductId { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
    }

    public class EstimateOrderRequest
{
    public string CustomerName { get; set; } = null!;
    public string CustomerPhone { get; set; } = null!;
    public string? CustomerEmail { get; set; }
    public string? CustomerAddress { get; set; }
    public List<EstimateItemRequest> Items { get; set; } = new();
}
}