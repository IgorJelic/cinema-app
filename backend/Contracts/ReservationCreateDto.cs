using System.ComponentModel.DataAnnotations;

namespace Contracts;

public class ReservationCreateDto
{
    // [Required]
    public string UserEmail { get; set; }
    [Required]
    public int TotalPrice { get; set; }

    public Guid MovieScreening { get; set; }
    // public List<SeatDto> ChosenSeats { get; set; } = new List<SeatDto>();
    public List<Guid> ChosenSeats { get; set; } = new List<Guid>();
}
