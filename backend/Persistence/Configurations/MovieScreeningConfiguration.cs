namespace Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

public class MovieScreeningConfiguration : IEntityTypeConfiguration<MovieScreening>
{
    public void Configure(EntityTypeBuilder<MovieScreening> builder)
    {
        builder.Property(x => x.ScreeningTime).IsRequired();
        builder.Property(x => x.TicketPrice).IsRequired();
        builder.Property(x => x.Rows).IsRequired();
        builder.Property(x => x.Columns).IsRequired();
    }
}
