namespace Domain.Entities;

public class Movie
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string OriginalName { get; set; }
    public string PosterImage { get; set; }
    public int Duration { get; set; }   // minutes
    public bool IsDeleted { get;set; } = false;

    public List<Genre> Genres { get; set; } = new List<Genre>();
    // public List<MovieScreening> MovieScreenings { get; set; } = new List<MovieScreening>();
}
