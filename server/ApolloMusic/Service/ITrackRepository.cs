using ApolloMusic.Api.Models;

namespace ApolloMusic.Service
{
    public interface ITrackRepository
    {

        Task CreateTrackAsync(Track track);
        Task<List<Track>> GetTracks();
        Task<List<Track>> GetTracksByGenre(string genre);

        Task<List<Track?>> GetTracksByArtistAsync(string name);
         
    }
}