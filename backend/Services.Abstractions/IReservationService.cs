using Contracts;

namespace Services.Abstractions;

public interface IReservationService
{
    Task<IEnumerable<ReservationDto>> GetAllAsync();
    Task<ReservationDto> GetById(Guid id);
    Task<ReservationDto> Create(ReservationCreateDto reservation);
    Task Delete(Guid id);
}
