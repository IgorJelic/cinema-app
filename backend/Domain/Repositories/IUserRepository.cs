using Contracts;
using Domain.Entities;

namespace Domain.Repositories;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync(bool withReservations = false);
    Task<User> GetById(Guid id, bool withReservations = false);
    Task<User> GetByEmail(string email, bool withReservations = false);
    Task<User> GetLoginUser(UserLoginDto login);
    Task<User> GetByVerificationToken(Guid verificationToken);
    void Insert(User user);
    void Remove(User user);
}
