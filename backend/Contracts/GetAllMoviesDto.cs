namespace Contracts;

public class GetAllMoviesDto
{
    public string Search { get; set; }
    public string Letters { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
}
