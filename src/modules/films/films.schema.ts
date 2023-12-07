import { Schema } from 'mongoose';

export const FilmSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  episode_id: { type: Number, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  release_date: { type: Date, required: true },
  opening_crawl: { type: String, required: true },
  characters: { type: Array, default: [] },
  planets: { type: Array, default: [] },
  starships: { type: Array, default: [] },
  vehicles: { type: Array, default: [] },
  species: { type: Array, default: [] },
  url: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
