namespace Domain.Exceptions.MovieScreening;

public sealed class MovieScreeningNotFoundException : NotFoundException
{
    public MovieScreeningNotFoundException(Guid movieScreeningId) 
        : base($"The movie screening with the identifier {movieScreeningId} was not found.")
    {

    }
}
