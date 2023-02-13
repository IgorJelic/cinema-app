namespace Domain.Entities;

public class Reservation
{
    public Guid Id { get; set; }
    public string UserEmail { get; set; }
    public int TotalPrice { get; set; } // da li treba cuvati kao double zbog popusta ili je okej int?
    public bool IsDeleted { get; set; }

    public MovieScreening MovieScreening { get; set; }
    public List<Seat> ChosenSeats { get; set; } = new List<Seat>();
}
