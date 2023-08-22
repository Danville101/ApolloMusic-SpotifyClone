using System;
using DotNetEnv;

namespace ApolloMusic.Api.Utils
{
	public class JwtRepository : IJwtRepository
	{
		public JwtRepository()
		{
		}

        public string GetEnvironmentVariable()
        {
            Env.Load();
            return Environment.GetEnvironmentVariable("MY_SECERT");
        }
    }
}

