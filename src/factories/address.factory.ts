import { faker } from '@faker-js/faker';
import { IAddress } from '../modules/address/address.interfaces';

export type createAddressType = {
  line1?: string;
  line2?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
};

class AddressFactory {
  createAddress({
    line1 = faker.location.secondaryAddress(),
    line2 = faker.location.streetAddress(),
    postcode = faker.location.zipCode(),
    city = faker.location.city(),
    state = faker.location.state(),
    country = faker.location.country(),
  }: createAddressType): IAddress {
    return {
      line1,
      line2,
      postcode,
      city,
      state,
      country,
    } as IAddress;
  }
}

const addressFactory = new AddressFactory();

export { addressFactory };
