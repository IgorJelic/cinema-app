namespace Domain.Exceptions.Reservation;

public sealed class ReservationNotFoundException : NotFoundException
{
    public ReservationNotFoundException(Guid reservationId) 
        : base($"The reservation with the identifier {reservationId} was not found.")
    {

    }
}
