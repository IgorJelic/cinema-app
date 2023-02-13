using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Contracts;
using Domain.Exceptions.Genre;

namespace Presentation.Controllers;

[ApiController]
[Route("api/genres")]
public class GenresController : ControllerBase
{
    private readonly IServiceManager _serviceManager;

    public GenresController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenres(int? page, int? pageSize, string? search, string? letters)
    {
        var genresTuple = await _serviceManager.GenreService.GetAllAsync(new GetAllGenresDto(){Search = search, Letters = letters, Page = page, PageSize = pageSize});

        if(page == null || pageSize == null){
            return Ok(new GenrePaginationDto()
            {
                Genres = genresTuple.items.ToList(),
                Pages = 0,
                CurrentPage = 0
            });
        }else{
            var pageCount = Math.Ceiling(genresTuple.genresCount / (double)pageSize);

            return Ok(new GenrePaginationDto(){
                Genres = genresTuple.items.ToList(),
                Pages = (int)pageCount,
                CurrentPage = (int)page
            });
        }
        
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetGenreById(Guid id)
    {
        var genreDto = await _serviceManager.GenreService.GetById(id);

        return Ok(genreDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateGenre([FromBody] GenreCreateDto genre)
    {   
        var genreDto = await _serviceManager.GenreService.Create(genre);

        return CreatedAtAction(nameof(GetGenreById), new { id = genreDto.Id }, genreDto);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateGenre(Guid id, [FromBody] GenreCreateDto genre)
    {
        var genreDto = await _serviceManager.GenreService.Update(id, genre);

        return Ok(genreDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteGenre(Guid id)
    {
        await _serviceManager.GenreService.Delete(id);

        return NoContent();
    }

    
}
