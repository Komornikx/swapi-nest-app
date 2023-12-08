# Star Wars Films API

This project implements a simple Star Wars Films API.

## Description

Built using:

- NestJS (Fastify)
- TypeScript
- MongoDB (Mongoose)

Data in that application are fetched directly from https://swapi.dev/

## Features

1. Fetch information about Star Wars films from the [SWAPI](https://swapi.dev/).
2. Cache mechanism to improve performance and reduce API requests.

## Prerequisites

- Node.js
- MongoDB

## Routes

This Node API includes few routes we can use.</br>

<h3>1. Films Routes:</h3>
<b>GET - /films</b> </br>
This route returns an array of all films inside the database.
</br></br>
<b>GET - /films/:id</b> </br>
This route returns specific film by given id</br>

Example response:

```json
{
  "_id": "1",
  "__v": 0,
  "characters": [],
  "director": "George Lucas",
  "episode_id": 4,
  "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  "planets": [],
  "producer": "Gary Kurtz, Rick McCallum",
  "release_date": {
    "$date": "1977-05-25T00:00:00.000Z"
  },
  "species": [],
  "starships": [],
  "title": "A New Hope",
  "url": "https://swapi.dev/api/films/1/",
  "vehicles": []
}
```

<b>GET - /films/analysis</b> </br>

Returns:

- An array of pairs of unique words from all films openings paired with their
  number of occurrences in the text. Words should not be empty and should be
  separated by space or any number of consecutive control characters (i.e
  carriage return, line feed)
- A name of a character from the /people API that appears the most often
  across all of the openings of the film

</br></br>

<h3>2. Planets Routes</h3>
<b>GET - /planets</b> </br>
This route returns an array of all planets
</br></br>
<b>GET - /planets/:id</b> </br>
This route returns specific planet by given id</br>

Example response:

```json
{
  "_id": "1",
  "__v": 0,
  "climate": "arid",
  "diameter": "10465",
  "films": [],
  "gravity": "1 standard",
  "name": "Tatooine",
  "orbital_period": "304",
  "population": "200000",
  "residents": [],
  "rotation_period": "23",
  "surface_water": "1",
  "terrain": "desert",
  "url": "https://swapi.dev/api/planets/1/"
}
```

</br></br>

<h3>3. Species Routes</h3>
<b>GET - /species</b> </br>
This route returns an array of all species
</br></br>
<b>GET - /species/:id</b> </br>
This route returns specific species by given id</br>

Example response:

```json
{
  "_id": "1",
  "__v": 0,
  "average_height": "180",
  "average_lifespan": "120",
  "classification": "mammal",
  "designation": "sentient",
  "eye_colors": "brown, blue, green, hazel, grey, amber",
  "films": ["https://swapi.dev/api/films/1/"],
  "hair_colors": "blonde, brown, black, red",
  "homeworld": "https://swapi.dev/api/planets/9/",
  "language": "Galactic Basic",
  "name": "Human",
  "people": [],
  "skin_colors": "caucasian, black, asian, hispanic",
  "url": "https://swapi.dev/api/species/1/"
}
```

</br></br>

<h3>4. Starships Routes</h3>
<b>GET - /starships</b> </br>
This route returns an array of all starships
</br></br>
<b>GET - /starships/:id</b> </br>
This route returns specific starships by given id</br>

Example response:

```json
{
  "_id": "2",
  "MGLT": "60",
  "__v": 0,
  "cargo_capacity": "3000000",
  "consumables": "1 year",
  "cost_in_credits": "3500000",
  "crew": "30-165",
  "films": ["https://swapi.dev/api/films/6/"],
  "hyperdrive_rating": "2.0",
  "length": "150",
  "manufacturer": "Corellian Engineering Corporation",
  "max_atmosphering_speed": "950",
  "model": "CR90 corvette",
  "name": "CR90 corvette",
  "passengers": "600",
  "pilots": [],
  "starship_class": "corvette",
  "url": "https://swapi.dev/api/starships/2/"
}
```

</br></br>

<h3>5. Vehicles Routes</h3>
<b>GET - /vehicles</b> </br>
This route returns an array of all vehicles
</br></br>
<b>GET - /vehicles/:id</b> </br>
This route returns specific vehicles by given id</br>

Example response:

```json
{
  "_id": "4",
  "__v": 0,
  "cargo_capacity": "50000",
  "consumables": "2 months",
  "cost_in_credits": "150000",
  "crew": "46",
  "films": ["https://swapi.dev/api/films/5/"],
  "length": "36.8 ",
  "manufacturer": "Corellia Mining Corporation",
  "max_atmosphering_speed": "30",
  "model": "Digger Crawler",
  "name": "Sand Crawler",
  "passengers": "30",
  "pilots": [],
  "vehicle_class": "wheeled"
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

Application can be run also in docker

```bash
# development
$ docker-compose up api

# build production image
$ docker build . -t api:latest
```

Application works by default on http://localhost:3010
</br>

## Test

```bash
# unit tests
$ npm run test
```
