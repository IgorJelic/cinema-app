using Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Contracts;

namespace Presentation.Controllers;

[ApiController]
[Route("api/reservations")]
public class ReservationsController : ControllerBase
{
    private readonly IServiceManager _serviceManager;
    public ReservationsController(IServiceManager serviceManager) => _serviceManager = serviceManager;

    [HttpGet]
    public async Task<IActionResult> GetReservations(){
        var reservationsDto = await _serviceManager.ReservationService.GetAllAsync();

        return Ok(reservationsDto);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetReservationById(Guid id){
        var reservationDto = await _serviceManager.ReservationService.GetById(id);

        return Ok(reservationDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] ReservationCreateDto reservation){
        // proveri token? ako je ulogovan prosledi loggedIn:true u servis (zbog dodavanja rezervacije user-u)

        var reservationDto = await _serviceManager.ReservationService.Create(reservation);

        return CreatedAtAction(nameof(GetReservationById), new { id = reservationDto.Id }, reservationDto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> CancelReservation(Guid id){
        await _serviceManager.ReservationService.Delete(id);        

        return NoContent();
    }
}
