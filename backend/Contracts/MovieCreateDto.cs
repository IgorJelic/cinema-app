using System.ComponentModel.DataAnnotations;

namespace Contracts;

public class MovieCreateDto
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string OriginalName { get; set; }
    // [Required]
    public string PosterImage { get; set; }
    [Required]
    public int Duration { get; set; }   // minutes

    // Treba i lista zanrova da se salje pri kreiranju filma, moze kao lista ID-ja ili lista Dto-ova
    public List<Guid> Genres { get; set; } = new List<Guid>();
}
