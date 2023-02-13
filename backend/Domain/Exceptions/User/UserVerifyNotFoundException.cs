namespace Domain.Exceptions.User;

public class UserVerifyNotFoundException : NotFoundException
{
    public UserVerifyNotFoundException(Guid verificationToken) : base($"The user with verify token: {verificationToken} was not found.")
    {
        
    }
}
