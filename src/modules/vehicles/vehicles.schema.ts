import { Schema } from 'mongoose';

export const VehicleSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  cost_in_credits: { type: String, required: true },
  length: { type: String, required: true },
  max_atmosphering_speed: { type: String, required: true },
  crew: { type: String, required: true },
  passengers: { type: String, required: true },
  cargo_capacity: { type: String, required: true },
  consumables: { type: String, required: true },
  vehicle_class: { type: String, required: true },
  pilots: { type: Array, default: [] },
  films: { type: Array, default: [] },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
