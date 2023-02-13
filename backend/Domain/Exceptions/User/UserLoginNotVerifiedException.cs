namespace Domain.Exceptions.User;

public class UserLoginNotVerifiedException : BadRequestException
{
    public UserLoginNotVerifiedException(string username) : base($"User '{username}' must be verified to login.")
    {
        
    }
}
