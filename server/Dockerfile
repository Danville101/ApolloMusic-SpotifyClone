FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ./*.sln .
COPY ./ApolloMusic/*.csproj ./ApolloMusic/
RUN dotnet restore
COPY . .
WORKDIR "/src/ApolloMusic"
RUN dotnet build "ApolloMusic.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApolloMusic.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5221
ENTRYPOINT ["dotnet", "ApolloMusic.Api.dll"]


