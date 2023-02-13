using Contracts;
using Contracts.Enums;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class MovieScreeningRepository : IMovieScreeningRepository
{
    private readonly RepositoryDbContext _dbContext;

    public MovieScreeningRepository(RepositoryDbContext dbContext) => _dbContext = dbContext;

    public async Task<IEnumerable<MovieScreening>> GetAllAsync(bool withSeats = false)
    {
        // IQueryable<MovieScreening> screenings = _dbContext.MovieScreenings.Include(s => s.Movie).Include(s => s.Seats);
        IQueryable<MovieScreening> screenings = _dbContext.MovieScreenings.Include(s => s.Movie);

        if(withSeats){
            screenings.Include(s => s.Seats);
        }

        return await screenings.ToListAsync();
    }

    public async Task<(IEnumerable<MovieScreening> items, int screeningsCount)> GetAllAsync(GetAllScreeningsDto dto, bool withSeats = false)
    {
        IQueryable<MovieScreening> screenings = _dbContext.MovieScreenings.Include(x => x.Movie.Genres);

        if(withSeats){
            screenings = screenings.Include(x => x.Seats);
        }
        
        int? page = dto.Page;
        int? pageSize = dto.PageSize;
        DateTime? day = dto.Day;
        Guid? genreFilter = dto.GenreFilter;
        Sort sort = dto.SortBy;

        if(day is not null){
            screenings = screenings.Where(s => s.ScreeningTime.Date == day.Value.Date);
        }
        if(genreFilter is not null){
            screenings = screenings.Where(s => s.Movie.Genres.Any(g => g.Id == genreFilter));
        }

        screenings = sort switch
        {
            Sort.Time => screenings.OrderBy(x => x.ScreeningTime),
            Sort.MovieNameAsc =>  screenings.OrderBy(x => x.Movie.Name),
            Sort.MovieNameDesc => screenings.OrderByDescending(x => x.Movie.Name),
            _ => screenings.OrderBy(x => x.ScreeningTime),
        };

        
        var itemCount = screenings.Count();
        if(page is not null && pageSize is not null){
            screenings = screenings.Skip(((int)page - 1) * (int)pageSize)
                        .Take((int)pageSize);
        }
        
        var retScreenings = await screenings.ToListAsync();
        return (retScreenings, itemCount);
    }

    public async Task<MovieScreening> GetById(Guid id, bool withSeats = false)
    {
        IQueryable<MovieScreening> screenings = _dbContext.MovieScreenings.Include(s => s.Movie);
        if (withSeats)
        {
            screenings = screenings.Include(x => x.Seats.OrderBy(s => s.Label));
        }
        return await screenings.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Insert(MovieScreening movieScreening)
    {
        _dbContext.MovieScreenings.Add(movieScreening);
    }
}
