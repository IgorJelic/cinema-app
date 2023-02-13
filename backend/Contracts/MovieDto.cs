namespace Contracts;

public class MovieDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string OriginalName { get; set; }
    public string PosterImage { get; set; }
    public int Duration { get; set; }   // minutes

    public List<GenreDto> Genres { get; set; } 
    // public List<MovieScreeningDto> MovieScreenings { get; set; }
}
