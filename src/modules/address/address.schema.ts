import { Schema } from 'mongoose';
import { IAddress } from './address.interfaces';

export const addressSchema: Schema<IAddress> = new Schema<IAddress>(
  {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
    postcode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
