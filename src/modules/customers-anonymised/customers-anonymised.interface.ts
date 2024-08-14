import { Document } from 'mongoose';
import { IAddress } from '../address/address.interfaces';

export interface ICustomersAnonymised extends Document {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
  createdAt: Date;
}
