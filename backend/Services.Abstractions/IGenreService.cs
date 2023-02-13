using Contracts;

namespace Services.Abstractions;

public interface IGenreService
{
    Task<(IEnumerable<GenreDto> items, int genresCount)> GetAllAsync(GetAllGenresDto dto);
    Task<GenreDto> GetById(Guid id);
    Task<GenreDto> Create(GenreCreateDto genre);
    Task<GenreDto> Update(Guid id, GenreCreateDto newGenre);
    Task Delete(Guid id);
}
