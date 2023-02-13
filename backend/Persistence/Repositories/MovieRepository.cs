using Contracts;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class MovieRepository : IMovieRepository
{
    private readonly RepositoryDbContext _dbContext;

    public MovieRepository(RepositoryDbContext dbContext) => _dbContext = dbContext;

    public async Task<IEnumerable<Movie>> GetAllAsync(bool withGenres = false)
    {
        IQueryable<Movie> movies = _dbContext.Movies;

        if (withGenres){
            movies.Include(x => x.Genres);
        }

        return await movies.ToListAsync();
    }

    public async Task<(IEnumerable<Movie> items, int moviesCount)> GetAllAsync(GetAllMoviesDto dto, bool withGenres = false)
    {
        IQueryable<Movie> movies = _dbContext.Movies;

        if (withGenres){
            movies.Include(x => x.Genres);
        }

        string letters = dto.Letters;
        string search = dto.Search;
        int? page = dto.Page;
        int? pageSize = dto.PageSize;

        if(!String.IsNullOrEmpty(search)){
            movies = movies.Where(g => g.Name.Contains(search));
        }
        if(!String.IsNullOrEmpty(letters)){
            List<string> temp = new List<string>();
            foreach(var movie in movies){
                if(letters.ToLower().Any(letter => letter == movie.Name.ToLower()[0])){
                    temp.Add(movie.Name);
                }
            }
            movies = movies.Where(g => temp.Contains(g.Name));
        }

        var itemCount = movies.Count();

        if(page != null && pageSize != null){
            movies = movies.Skip(((int)page - 1) * (int)pageSize)
                    .Take((int)pageSize);
        }

        // vracam sve filtrirane filmove da bih paginaciju radio u kontroleru
        var retMovies = await movies.ToListAsync();
        return (retMovies, itemCount);
    }

    public async Task<Movie> GetById(Guid id, bool withGenres = false)
    {
        IQueryable<Movie> movies = _dbContext.Movies;
        if (withGenres)
        {
            movies = movies.Include(x => x.Genres);
        }
        return await movies.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Insert(Movie movie)
    {
        _dbContext.Movies.Add(movie);
    }
}
