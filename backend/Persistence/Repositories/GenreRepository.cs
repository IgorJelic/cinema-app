using Contracts;
using Domain.Entities;
using Domain.Exceptions.Genre;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Repositories;

public class GenreRepository : IGenreRepository
{
    private readonly RepositoryDbContext _dbContext;

    public GenreRepository(RepositoryDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Genre>> GetAllAsync(bool withMovies = false)
    {
        IQueryable<Genre> genres = _dbContext.Genres;
        if(withMovies) {
            genres = genres.Include(x => x.Movies);
        }

        return await genres.ToListAsync();
    }

    public async Task<(IEnumerable<Genre> items, int genresCount)> GetAllAsync(GetAllGenresDto dto, bool withMovies = false)
    {
        IQueryable<Genre> genres = _dbContext.Genres;

        if(withMovies) {
            genres = genres.Include(x => x.Movies);
        }

        string letters = dto.Letters;
        string search = dto.Search;
        int? page = dto.Page;
        int? pageSize = dto.PageSize;

        if(!String.IsNullOrEmpty(search)){
            genres = genres.Where(g => g.Name.Contains(search));
        }
        if(!String.IsNullOrEmpty(letters)){
            List<string> temp = new List<string>();
            foreach(var genre in genres){
                if(letters.ToLower().Any(letter => letter == genre.Name.ToLower()[0])){
                    temp.Add(genre.Name);
                }
            }
            genres = genres.Where(g => temp.Contains(g.Name));
        }

        var itemCount = genres.Count();

        if(page != null && pageSize != null){
            genres = genres.Skip(((int)page - 1) * (int)pageSize)
                    .Take((int)pageSize);
        }
        
        // vracam sve filtrirane zanrove da bih paginaciju radio u kontroleru
        var retGenres = await genres.ToListAsync();
        return (retGenres, itemCount);
    }

    public async Task<Genre> GetById(Guid id, bool withMovies = false)
    {
        IQueryable<Genre> genre = _dbContext.Genres;
        if (withMovies)
        {
            genre = genre.Include(x => x.Movies);
        }
        return await genre.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Insert(Genre genre)
    {
        var tempGenre = _dbContext.Genres.FirstOrDefault(g => g.Name == genre.Name);
        
        if(tempGenre is not null)
        {
            throw new GenreNameAlreadyExistsException(genre.Name);
        }
        else
        {
            _dbContext.Genres.Add(genre);
        }
    }

    public void Delete(Genre genre)
    {
        _dbContext.Genres.Remove(genre);
    }

    
}
