using System.Globalization;
using System.Net.Mime;
using ApolloMusic.Api.Models;
using ApolloMusic.Api.Service;
using ApolloMusic.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace ApolloMusic.Api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class TrackController : ControllerBase
    {



       private readonly ITrackRepository _trackRepo;
       private readonly IArtistRepository _artistRepo;

       public  TrackController(ITrackRepository trackRepository, IArtistRepository artistRepository){

          _trackRepo = trackRepository;
          _artistRepo = artistRepository;
       }



        [HttpPost]
       
        public async Task<IActionResult> UploadFile([FromForm]TrackRequestInput trackRequest )
        {
            var audioFile = await WriteFile(trackRequest.Audio);
            var imageFile = await WriteFile(trackRequest.Image);

            string filePath = $"Upload/Audio/{audioFile}"; // Replace this with the path to your song file

            string trackDuration = "";
            try
            {
                var file = TagLib.File.Create(filePath);
                TimeSpan duration = file.Properties.Duration;
                Console.WriteLine($"Song duration: {duration}");
                trackDuration = $"{duration}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

              string timeString = trackDuration;


        var artistNameExist = await _artistRepo.GetByNameAsync(trackRequest.Artist);
            string? _id;
            
            if (artistNameExist == null){
            var artistNew = new Artist{
                Name= trackRequest.Artist,
                CoverImage = $"http://localhost:5221/images/{imageFile}"
            };

           var  createdArtist =   _artistRepo.CreateAsync(artistNew);

           _id =  createdArtist.Id.ToString();
        }
    

     
        // Parse the time string into a TimeSpan object
        TimeSpan timeSpan = TimeSpan.Parse(timeString);

        // Get the total number of seconds from the TimeSpan
        int totalSeconds = (int)timeSpan.TotalSeconds;


            var track = new Track{
               Title = trackRequest.Title,
               Genre = trackRequest.Genre,
               Artist = trackRequest.Artist,
               Song = $"http://localhost:5221/tracks/{audioFile}",
               TrackImage = $"http://localhost:5221/images/{imageFile}",
               Duration = trackDuration,
               DurationInSec = totalSeconds,
               ArtistId = "64bfa64fb939d2649c27e759"

            };

            await _trackRepo.CreateTrackAsync(track);

            

            return Ok("Created");
        }







        private async Task<string> WriteFile(IFormFile file)
        {
            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;

                var uploadPath = "";

                 string[] popularImageExtensions = { ".jpeg", ".jpg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp", ".svg", ".raw", ".psd", ".ai", ".eps", ".ico", ".heic" };

                 string[] popularAudioExtensions = { ".mp3", ".wav", ".aac", ".flac", ".ogg", ".wma", ".aiff", ".m4a", ".ac3", ".mp4", ".amr", ".midi" };

                 for(var i = 0; i < popularImageExtensions.Length; i++){
                    if(popularImageExtensions[i] == extension){
                        uploadPath =  "Upload/Images/";
                         break;
                    }
                
                 } 




                 for(var i = 0; i < popularAudioExtensions.Length; i++){
                    if(popularAudioExtensions[i] == extension){
                         uploadPath = "Upload/Audio/";
                         break;
                    }
                
                 } 




                var filepath = Path.Combine(Directory.GetCurrentDirectory(), uploadPath);

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), uploadPath, filename);
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










        [HttpGet]
     
        public async Task<IActionResult> Get(){
        
       var tracks = await _trackRepo.GetTracks();

       return Ok(tracks);
        }



           [HttpGet("{genre}")]
     
        public async Task<IActionResult> GetByGenre(string genre){
        
       var tracks = await _trackRepo.GetTracksByGenre(genre);

       return Ok(tracks);
        }

    }
}
