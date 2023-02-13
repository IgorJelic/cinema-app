using Presentation;
using Persistence;
using Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Services;
using Services.Abstractions;
using Domain.Repositories;
using Web.Middleware;
using Domain.EmailService;
using Persistence.EmailService;
using Persistence.Helpers;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config
IWebHostEnvironment env = builder.Environment;
const string _cors = "cors";

// Add services to the container.

builder.Services.AddControllers()
    .AddApplicationPart(typeof(AssemblyReference).Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add HttpContext Access
builder.Services.AddHttpContextAccessor();

// Custom service manager & repository manager
builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<IEmailService, EmailService>();

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// Database
builder.Services.AddDbContextPool<RepositoryDbContext>(builder => {
    var connectionString = configuration.GetConnectionString("Database");
    builder.UseSqlServer(connectionString, b => b.MigrationsAssembly("Persistence"));
    // builder.UseSqlServer(connectionString, b => b.MigrationsAssembly("Web"));
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder => {
        builder.WithOrigins("http://localhost:3000")//Ovde navodimo koje sve aplikacije smeju kontaktirati nasu,u ovom slucaju nas Angular front
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
    });
});

// Custom exception handling middleware
builder.Services.AddTransient<ExceptionHandlingMiddleware>();
builder.Services.AddTransient<JwtMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();

    app.UseSwagger();
    app.UseSwaggerUI();
}

// PROVERI OVO
app.UseStaticFiles(new StaticFileOptions{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Resources")),
    RequestPath = "/Resources"
});

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<JwtMiddleware>();

app.UseHttpsRedirection();

app.UseCors(_cors);

app.UseAuthorization();

app.MapControllers();

app.Run();