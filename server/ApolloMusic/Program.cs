using ApolloMusic.Api.Models;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Utils;
using ApolloMusic.Service;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.HttpLogging;
using System;
using DotNetEnv;
Env.Load();

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.
builder.Services.AddHttpLogging(options =>
{
    ; options.RequestBodyLogLimit = 4096; // default is 32k options.ResponseBodyLogLimit = 4096; // default is 32k
});


builder.Services.Configure<ApolloMusicDatabaseSetting>(
    builder.Configuration.GetSection("ApolloMusicDatabase"));


  builder.Services.Configure<ApolloMusicDatabaseSetting>(options =>
        {
            options.ConnectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
        });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUserRepository, UserRepositiry>();
builder.Services.AddSingleton<ILoginRepository, LoginRepository>();
builder.Services.AddSingleton<ITrackRepository, TrackRepository>();
builder.Services.AddSingleton<IArtistRepository, ArtistRepository>();
builder.Services.AddSingleton<IGenreRepository, GenreRepository>();
builder.Services.AddSingleton<ICurrentRepository, CurrentRepository>();
builder.Services.AddSingleton<ISearchRepository, SearchRepository>();

builder.Services.AddSingleton<IJwtRepository, JwtRepository>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000", "http://client"
                          
                          
                          ).AllowAnyHeader()
                                                  .AllowAnyMethod().AllowCredentials();
                      });
});


var app = builder.Build();
app.UseHttpLogging();
app.UseCors(MyAllowSpecificOrigins);
app.UseExceptionHandler ("/api/errors");
app.UseStaticFiles(); // Enables the static file middleware to serve files from wwwroot folder by default.
app.UseHttpLogging();



string pathToCheck = "Upload/Audio/"; // Replace this with the path you want to check

        if (Directory.Exists(pathToCheck))
        {
            Console.WriteLine("The directory already exists.");
        }
        else
        {
            try
            {
                Directory.CreateDirectory(pathToCheck);
                Console.WriteLine("The directory was successfully created.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating the directory: {ex.Message}");
            }
        }

string pathToCheck2 = "Upload/Images/"; // Replace this with the path you want to check

        if (Directory.Exists(pathToCheck2))
        {
            Console.WriteLine("The directory already exists.");
        }
        else
        {
            try
            {
                Directory.CreateDirectory(pathToCheck2);
                Console.WriteLine("The directory was successfully created.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating the directory: {ex.Message}");
            }
        }


// If you want to serve files from a specific directory (e.g., your custom static path):
var trackStaticPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload//Audio");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(trackStaticPath),
    RequestPath = "/tracks" ,// This will be the URL path to access the images.

      OnPrepareResponse = context =>
            {
                // Add the desired headers here
                context.Context.Response.Headers["Cache-Control"] = "public, max-age=3600"; // Cache for 1 hour
                // Add other headers as needed (ETag, Last-Modified, etc.).
            }
    
});

var imageStaticPath = Path.Combine(Directory.GetCurrentDirectory(), "Upload//Images");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imageStaticPath),
    RequestPath = "/images", // This will be the URL path to access the images.
        OnPrepareResponse = context =>
            {
                // Add the desired headers here
                context.Context.Response.Headers["Cache-Control"] = "public, max-age=3600"; // Cache for 1 hour
                // Add other headers as needed (ETag, Last-Modified, etc.).
            }
});






// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

Console.WriteLine(Environment.GetEnvironmentVariable("MONGODB_URI"));

var host = "http://*:5221"; 

app.Run(host);

