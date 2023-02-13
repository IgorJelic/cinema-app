using Domain.Repositories;

namespace Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    public readonly RepositoryDbContext _dbContext;

    public UnitOfWork(RepositoryDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<int> SaveChangesAsync()
    {
       return _dbContext.SaveChangesAsync();
    }
}
