namespace Domain.Exceptions.Genre;

public sealed class GenreModelNotValidException : BadRequestException
{
    public GenreModelNotValidException() : base("Genre model not valid.")
    {
        
    }
}
