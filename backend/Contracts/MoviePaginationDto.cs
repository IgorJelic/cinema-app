namespace Contracts;

public class MoviePaginationDto
{
    public List<MovieDto> Movies { get; set; } = new List<MovieDto>();
    public int Pages { get; set; }
    public int CurrentPage { get; set; }
}
