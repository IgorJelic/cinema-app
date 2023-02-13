namespace Domain.Exceptions.Movie;

public sealed class MovieNotFoundException : NotFoundException
{
    public MovieNotFoundException(Guid movieId) : base($"The movie with the identifier {movieId} was not found.")
    {
        
    }
}
