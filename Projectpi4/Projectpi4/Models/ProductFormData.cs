namespace Projectpi4.Models
{
    public class ProductFormData
    {
        public string Name { get; set; }
        public decimal PricePerUnit { get; set; }
        public string Unit { get; set; }
        public string Color { get; set; }
        public int CategoryId { get; set; }
        public IFormFile Image { get; set; }
    }
}
