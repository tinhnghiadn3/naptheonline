using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NapTheOnline.Models
{
    public partial class NapTheOnline247Context : DbContext
    {
        public NapTheOnline247Context()
        {
        }

        public NapTheOnline247Context(DbContextOptions<NapTheOnline247Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Prices> Prices { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Data Source=MAC;Initial Catalog=NapTheOnline247;Integrated Security=True;");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Game>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Prices>(entity =>
            {
                entity.Property(e => e.GameId).HasColumnName("Game_Id");

                entity.Property(e => e.Value).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Prices)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK__Prices__Game_Id__5EBF139D");
            });
        }
    }
}
