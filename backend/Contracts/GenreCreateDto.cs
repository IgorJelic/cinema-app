using System.ComponentModel.DataAnnotations;

namespace Contracts;

public class GenreCreateDto
{
    [Required]
    public string Name { get; set; }
}
