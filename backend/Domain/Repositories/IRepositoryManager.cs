namespace Domain.Repositories;

public interface IRepositoryManager
{
    IUnitOfWork UnitOfWork { get; }
    IGenreRepository GenreRepository { get; }
    IMovieRepository MovieRepository { get; }
    IMovieScreeningRepository MovieScreeningRepository { get; }
    IUserRepository UserRepository { get; }
    IReservationRepository ReservationRepository { get; }
    IFileRepository FileRepository { get; }
}
