namespace Domain.Exceptions.File;

public sealed class PathDoesNotExistException : BadRequestException
{
    public PathDoesNotExistException(string path) : base($"File located on '${path} doesn't exist.")
    {
        
    }
}
