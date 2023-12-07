import { Schema } from 'mongoose';

export const PlanetSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
