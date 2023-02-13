using Contracts;
using Domain.Entities;
using Domain.Exceptions.User;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly RepositoryDbContext _dbContext;
    public UserRepository(RepositoryDbContext dbContext) => _dbContext = dbContext;
    public async Task<IEnumerable<User>> GetAllAsync(bool withReservations = false)
    {
        IQueryable<User> users = _dbContext.Users;

        if(withReservations){
            return await users.Include(u => u.Reservations).ToListAsync();
        }

        return await users.ToListAsync();
    }


    public async Task<User> GetById(Guid id, bool withReservations = false)
    {
         IQueryable<User> user = _dbContext.Users;

        if (withReservations)
        {
            user = user.Include(x => x.Reservations);
        }
        
        return await user.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<User> GetByEmail(string email, bool withReservations = false)
    {
        IQueryable<User> user = _dbContext.Users;

        if (withReservations)
        {
            user = user.Include(x => x.Reservations);
        }
        
        return await user.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<User> GetByVerificationToken(Guid verificationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.VerificationToken == verificationToken);

        return user;
    }

    public async Task<User> GetLoginUser(UserLoginDto login)
    {
        var user = await _dbContext.Users.Include(x => x.Reservations)
            .FirstOrDefaultAsync(x => x.Email == login.Username || x.Username == login.Username);
        return user;
    }

    public void Insert(User user)
    {
        var email = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        var username = _dbContext.Users.FirstOrDefault(u => u.Username == user.Username);

        if(email is not null){
            throw new UserEmailAlreadyExistsException(user.Email);
        }
        else if(username is not null){
            throw new UserUsernameAlreadyExistsException(user.Username);
        }
        else{
            _dbContext.Users.Add(user);
        }
    }

    public void Remove(User user)
    {
        _dbContext.Users.Remove(user);
    }
}
