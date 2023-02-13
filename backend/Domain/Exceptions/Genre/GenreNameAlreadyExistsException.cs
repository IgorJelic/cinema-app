namespace Domain.Exceptions.Genre;

public sealed class GenreNameAlreadyExistsException : BadRequestException
{
    public GenreNameAlreadyExistsException(string genreName) : base($"Genre name: '{genreName}' already exists.")
    {
        
    }
}
