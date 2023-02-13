using System.ComponentModel.DataAnnotations;
using Contracts.CustomValidation;

namespace Contracts;

public class UserLoginDto
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}
