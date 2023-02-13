using Microsoft.AspNetCore.Http;
using Contracts;
using System.ComponentModel.DataAnnotations;

namespace Presentation.Models;

public class MovieModel
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string OriginalName { get; set; }
    public IFormFile? Image { get; set; }
    [Required]
    public int Duration { get; set; }   // minutes
    public List<Guid> Genres { get; set; } 
}
