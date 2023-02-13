namespace Domain.Exceptions.Genre;

public sealed class GenreNotFoundException : NotFoundException
{
    public GenreNotFoundException(Guid genreId) : base($"The genre with the identifier {genreId} was not found.")
    {
        
    }
}
