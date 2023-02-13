using Services.Abstractions;
using Domain.Repositories;
using Domain.EmailService;
using Microsoft.AspNetCore.Http;

namespace Services;

public sealed class ServiceManager : IServiceManager
{
    private readonly Lazy<IGenreService> _lazyGenreService;
    private readonly Lazy<IMovieService> _lazyMovieService;
    private readonly Lazy<IMovieScreeningService> _lazyMovieScreeningService;
    private readonly Lazy<IUserService> _lazyUserService;
    private readonly Lazy<IReservationService> _lazyReservationService;

    public ServiceManager(IRepositoryManager repositoryManager, IEmailService emailService, IHttpContextAccessor httpContextAccessor)
    {
        _lazyGenreService = new Lazy<IGenreService>(() => new GenreService(repositoryManager));
        _lazyMovieService = new Lazy<IMovieService>(() => new MovieService(repositoryManager));
        _lazyMovieScreeningService = new Lazy<IMovieScreeningService>(() => new MovieScreeningService(repositoryManager));
        _lazyUserService = new Lazy<IUserService>(() => new UserService(repositoryManager, emailService));
        _lazyReservationService = new Lazy<IReservationService>(() => new ReservationService(repositoryManager, httpContextAccessor));
    }

    public IGenreService GenreService => _lazyGenreService.Value;

    public IMovieService MovieService => _lazyMovieService.Value;

    public IMovieScreeningService MovieScreeningService => _lazyMovieScreeningService.Value;

    public IUserService UserService => _lazyUserService.Value;

    public IReservationService ReservationService => _lazyReservationService.Value;
}
