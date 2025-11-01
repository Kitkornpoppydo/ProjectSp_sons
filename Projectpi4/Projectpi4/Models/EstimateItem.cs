namespace Projectpi4.Models
{
    public class EstimateItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public float Width { get; set; }
        public float Height { get; set; }
        public int Quantity { get; set; }
        public decimal CalculatedYard { get; set; }
        public decimal FabricPrice { get; set; }
        public decimal LaborPrice { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
