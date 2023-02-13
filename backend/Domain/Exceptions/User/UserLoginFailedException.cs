namespace Domain.Exceptions.User;

public sealed class UserLoginFailedException : UnauthorizedException
{
    public UserLoginFailedException() : base("Username/email or password not valid.")
    {
        
    }
}
