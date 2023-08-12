FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


### STAGE PROCESS  ##

#FROM node:18 AS build
#WORKDIR /app
#
#
#COPY package*.json ./
#RUN npm install
#
#
#COPY . .
#
#
#RUN npm run build
#
#
#FROM node:18 AS production
#WORKDIR /app
#
#
#COPY --from=build /app/package*.json ./
#
#
#RUN npm install 
#
#RUN npm run start
