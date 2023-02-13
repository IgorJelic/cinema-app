using Contracts;
using Domain.Entities;

namespace Services.Abstractions;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllAsync();
    Task<UserDto> GetById(Guid id);
    Task<User> GetByIdRaw(Guid id);
    Task<UserDto> Register(UserCreateDto user);
    Task<string> Login(UserLoginDto userLogin);
    Task<UserVerifyInfo> Verify(Guid verificationToken);
    Task<UserDto> Update(Guid id, UserCreateDto newUser);
    // Task Delete(Guid id);
}
