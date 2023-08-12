using ApolloMusic.Api.Models;
using ApolloMusic.Models;

namespace ApolloMusic.Service
{
    public interface IGenreRepository
    {
           Task<List<Genre>> GetAllAsync();

           Task CreateAsync(Genre newGenre);

    }
}