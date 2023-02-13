namespace Services.Abstractions;

public interface IServiceManager
{
    IGenreService GenreService { get; }
    IMovieService MovieService { get; }
    IMovieScreeningService MovieScreeningService { get; }
    IUserService UserService { get; }
    IReservationService ReservationService { get; }
}
