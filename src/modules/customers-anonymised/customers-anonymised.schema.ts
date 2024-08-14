import { Schema, Model, model } from 'mongoose';
import { addressSchema } from '../address/address.schema';
import { ICustomersAnonymised } from './customers-anonymised.interface';

export const customersAnonymisedSchema = new Schema<ICustomersAnonymised>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {}
);

export const CustomersAnonymised = model<
  ICustomersAnonymised,
  Model<ICustomersAnonymised>
>('customersAnonymised', customersAnonymisedSchema);
