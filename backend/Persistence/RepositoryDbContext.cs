namespace Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

public class RepositoryDbContext : DbContext
{
    public RepositoryDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Genre> Genres { get;set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieScreening> MovieScreenings { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(RepositoryDbContext).Assembly);
        modelBuilder.Entity<Movie>()
            .HasQueryFilter(movie => !movie.IsDeleted);
        modelBuilder.Entity<MovieScreening>()
            .HasQueryFilter(screning => !screning.IsDeleted);
        modelBuilder.Entity<Reservation>()
            .HasQueryFilter(reservation => !reservation.IsDeleted);
    }  
}
