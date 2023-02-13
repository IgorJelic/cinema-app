using Contracts.Enums;

namespace Contracts;

public class UserDto
{
    public Guid Id { get; set; } 
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public DateTime DateOfBirth { get; set; }
    public Role Role { get; set; }
    public bool Verified { get; set; }

    // public List<ReservationDto> Reservations { get; set; } = new List<ReservationDto>();
}
