using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using ApolloMusic.Service;
using ApolloMusic.Models;

namespace ApolloMusic.Controllers
{  

    [ApiController]
    [Route("api/[controller]")]
    public class SearchController: ControllerBase
    {
        private readonly ISearchRepository _searchRepository;


        public SearchController(ISearchRepository searchRepository){
            _searchRepository = searchRepository;
        }

        [HttpGet("{phrase}")]
        public async  Task<IActionResult> Search (string phrase){

          var artist = await _searchRepository.SearchArtist(phrase);

          var tracks = await _searchRepository.SearchTacks(phrase);

           Dictionary<string, object> searchResults = new Dictionary<string, object>();
                    searchResults["Artist"] = artist;
        searchResults["Song"] = tracks;        
          

           return Ok(
searchResults
           );
           

        }



     


        
    }
}