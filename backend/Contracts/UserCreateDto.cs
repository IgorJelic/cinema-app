using System.ComponentModel.DataAnnotations;
using Contracts.Enums;

namespace Contracts;

public class UserCreateDto
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public DateTime DateOfBirth { get; set; }
    [Required]
    public string Role { get; set; }
}
