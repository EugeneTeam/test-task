import { model, Schema, Model } from 'mongoose';
import { addressSchema } from '../address/address.schema';
import { ICustomer } from './customer.interfaces';
import { customerHooks } from './customer.hooks';

export const customerSchema = new Schema<ICustomer>(
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
  {
    timestamps: false,
  }
);

customerSchema.post(
  'insertMany',
  customerHooks.postInsertMany.bind(customerHooks)
);
customerSchema.post(
  'updateOne',
  customerHooks.postUpdateOne.bind(customerHooks)
);

export const Customer = model<ICustomer, Model<ICustomer>>(
  'customers',
  customerSchema
);
