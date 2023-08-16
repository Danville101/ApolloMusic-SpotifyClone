using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using ApolloMusic.Service;
using ApolloMusic.Models;

namespace ApolloMusic.Api.Controllers
{  

    [ApiController]
    [Route("api/[controller]")]
    public class GenreController: ControllerBase
    {
        private readonly IGenreRepository _genreRepository;


        public GenreController(IGenreRepository GenreRepository){
            _genreRepository = GenreRepository;
        }

        [HttpPost]
        public async  Task<IActionResult> CreateGenre (GenreRequestInput newGenre){
           
           var genre = new Genre{Name =newGenre.Name};

           await _genreRepository.CreateAsync(genre);


           return Ok();
           

        }


        [HttpGet]

        public async Task<IActionResult> GetGenres(){
          var genres = await _genreRepository.GetAllAsync();

          return Ok(genres);
        }


     


        
    }
}