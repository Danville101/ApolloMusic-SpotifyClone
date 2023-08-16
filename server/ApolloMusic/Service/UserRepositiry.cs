using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ApolloMusic.Api.Models;


namespace ApolloMusic.Api.Service
{
    public class UserRepositiry : IUserRepository
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserRepositiry(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<User>(
                apolloMusicDatabaseSetting.Value.UserCollectionName);
        }


        public async Task CreateAsync(UserRquestInPut newUser)
        {
            var user = new User { Email = newUser.Email, Birthday=newUser.Birthday, Password = newUser.Password, Username = newUser.Username  };

            await _userCollection.InsertOneAsync(user);

            
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<User?>  GetByEmailAsync(string email)
        {
            var user = await _userCollection.Find(x => x.Email == email).FirstOrDefaultAsync();

            return user;
            
        }

        public async Task<User?> GetByIdAsync(string id)
        {
           var user = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return user;
        }

        public Task UpdateAsync(string id, User updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}

