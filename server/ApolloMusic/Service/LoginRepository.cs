using System;
using ApolloMusic.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCrypt.Net;

namespace ApolloMusic.Api.Service
{
	public class LoginRepository:ILoginRepository
	{
		
		


        private readonly IMongoCollection<User> _userCollection;

        public LoginRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<User>(
                apolloMusicDatabaseSetting.Value.UserCollectionName);
        }


     


        public async Task<User?> LoginAsync(LoginInPut loginInPut)
        {
           var user = await _userCollection.Find(x => x.Email == loginInPut.Email).FirstOrDefaultAsync();
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginInPut.Password, user.Password);

            if (isPasswordValid)
            {
                return user;
            }
            else
            {
                return null;
            }


        }

       
    }
	
}

