namespace Domain.Entities;

public class Seat
{
    public Guid Id { get; set; }

    // prilikom rezervacije mesta
    // pretrazivacu prvo po moviescreening-u sva mesta (iz liste Seats)
    // i trazicu mesto sa odabranim redom i kolonom sedenja (labelom)
    public string Label { get; set; } // FORMAT: row_column
    public bool Available { get; set; } = true;
    
    // public MovieScreening MovieScreening { get; set; }
    public Reservation? Reservation { get; set; } // nullable
}
