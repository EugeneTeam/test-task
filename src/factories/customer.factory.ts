import { Customer } from '../modules/customer/customer.schema';
import { addressFactory } from './address.factory';
import { faker } from '@faker-js/faker';
import { IAddress } from '../modules/address/address.interfaces';

type createCustomerType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: IAddress;
  createdAt?: number;
};

export class CustomerFactory {
  createCustomer({
    firstName = faker.person.firstName(),
    lastName = faker.person.lastName(),
    email = faker.internet.email(),
    address = addressFactory.createAddress({}),
    createdAt = Date.now(),
  }: createCustomerType) {
    return new Customer({
      firstName,
      lastName,
      email,
      address,
      createdAt,
    });
  }
}

const customerFactory = new CustomerFactory();

export { customerFactory };
