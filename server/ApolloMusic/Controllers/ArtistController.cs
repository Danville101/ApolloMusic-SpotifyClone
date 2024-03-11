using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;

namespace ApolloMusic.Api.Controllers
{  

    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController: ControllerBase
    {
        private readonly IArtistRepository _artistRepository;


        public ArtistController(IArtistRepository artistRepository){
            _artistRepository = artistRepository;
        }

        [HttpPost]
        public async  Task<IActionResult> CreateArtist ([FromForm]ArtistRequestInPut newArtist){

           

              
                    var imageFile =  await   WriteFile(newArtist.Image);
                    var landscapeImage = await WriteFile(newArtist.LandscapeImage);

               var artist = new Artist{
                Name = newArtist.Name,
            CoverImage = $"http://localhost:5221/images/{imageFile}",
            LandscapeImage = $"http://localhost:5221/images/{landscapeImage}",
            Listens = 0
            };  
            
            await _artistRepository.CreateAsync(artist);
            Console.WriteLine(artist);

             return Ok("Created");

           
           

         
    
           


        }



         private async Task<string> WriteFile(IFormFile file)
        {
            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;




                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload/Images");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload/Images", filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                Console.WriteLine(exactpath.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Cant upload image,{ex}");
            }
            return filename;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtist(string id){
            var artist = await _artistRepository.GetByIdAsync(id);

            return Ok(artist);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync(){
            var artists = await _artistRepository.GetAllAsync();

            return Ok(artists);

        }


        
    }
}