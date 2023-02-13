namespace Domain.Exceptions.User;

public sealed class UserUsernameAlreadyExistsException : BadRequestException
{
    public UserUsernameAlreadyExistsException(string username) : base($"Username: '{username}' already exists.")
    {
        
    }
}
