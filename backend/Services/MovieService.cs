using Services.Abstractions;
using Domain.Repositories;
using Domain.Entities;
using Contracts;
using Mapster;
using Microsoft.AspNetCore.Http;
using Domain.Exceptions.Movie;

namespace Services;

public sealed class MovieService : IMovieService
{
    private readonly IRepositoryManager _repositoryManager;
    public MovieService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task Delete(Guid id)
    {
        var movie = await _repositoryManager.MovieRepository.GetById(id);

        if(movie is null)
        {
            throw new MovieNotFoundException(id);
        }

        var posterImage = movie.PosterImage;

        movie.IsDeleted = true;
        await RemovePoster(posterImage);

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<MovieDto>> GetAllAsync()
    {
        var movies = await _repositoryManager.MovieRepository.GetAllAsync(withGenres: true);
        // var movies = await _repositoryManager.MovieRepository.GetAllAsync();
        var moviesDto = movies.Adapt<IEnumerable<MovieDto>>();
        return moviesDto;
    }

    public async Task<(IEnumerable<MovieDto> items, int moviesCount)> GetAllAsync(GetAllMoviesDto dto)
    {
        var moviesTuple = await _repositoryManager.MovieRepository.GetAllAsync(dto);
        var moviesDto = moviesTuple.items.Adapt<IEnumerable<MovieDto>>();
        return (moviesDto, moviesTuple.moviesCount);
    }

    public async Task<MovieDto> GetById(Guid id)
    {
        var movie = await _repositoryManager.MovieRepository.GetById(id, withGenres:true);

        if(movie is null){
            throw new MovieNotFoundException(id);
        }

        var movieDto = movie.Adapt<MovieDto>();
        return movieDto;
    }

    public async Task<MovieDto> Create(MovieCreateDto movie)
    {
        var allGenres = await _repositoryManager.GenreRepository.GetAllAsync();
        var movieGenres = new List<Genre>();

        movie.Genres.ForEach(id => {
            var genre = allGenres.FirstOrDefault(g => g.Id == id);

            if(genre is not null){
                movieGenres.Add(genre);
            }
        });

        Guid id = Guid.NewGuid();
        string fileName = String.Format("{0}_img.jpg", id);

        var newMovie = new Movie(){
            Id = id,
            Name = movie.Name,
            OriginalName = movie.OriginalName,
            PosterImage = fileName,
            Duration = movie.Duration,
            Genres = movieGenres,
        };

        _repositoryManager.MovieRepository.Insert(newMovie);
        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        var newMovieDto = newMovie.Adapt<MovieDto>();

        return newMovie.Adapt<MovieDto>();
    }

    public async Task UploadPoster(IFormFile img, string fileName){
        var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources/", fileName);

        await _repositoryManager.FileRepository.UploadFile(img, imagePath);
    }

    private async Task RemovePoster(string fileName){
        var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Resources/", fileName);

        await _repositoryManager.FileRepository.RemoveFile(imagePath);
    }

    public async Task<MovieDto> Update(Guid id, MovieCreateDto newMovie)
    {
        var allGenres = await _repositoryManager.GenreRepository.GetAllAsync();
        var movieGenres = new List<Genre>();

        newMovie.Genres.ForEach(id => {
            var genre = allGenres.FirstOrDefault(g => g.Id == id);

            if(genre is not null){
                movieGenres.Add(genre);
            }
        });

        var oldMovie = await _repositoryManager.MovieRepository.GetById(id, withGenres:true);

        if(oldMovie is null)
        {
            throw new MovieNotFoundException(id);
        }

        oldMovie.Name = newMovie.Name;
        oldMovie.OriginalName = newMovie.OriginalName;
        oldMovie.Duration = newMovie.Duration;
        oldMovie.Genres = movieGenres;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
        return oldMovie.Adapt<MovieDto>();
    }

    
}
