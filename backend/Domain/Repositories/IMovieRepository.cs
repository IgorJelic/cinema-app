using Domain.Entities;
using Contracts.Enums;
using Contracts;

namespace Domain.Repositories;

public interface IMovieRepository
{
    Task<IEnumerable<Movie>> GetAllAsync(bool withGenres = false);
    Task<(IEnumerable<Movie> items, int moviesCount)> GetAllAsync(GetAllMoviesDto dto, bool withGenres = false);
    Task<Movie> GetById(Guid id, bool withGenres = false);
    void Insert(Movie movie);
}
