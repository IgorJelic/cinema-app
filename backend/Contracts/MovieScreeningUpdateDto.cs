using System.ComponentModel.DataAnnotations;

namespace Contracts;

public class MovieScreeningUpdateDto
{
    [Required]
    public DateTime ScreeningTime { get; set; }
    [Required]
    public int TicketPrice { get; set; }
    public Guid MovieId { get; set; }
}
