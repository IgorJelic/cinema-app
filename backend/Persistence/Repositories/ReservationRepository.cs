using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly RepositoryDbContext _dbContext;
    public ReservationRepository(RepositoryDbContext dbContext) => _dbContext = dbContext;

    public async Task<IEnumerable<Reservation>> GetAllAsync(bool withChoosenSeats = false)
    {
        IQueryable<Reservation> reservations = _dbContext.Reservations.Include(r => r.MovieScreening);

        if(withChoosenSeats){
            reservations.Include(r => r.ChosenSeats);
        }

        return await reservations.ToListAsync();
    }

    public async Task<Reservation> GetById(Guid id, bool withChoosenSeats = false)
    {
        IQueryable<Reservation> reservations = _dbContext.Reservations.Include(r => r.MovieScreening);
        if (withChoosenSeats)
        {
            reservations = reservations.Include(r => r.ChosenSeats.OrderBy(s => s.Label));
        }
        return await reservations.FirstOrDefaultAsync(r => r.Id == id);
    }

    public void Insert(Reservation reservation)
    {
        _dbContext.Reservations.Add(reservation);
    }
}
