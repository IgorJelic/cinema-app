using System.ComponentModel.DataAnnotations;

namespace Contracts;

public class MovieScreeningCreateDto
{
    [Required]
    public DateTime ScreeningTime { get; set; }
    [Required]
    public int TicketPrice { get; set; }
    [Required]
    public int Rows { get; set; }
    [Required]
    public int Columns { get; set; }
    public Guid MovieId { get; set; }

    // public MovieDto Movie { get; set; } = new MovieDto();
    
}
