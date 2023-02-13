using Contracts;
using Domain.Entities;

namespace Domain.Repositories;

public interface IMovieScreeningRepository
{
    Task<IEnumerable<MovieScreening>> GetAllAsync(bool withSeats = false);
    Task<(IEnumerable<MovieScreening> items, int screeningsCount)> GetAllAsync(GetAllScreeningsDto dto, bool withSeats = false);
    Task<MovieScreening> GetById(Guid id, bool withSeats = false);
    void Insert(MovieScreening movieScreening);
}
