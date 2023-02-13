namespace Domain.Entities;

public class MovieScreening
{
    public Guid Id { get; set; }
    public DateTime ScreeningTime { get; set; }
    public int TicketPrice { get; set; }
    public int Rows { get; set; }
    public int Columns { get; set; }
    public bool IsDeleted { get; set; } = false;

    public Guid MovieId { get;set; }
    public Movie Movie { get; set; }
    public List<Seat> Seats { get; set; } = new List<Seat>();
}
