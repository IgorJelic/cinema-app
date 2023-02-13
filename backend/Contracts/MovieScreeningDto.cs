namespace Contracts;

public class MovieScreeningDto
{
    public Guid Id { get; set; }
    public DateTime ScreeningTime { get; set; }
    public int TicketPrice { get; set; }
    public int Rows { get; set; }
    public int Columns { get; set; }
    // public Guid MovieId { get; set; }
    public MovieDto Movie { get; set; }
    public List<SeatDto> Seats { get; set; } = new List<SeatDto>();
}
