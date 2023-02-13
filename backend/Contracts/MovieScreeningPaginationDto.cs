namespace Contracts;

public class MovieScreeningPaginationDto
{
    public List<MovieScreeningDto> Screenings { get; set; } = new List<MovieScreeningDto>();
    public int Pages { get; set; }
    public int CurrentPage { get; set; }
}
