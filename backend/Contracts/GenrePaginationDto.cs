namespace Contracts;

public class GenrePaginationDto
{
    public List<GenreDto> Genres { get; set; } = new List<GenreDto>();
    public int Pages { get; set; }
    public int CurrentPage { get; set; }
}
