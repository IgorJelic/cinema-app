using Contracts;

namespace Domain.Exceptions.User;

public sealed class UserLoginNotFoundException : NotFoundException
{
    public UserLoginNotFoundException(UserLoginDto login) : base($"The user with username/emal: {login.Username} was not found.")
    {
        
    }
}
