using System.Linq;
using ApolloMusic.Api.Models;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Xml.Linq;

namespace ApolloMusic.Service
{
    public class SearchRepository : ISearchRepository
    {


        private readonly IMongoCollection<Track> _trackCollection;
         private readonly IMongoCollection<Artist> _artistCollection;

        public SearchRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _trackCollection = mongoDatabase.GetCollection<Track>(
                apolloMusicDatabaseSetting.Value.TrackCollectionName);

              _artistCollection = mongoDatabase.GetCollection<Artist>(
                apolloMusicDatabaseSetting.Value.ArtistCollectionName);
        }


        public async Task<List<Artist?>> SearchArtist(string name)
        {
            return await _artistCollection.Find(x=> x.Name.ToLower().Contains(name.ToLower())).ToListAsync();
        }

        public async  Task<List<Track?>> SearchTacks(string title)
        {
            return await _trackCollection.Find(x => x.Title.ToLower().Contains(title.ToLower())).ToListAsync();  
        }
    }
}