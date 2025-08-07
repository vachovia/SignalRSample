using System.ComponentModel.DataAnnotations;

namespace SignalRSample.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(255)]
        public string ItemName { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
