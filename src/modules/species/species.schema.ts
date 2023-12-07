import { Schema } from 'mongoose';

export const SpeciesSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  classification: { type: String, required: true },
  designation: { type: String, required: true },
  average_height: { type: String, required: true },
  skin_colors: { type: String, required: true },
  hair_colors: { type: String, required: true },
  eye_colors: { type: String, required: true },
  average_lifespan: { type: String, required: true },
  homeworld: { type: String, required: false },
  language: { type: String, required: true },
  people: { type: Array, default: [] },
  films: { type: Array, default: [] },
  url: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
