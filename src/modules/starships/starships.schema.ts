import { Schema } from 'mongoose';

export const StarshipSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});
