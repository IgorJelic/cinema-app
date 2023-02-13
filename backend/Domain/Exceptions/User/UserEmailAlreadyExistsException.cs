namespace Domain.Exceptions.User;

public sealed class UserEmailAlreadyExistsException : BadRequestException
{
    public UserEmailAlreadyExistsException(string email) : base($"Email: '{email}' already taken.")
    {
        
    }
}
