using Contracts;
using Services.Abstractions;
using Domain.Repositories;
using Domain.Entities;
using Domain.EmailService;
using Domain.Exceptions.Reservation;
using Mapster;
using Domain.Exceptions.MovieScreening;
using Microsoft.AspNetCore.Http;

namespace Services;

public class ReservationService : IReservationService
{

    private readonly IRepositoryManager _repositoryManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IEmailService _emailService;
    public ReservationService(IRepositoryManager repositoryManager, IHttpContextAccessor httpContextAccessor, IEmailService emailService){
        _repositoryManager = repositoryManager;
        _httpContextAccessor = httpContextAccessor;
        _emailService = emailService;
    }
    

    public async Task<IEnumerable<ReservationDto>> GetAllAsync()
    {
        var reservations = await _repositoryManager.ReservationRepository.GetAllAsync(withChoosenSeats: true);
        var reservationsDto = reservations.Adapt<IEnumerable<ReservationDto>>();
        return reservationsDto;
    }

    public async Task<ReservationDto> GetById(Guid id)
    {
        var reservation = await _repositoryManager.ReservationRepository.GetById(id, withChoosenSeats: true);
        var reservationDto = reservation.Adapt<ReservationDto>();
        return reservationDto;
    }

    public async Task<ReservationDto> Create(ReservationCreateDto reservation)
    {
        var movieScreening = await _repositoryManager.MovieScreeningRepository.GetById(reservation.MovieScreening, withSeats: true);

        if(movieScreening is null){
            throw new MovieScreeningNotFoundException(reservation.MovieScreening);
        }

        Reservation newReservation = new Reservation(){
            Id = Guid.NewGuid(),
            UserEmail = reservation.UserEmail,
            TotalPrice = reservation.TotalPrice,
            MovieScreening = movieScreening,
        };

        foreach (Guid seatId in reservation.ChosenSeats)
        {
            var seat = movieScreening.Seats.Find(s => s.Id == seatId);

            if(seat is not null){
                seat.Available = false;
                newReservation.ChosenSeats.Add(seat);
            }
        }

        User user = (User)_httpContextAccessor.HttpContext.Items["User"];
        if(user is not null){
            // popust ? ili da ga sracunam na frontu? msm da je bolje tamo
            newReservation.TotalPrice = reservation.TotalPrice - (int)(reservation.TotalPrice * 0.05);
            newReservation.UserEmail = user.Email;
            user.Reservations.Add(newReservation);
        }

        _repositoryManager.ReservationRepository.Insert(newReservation);
        await _repositoryManager.UnitOfWork.SaveChangesAsync();

        // Posalji mejl korisniku u kom saljes da je uspesno rezervisao
        var emailTo = newReservation.UserEmail;
        string message = $@"<p>Reservation screening: {newReservation.MovieScreening.Movie.Name}</p>
                            <p>Time of screening: {newReservation.MovieScreening.ScreeningTime.ToUniversalTime()}</p>";

        var body = $"<h4>Reservation completed</h4><p>Reservation ID = [{newReservation.Id}]</p>{message}";

        _emailService.Send(emailTo, "Ticket Reservation - Success", body);

        return newReservation.Adapt<ReservationDto>();
    }

    public async Task Delete(Guid id)
    {
        var reservation = await _repositoryManager.ReservationRepository.GetById(id, withChoosenSeats: true);
        if(reservation is null){
            throw new ReservationNotFoundException(id);
        }

        foreach (Seat seat in reservation.ChosenSeats)
        {
            seat.Available = true;
        }

        reservation.ChosenSeats.Clear();
        reservation.IsDeleted = true;

        await _repositoryManager.UnitOfWork.SaveChangesAsync();
    }
}
