using Contracts.Enums;

namespace Contracts;

public class GetAllScreeningsDto
{
    public int? Page { get; set; }
    public int? PageSize { get; set; }
    public DateTime? Day { get; set; }
    public Guid? GenreFilter { get; set; }
    public Sort SortBy { get; set; } = Sort.Time;
}
