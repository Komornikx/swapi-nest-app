import { Schema } from 'mongoose';

export const FilmSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  opening_crawl: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
