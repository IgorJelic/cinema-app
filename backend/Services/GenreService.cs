using Services.Abstractions;
using Domain.Repositories;
using Domain.Entities;
using Contracts;
using Mapster;
using Domain.Exceptions.Genre;

namespace Services;

public sealed class GenreService : IGenreService
{
    private readonly IRepositoryManager _repositoryManager;

    public GenreService(IRepositoryManager repositoryManager)
    {
        _repositoryManager = repositoryManager;
    }

    public async Task<(IEnumerable<GenreDto> items, int genresCount)> GetAllAsync(GetAllGenresDto dto)
    {
        var genresTuple = await _repositoryManager.GenreRepository.GetAllAsync(dto);
        var genresDto = genresTuple.items.Adapt<IEnumerable<GenreDto>>();
        return (genresDto, genresTuple.genresCount);
    }

    public async Task<GenreDto> GetById(Guid id)
    {
        var genre = await _repositoryManager.GenreRepository.GetById(id);

        if (genre is null){
            throw new GenreNotFoundException(id);
        }

        var genreDto = genre.Adapt<GenreDto>();
        return genreDto;
    }

    public async Task<GenreDto> Create(GenreCreateDto genre)
    {
        var newGenre = genre.Adapt<Genre>();
        _repositoryManager.GenreRepository.Insert(newGenre);
        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        return newGenre.Adapt<GenreDto>();
    }

    public async Task<GenreDto> Update(Guid id, GenreCreateDto newGenre)
    {
        var oldGenre = await _repositoryManager.GenreRepository.GetById(id);

        if (oldGenre is null)
        {
            throw new GenreNotFoundException(id);
        }

        oldGenre.Name = newGenre.Name;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        return oldGenre.Adapt<GenreDto>();
    }

    public async Task Delete(Guid id)
    {
        var genre = await _repositoryManager.GenreRepository.GetById(id);

        if (genre is null)
        {
            throw new GenreNotFoundException(id);
        }

        _repositoryManager.GenreRepository.Delete(genre);

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
    }
}
