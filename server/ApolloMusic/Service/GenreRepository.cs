using ApolloMusic.Models;
using ApolloMusic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace ApolloMusic.Service
{
    public class GenreRepository : IGenreRepository
    {


          private readonly IMongoCollection<Genre> _genreCollection;

        public GenreRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _genreCollection = mongoDatabase.GetCollection<Genre>(
                apolloMusicDatabaseSetting.Value.GenreCollectionName);
        }

        public async Task CreateAsync(Genre newGenre)
        {
           await  _genreCollection.InsertOneAsync(newGenre);
        }

        public async Task<List<Genre>> GetAllAsync()
        {
        return await _genreCollection.Find(_ => true).ToListAsync();
        }


        
    }
}