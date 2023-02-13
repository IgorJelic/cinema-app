namespace Contracts;

public class ReservationDto
{
    public Guid Id { get; set; }
    public string UserEmail { get; set; }
    public int TotalPrice { get; set; }

    public MovieScreeningDto MovieScreening { get; set; }
    public List<SeatDto> ChosenSeats { get; set; } = new List<SeatDto>();
}
