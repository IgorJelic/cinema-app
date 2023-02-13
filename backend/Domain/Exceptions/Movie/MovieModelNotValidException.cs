namespace Domain.Exceptions.Movie;

public sealed class MovieModelNotValidException : BadRequestException
{
    public MovieModelNotValidException() : base("Movie model not valid.")
    {
        
    }
}
