using System;
using ApolloMusic.Api.Models;

namespace ApolloMusic.Api.Service
{
    public interface IArtistRepository
    {
        Task<Artist?> GetByIdAsync(string id);
        Task<List<Artist>> GetAllAsync();

		Task<Artist?> GetByNameAsync(string name);

		Task CreateAsync(Artist newArtist);

		Task DeleteAsync(string id);

		Task UpdateAsync(string id, Artist updatedArtist);
    }
}