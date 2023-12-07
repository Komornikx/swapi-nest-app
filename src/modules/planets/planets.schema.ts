import { Schema } from 'mongoose';

export const PlanetSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  rotation_period: { type: String, required: true },
  orbital_period: { type: String, required: true },
  diameter: { type: String, required: true },
  climate: { type: String, required: true },
  gravity: { type: String, required: true },
  terrain: { type: String, required: true },
  surface_water: { type: String, required: true },
  population: { type: String, required: true },
  residents: { type: Array, default: [] },
  films: { type: Array, default: [] },
  url: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
