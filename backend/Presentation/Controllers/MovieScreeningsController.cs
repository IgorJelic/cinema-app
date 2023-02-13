using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Contracts;
using Presentation.Models;
using Domain.Exceptions.MovieScreening;
using Contracts.Enums;

namespace Presentation.Controllers;

[ApiController]
[Route("api/movie-screenings")]
public class MovieScreeningsController : ControllerBase
{
    private readonly IServiceManager _serviceManager;

    public MovieScreeningsController(IServiceManager serviceManager) => _serviceManager = serviceManager;

    [HttpGet]
    public async Task<IActionResult> GetMovieScreenings(int? page , int? pageSize , DateTime? day, Guid? genreFilter, Sort sortBy = Sort.Time){

        var screeningsTuple = await _serviceManager.MovieScreeningService.GetAllAsync(new GetAllScreeningsDto()
                    {
                        Page = page, 
                        PageSize = pageSize, 
                        Day = day, 
                        GenreFilter = genreFilter, 
                        SortBy = sortBy
                    });
        
        if(page == null || pageSize == null){
            return Ok(new MovieScreeningPaginationDto()
            {
                Screenings = screeningsTuple.items.ToList(),
                Pages = 0,
                CurrentPage = 0
            });
        }else{
            var pageCount = Math.Ceiling(screeningsTuple.screeningsCount / (double)pageSize);

            return Ok(new MovieScreeningPaginationDto(){
                Screenings = screeningsTuple.items.ToList(),
                Pages = (int)pageCount,
                CurrentPage = (int)page
            });
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMovieScreeningById(Guid id){
        var screeningDto = await _serviceManager.MovieScreeningService.GetById(id);

        return Ok(screeningDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovieScreening([FromBody] MovieScreeningCreateDto screening){
        var screeningDto = await _serviceManager.MovieScreeningService.Create(screening);

        return CreatedAtAction(nameof(GetMovieScreeningById), new {id = screeningDto.Id}, screeningDto);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateMovieScreening(Guid id, [FromBody] MovieScreeningUpdateDto newScreening){
        var screeningDto = await _serviceManager.MovieScreeningService.Update(id, newScreening);

        return Ok(screeningDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMovieScreening(Guid id){
        await _serviceManager.MovieScreeningService.Delete(id);

        return NoContent();
    }

}
