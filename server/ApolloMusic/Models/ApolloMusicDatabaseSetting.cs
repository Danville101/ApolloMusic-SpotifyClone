using System;
namespace ApolloMusic.Api.Models
{
	public class ApolloMusicDatabaseSetting
	{
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;
        
        public string TrackCollectionName { get; set; } = null!;

        public string ArtistCollectionName { get; set; } = null!;
        public string GenreCollectionName { get; set; } = null!;
        public string CurrentCollectionName { get; set; } = null!;


    }
}

