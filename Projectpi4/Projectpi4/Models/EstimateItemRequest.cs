namespace Projectpi4.Models
{
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
