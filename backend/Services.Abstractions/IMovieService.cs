using Contracts;
using Microsoft.AspNetCore.Http;

namespace Services.Abstractions;

public interface IMovieService
{
    Task<IEnumerable<MovieDto>> GetAllAsync();
    Task<(IEnumerable<MovieDto> items, int moviesCount)> GetAllAsync(GetAllMoviesDto dto);
    Task<MovieDto> GetById(Guid id);
    Task<MovieDto> Create(MovieCreateDto movie);
    Task<MovieDto> Update(Guid id, MovieCreateDto newMovie);
    Task Delete(Guid id);
    Task UploadPoster(IFormFile img, string fileName);
}
