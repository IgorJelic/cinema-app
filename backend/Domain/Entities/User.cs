using Contracts.Enums;

namespace Domain.Entities;


public class User
{
    public Guid Id { get; set; } 
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public DateTime DateOfBirth { get; set; }
    public Role Role { get; set; }
    public bool Verified { get; set; } = false;
    public Guid VerificationToken { get; set; }
    public DateTime VerificationTokenExpireDate { get; set; }

    public List<Reservation> Reservations { get; set; } = new List<Reservation>();
}
