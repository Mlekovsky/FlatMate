using FlatMate_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Infrastructure.Persistence.Configurations
{
    public class ApartamentConfiguration : IEntityTypeConfiguration<Apartament>
    {
        public void Configure(EntityTypeBuilder<Apartament> builder)
        {
            builder.Property(x => x.ShortName)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(x => x.City)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(x => x.Address)
                .HasMaxLength(300)
                .IsRequired();
        }
    }
}
