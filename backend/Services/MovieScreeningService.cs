using Services.Abstractions;
using Domain.Repositories;
using Domain.Entities;
using Contracts;
using Mapster;
using Domain.Exceptions.MovieScreening;
using Domain.Exceptions.Movie;

namespace Services;

public sealed class MovieScreeningService : IMovieScreeningService
{
    private readonly IRepositoryManager _repositoryManager;

    public MovieScreeningService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;


    public async Task<IEnumerable<MovieScreeningDto>> GetAllAsync()
    {
        var movieScreenings = await _repositoryManager.MovieScreeningRepository.GetAllAsync(withSeats: true);
        var movieScreeningsDto = movieScreenings.Adapt<IEnumerable<MovieScreeningDto>>();
        return movieScreeningsDto;
    }

    public async Task<(IEnumerable<MovieScreeningDto> items, int screeningsCount)> GetAllAsync(GetAllScreeningsDto dto)
    {
        var screeningsTuple = await _repositoryManager.MovieScreeningRepository.GetAllAsync(dto);
        var screeningsDto = screeningsTuple.items.Adapt<IEnumerable<MovieScreeningDto>>();
        return (screeningsDto, screeningsTuple.screeningsCount);
    }

    public async Task<MovieScreeningDto> GetById(Guid id)
    {
        var movieScreening = await _repositoryManager.MovieScreeningRepository.GetById(id, withSeats: true);
        var movieScreeningDto = movieScreening.Adapt<MovieScreeningDto>();
        return movieScreeningDto;
    }

    public async Task<MovieScreeningDto> Create(MovieScreeningCreateDto screening)
    {
        var movie = await _repositoryManager.MovieRepository.GetById(screening.MovieId);

        if(movie is null){
            throw new MovieNotFoundException(screening.MovieId);
        }

        var newScreening = screening.Adapt<MovieScreening>();
        
        List<Seat> screeningSeats = new List<Seat>();

        for(int i = 0; i < newScreening.Rows; i++){
            for(int j = 0; j < newScreening.Columns; j++){
                screeningSeats.Add(
                    new Seat()
                    {
                        Id = Guid.NewGuid(),
                        // Label = 'red_kolona'
                        // Label = String.Format("{0}_{1}", i, j),
                        Label = String.Format("{0}_{1}", i+1, j+1),
                        Available = true,
                        Reservation = null
                    }
                );
            }
        }

        newScreening.Seats = screeningSeats;
        newScreening.Movie = movie;

        _repositoryManager.MovieScreeningRepository.Insert(newScreening);
        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        return newScreening.Adapt<MovieScreeningDto>();
    }

    public async Task<MovieScreeningDto> Update(Guid id, MovieScreeningUpdateDto newScreening)
    {
        var movieScreening = await _repositoryManager.MovieScreeningRepository.GetById(id);

        if(movieScreening is null)
        {
            throw new MovieScreeningNotFoundException(id);
        }

        var movie = await _repositoryManager.MovieRepository.GetById(newScreening.MovieId);

        if(movie is null){
            throw new MovieNotFoundException(newScreening.MovieId);
        }

        movieScreening.ScreeningTime = newScreening.ScreeningTime;
        movieScreening.TicketPrice = newScreening.TicketPrice;
        movieScreening.Movie = movie;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
        return movieScreening.Adapt<MovieScreeningDto>();
    }

    public async Task Delete(Guid id)
    {
        var movieScreening = await _repositoryManager.MovieScreeningRepository.GetById(id);

        if(movieScreening is null)
        {
            throw new MovieScreeningNotFoundException(id);
        }

        movieScreening.IsDeleted = true;
        await _repositoryManager.UnitOfWork.SaveChangesAsync();
    }

    
}
