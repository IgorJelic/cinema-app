using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Contracts;
using Presentation.Models;
using Domain.Exceptions.Movie;

namespace Presentation.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController : ControllerBase
{
    private readonly IServiceManager _serviceManager;

    public MoviesController(IServiceManager serviceManager) => _serviceManager = serviceManager;


    [HttpGet]
    public async Task<IActionResult> GetMovies(int? page, int? pageSize, string? search, string? letters){
        var moviesTuple = await _serviceManager.MovieService.GetAllAsync(
            new GetAllMoviesDto(){
                Page = page,
                PageSize = pageSize,
                Search = search,
                Letters = letters
            }
        );

        if(page == null || pageSize == null){
            return Ok(new MoviePaginationDto()
            {
                Movies = moviesTuple.items.ToList(),
                Pages = 0,
                CurrentPage = 0
            });
        }else{
            var pageCount = Math.Ceiling(moviesTuple.moviesCount / (double)pageSize);

            return Ok(new MoviePaginationDto()
            {
                Movies = moviesTuple.items.ToList(),
                Pages = (int)pageCount,
                CurrentPage = (int)page
            });
        }
    }


    // [HttpGet]
    // public async Task<IActionResult> GetMovies(int page = 1, int pageSize = -1){
    //     var moviesDto = await _serviceManager.MovieService.GetAllAsync();

    //     if(pageSize == -1){
    //         return Ok(new MoviePaginationDto(){
    //             Movies = moviesDto.ToList(),
    //             Pages = 1,
    //             CurrentPage = 1
    //         });
    //     }

    //     var pageCount = Math.Ceiling(moviesDto.Count() / (double)pageSize);

    //     var moviesList = moviesDto
    //                         .Skip((page - 1) * (int)pageSize)
    //                         .Take((int)pageSize)
    //                         .ToList();

    //     MoviePaginationDto retVal = new MoviePaginationDto(){
    //         Movies = moviesList,
    //         Pages = (int)pageCount,
    //         CurrentPage = page
    //     };

    //     return Ok(retVal);
    // }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMovieById(Guid id){
        var movieDto = await _serviceManager.MovieService.GetById(id);
        
        return Ok(movieDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovie([FromForm] MovieModel movie){
        if(movie.Image is null || movie.Image.Length == 0)
        {
            throw new MovieModelNotValidException();
        }
        
        var newMovieDto = new MovieCreateDto(){
            Name = movie.Name,
            OriginalName = movie.OriginalName,
            Duration = movie.Duration,
            Genres = movie.Genres
        };

        var movieDto = await _serviceManager.MovieService.Create(newMovieDto);

        await _serviceManager.MovieService.UploadPoster(movie.Image, movieDto.PosterImage);

        return CreatedAtAction(nameof(GetMovieById), new {id = movieDto.Id}, movieDto);
    }


    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateMovie(Guid id, [FromForm] MovieModel movie){        
        var newMovieDto = new MovieCreateDto(){
            Name = movie.Name,
            OriginalName = movie.OriginalName,
            Duration = movie.Duration,
            Genres = movie.Genres
        };

        var movieDto = await _serviceManager.MovieService.Update(id, newMovieDto);

        if(movie.Image is not null)
        {
            if(movie.Image.Length > 0){
                await _serviceManager.MovieService.UploadPoster(movie.Image, movieDto.PosterImage);
            }
        }

        return Ok(movieDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteMovie(Guid id){
        await _serviceManager.MovieService.Delete(id);

        return NoContent();
    }
}
