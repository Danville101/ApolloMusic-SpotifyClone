namespace ApolloMusic.Api.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



public class Current
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
          public string? Id { get; set; }

          public List<Track>  Tracks  { get; set; } = null;


        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }




         [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
         [BsonElement("CreatedDate")]
          public DateTime? CreatedDate { get; set; } = DateTime.Now;

         [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
         [BsonElement("UpdatedDate")]
          public DateTime? UpdatedDate { get; set; } = DateTime.Now;

  
}



public class CurrentRequestInput
	{
    
          public List<Track?>  Tracks { get; set; } = null;


        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }




        
	}

public class CurrentUpdateRequesInput
	{
    
          public List<Track?>  Tracks { get; set; } = null;


        
	}