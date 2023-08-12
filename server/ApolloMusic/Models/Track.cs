namespace ApolloMusic.Api.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



public class Track
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
          public string? Id { get; set; }

          public string Title { get; set; } = null;

		public string Song { get; set; } = null;

		public string Artist { get; set; } = null;

		public string TrackImage { get; set; } = null;

          public string  Genre {get; set;} = null;

          public string Duration { get; set;} = null;

          public int DurationInSec {get; set;}= 0;
          public int? DurationInMilliSec {get; set;}= 0;
          
		public int Plays { get; set; } = 0;



        [BsonRepresentation(BsonType.ObjectId)]
        public string? ArtistId { get; set; }




         [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
         [BsonElement("CreatedDate")]
          public DateTime? CreatedDate { get; set; } = DateTime.Now;

	}



public class TrackRequestInput
	{


         public string Title { get; set; } = null;

		 public  IFormFile Audio { get; set; } = null;

		 public string Artist { get; set; } = null;

		 public IFormFile Image { get; set; } = null;

          public string  Genre {get; set;} = null;
     
}