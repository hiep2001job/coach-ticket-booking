using coach_ticket_booking_api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.Emit;
using System.Xml;

namespace coach_ticket_booking_api.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //Identity
            /*
            builder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims");
            builder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.RoleId, x.UserId });
            builder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);

            builder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims");
            builder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserTokens").HasKey(x => x.UserId);
           
            #region relationships

           
            //address - user
            builder.Entity<Address>()
                .HasOne(a => a.User).WithMany()
                .HasForeignKey(a => a.UserID).OnDelete(DeleteBehavior.Restrict);

            // office - town
            builder.Entity<Office>()
                .HasOne(o=>o.Town).WithMany()
                .HasForeignKey(o=>o.TownId).OnDelete(DeleteBehavior.Restrict);

            

            //trip - route
            builder.Entity<Trip>()
                .HasOne(t => t.Route).WithMany()
                .HasForeignKey(t => t.RouteID).OnDelete(DeleteBehavior.Restrict);

            //trip - coach
            builder.Entity<Trip>()
                .HasOne(t => t.Coach).WithMany()
                .HasForeignKey(t => t.CoachID).OnDelete(DeleteBehavior.Restrict);

           
            
            //booking - trip
            builder.Entity<Booking>()
                .HasOne(t => t.Trip).WithMany()
                .HasForeignKey(t => t.TripID).OnDelete(DeleteBehavior.Restrict);

            //booking - user
            builder.Entity<Booking>()
                .HasOne(t => t.User).WithMany()
                .HasForeignKey(t => t.UserID).OnDelete(DeleteBehavior.Restrict);

            //news - user
            builder.Entity<News>()
                .HasOne(t => t.Creator).WithMany()
                .HasForeignKey(t => t.CreatorID).OnDelete(DeleteBehavior.Restrict);

           
            #endregion
            */
            //seat - booking
            builder.Entity<Seat>()
                .HasOne(s => s.Booking).WithMany(b => b.Seats)
                .HasForeignKey(t => t.BookingID).OnDelete(DeleteBehavior.NoAction).HasConstraintName("seat_booking"); // Specify ON DELETE NO ACTION

            //seat - trip
            builder.Entity<Seat>()
                .HasOne(s => s.Trip).WithMany(t => t.Seats)
                .HasForeignKey(t => t.TripID).OnDelete(DeleteBehavior.NoAction).HasConstraintName("seat_trip");


            //route - from office 
            builder.Entity<Models.Route>()
                .HasOne(r => r.FromOffice).WithMany()
                .HasForeignKey(r => r.FromOfficeID).OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION


            //route - to office 
            builder.Entity<Models.Route>()
                .HasOne(r => r.ToOffice).WithMany()
                .HasForeignKey(r => r.ToOfficeID).OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION

            //contact - user sender
            builder.Entity<Contact>()
                .HasOne(t => t.Sender).WithMany()
                .HasForeignKey(t => t.SenderID).OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION

            //contact - user respondent
            builder.Entity<Contact>()
                .HasOne(t => t.Respondent).WithMany()
                .HasForeignKey(t => t.RespondentID).OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION

            builder.Entity<Address>()
           .Property(e => e.Id)
           .ValueGeneratedOnAdd();

            builder.Entity<User>()
          .Property(e => e.Id)
          .ValueGeneratedOnAdd();

            builder.Entity<Coach>()
           .Property(e => e.Id)
           .ValueGeneratedOnAdd();

            builder.Entity<Booking>()
          .Property(e => e.Id)
          .ValueGeneratedOnAdd();

            builder.Entity<Contact>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<News>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<Office>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<Models.Route>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<Seat>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<Town>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

           builder.Entity<Trip>()
         .Property(e => e.Id)
         .ValueGeneratedOnAdd();

            builder.Entity<Role>()
                .HasData(
                    new Role { Id = Guid.NewGuid(), Name = "Customer", NormalizedName = "CUSTOMER" },
                    new Role { Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
