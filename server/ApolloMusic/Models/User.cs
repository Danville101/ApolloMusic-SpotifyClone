using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System;
namespace ApolloMusic.Api.Models
{
	public class User
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
      
        public string Username { get; set; } = null;

		public string Email { get; set; } = null;

		public string Password { get; set; } = null;

		public DateTime Birthday { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)] // Adjust this based on your timezone requirements
        [BsonElement("CreatedDate")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

	}




    public class UserRquestInPut
    {
        
        [Required(ErrorMessage = "Username is required bro.")]
        public string Username { get; set; } = null;

        [EmailAddress(ErrorMessage ="Please provide valid email address")]
        public string Email { get; set; } = null;


        [MinLength(8, ErrorMessage = "Password should me 8 or more characters ")]
        public string Password { get; set; } = null;

        [MinLength(8, ErrorMessage = "Password should me 8 or more characters ")]
        public string Password2 { get; set; } = null;

        public DateTime Birthday { get; set; }

    }

       public class GetUserByIdInPut
    {
        [Required(ErrorMessage = "Id is required")]
        [MinLength(8, ErrorMessage = "Password should me 8 or more characters ")]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null;

        

    }


    public class LoginInPut
    {
        

        public string? Username { get; set; } = null;

        public string? Email { get; set; } = null;

        public string Password { get; set; } = null;


    }

}

