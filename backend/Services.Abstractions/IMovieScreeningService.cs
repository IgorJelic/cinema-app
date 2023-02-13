using Contracts;

namespace Services.Abstractions;

public interface IMovieScreeningService
{
    Task<IEnumerable<MovieScreeningDto>> GetAllAsync();
    Task<(IEnumerable<MovieScreeningDto> items, int screeningsCount)> GetAllAsync(GetAllScreeningsDto dto);
    Task<MovieScreeningDto> GetById(Guid id);
    Task<MovieScreeningDto> Create(MovieScreeningCreateDto screening);
    // Task<MovieScreeningDto> Create(Guid movieId, MovieScreeningCreateDto screening);
    Task<MovieScreeningDto> Update(Guid id, MovieScreeningUpdateDto newScreening);
    Task Delete(Guid id);
}
