namespace Domain.Exceptions.Movie;

public sealed class MovieAlreadyContainsGenreException : BadRequestException
{
    public MovieAlreadyContainsGenreException(Guid movieId, Guid genreId) 
        : base($"The movie with the identifier {movieId} already has genre with the identifier {genreId}.")
    {
        
    }
}
