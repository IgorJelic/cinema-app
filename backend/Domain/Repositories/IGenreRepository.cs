using Contracts;
using Domain.Entities;

namespace Domain.Repositories;

public interface IGenreRepository
{
    Task<IEnumerable<Genre>> GetAllAsync(bool withMovies = false);
    Task<(IEnumerable<Genre> items, int genresCount)> GetAllAsync(GetAllGenresDto dto, bool withMovies = false);
    Task<Genre> GetById(Guid id, bool withMovies = false);
    void Insert(Genre genre);
    void Delete(Genre genre);
}
