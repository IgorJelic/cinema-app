using Domain.Entities;

namespace Domain.Repositories;

public interface IReservationRepository
{
    Task<IEnumerable<Reservation>> GetAllAsync(bool withChoosenSeats = false);
    // Task<(IEnumerable<MovieScreening> items, int screeningsCount)> GetAllAsync(GetAllScreeningsDto dto, bool withSeats = false);
    Task<Reservation> GetById(Guid id, bool withChoosenSeats = false);
    void Insert(Reservation reservation);
}
