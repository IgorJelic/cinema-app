namespace Contracts;

public class SeatDto
{
    public Guid Id { get; set; }
    public string Label { get; set; } // FORMAT: row_column
    public bool Available { get; set; } = true;
}
