namespace Projectpi4.Models
{
    public class Portfolio
    {
        public int portfolios_ID { get; set; }
        public string project_name { get; set; }
        public string? description { get; set; }
        public DateTime created_at { get; set; }
    }

}
