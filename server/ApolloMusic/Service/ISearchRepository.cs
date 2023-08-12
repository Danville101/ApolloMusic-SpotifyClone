using ApolloMusic.Api.Models;

namespace ApolloMusic.Service
{
    public interface ISearchRepository
    {
      Task<List<Track?>>  SearchTacks(string phrase);

       Task<List<Artist?>>  SearchArtist(string phrase);
    }
   
}