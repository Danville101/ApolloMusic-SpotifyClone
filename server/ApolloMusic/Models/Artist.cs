namespace ApolloMusic.Api.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



public class Artist
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
          public string? Id { get; set; }

          public string Name { get; set; } = null;

		public string CoverImage { get; set; } = null;

          public int Listens {get; set;}= 0;


	



         [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
         [BsonElement("CreatedDate")]
          public DateTime? CreatedDate { get; set; }

	}
public class ArtistRequestInPut
	{
     

          public string Name { get; set; } = null;

		public IFormFile Image { get; set; } = null;
	



	}
