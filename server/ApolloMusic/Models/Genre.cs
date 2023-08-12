using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ApolloMusic.Models
{
    public class Genre
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
          public string? Id { get; set; }

        public string Name { get; set; } = null;
        
    }
    public class GenreRequestInput
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
          public string? Id { get; set; }

        public string Name { get; set; } = null;
        
    }
}