namespace Projectpi4.Models
{
    public class EstimateOrder
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CustomerLastname { get; internal set; }
    }
}
