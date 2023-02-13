using Domain.Repositories;

namespace Persistence.Repositories;

public class RepositoryManager : IRepositoryManager
{
    private readonly Lazy<IGenreRepository> _lazyGenreRepository;
    private readonly Lazy<IMovieRepository> _lazyMovieRepository;
    private readonly Lazy<IMovieScreeningRepository> _lazyMovieScreeningRepository;
    private readonly Lazy<IUserRepository> _lazyUserRepository;
    private readonly Lazy<IReservationRepository> _lazyReservationRepository;
    private readonly Lazy<IFileRepository> _lazyFileRepository;
    private readonly Lazy<IUnitOfWork> _lazyUnitOfWork;

    public RepositoryManager(RepositoryDbContext dbContext)
    {
        _lazyGenreRepository = new Lazy<IGenreRepository>(() => new GenreRepository(dbContext));
        _lazyMovieRepository = new Lazy<IMovieRepository>(() => new MovieRepository(dbContext));
        _lazyMovieScreeningRepository = new Lazy<IMovieScreeningRepository>(() => new MovieScreeningRepository(dbContext));
        _lazyUserRepository = new Lazy<IUserRepository>(() => new UserRepository(dbContext));
        _lazyReservationRepository = new Lazy<IReservationRepository>(() => new ReservationRepository(dbContext));
        _lazyFileRepository = new Lazy<IFileRepository>(() => new FileRepository());
        _lazyUnitOfWork = new Lazy<IUnitOfWork>(() => new UnitOfWork(dbContext));
    }

    public IGenreRepository GenreRepository => _lazyGenreRepository.Value;
    public IMovieRepository MovieRepository => _lazyMovieRepository.Value;
    public IMovieScreeningRepository MovieScreeningRepository => _lazyMovieScreeningRepository.Value;
    public IUserRepository UserRepository => _lazyUserRepository.Value;
    public IReservationRepository ReservationRepository => _lazyReservationRepository.Value;
    public IFileRepository FileRepository => _lazyFileRepository.Value;
    public IUnitOfWork UnitOfWork => _lazyUnitOfWork.Value;

}
