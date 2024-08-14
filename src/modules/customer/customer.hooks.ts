import { ICustomer } from './customer.interfaces';
import { CustomersAnonymised } from '../customers-anonymised/customers-anonymised.schema';
import { generateAnonymizedValue } from '../../helpres/anonymizer.helper';

export class CustomerHooks {
  async postInsertMany(customers: ICustomer[]): Promise<void> {
    if (!customers.length) return;

    await this.makeAnonymized(customers);
  }

  async postUpdateOne(customer: ICustomer): Promise<void> {
    if (!customer) return;

    await this.makeAnonymized([customer]);
  }

  private async makeAnonymized(customers: ICustomer[]): Promise<void> {
    const customersAnonymisedData = [];

    for (const customer of customers) {
      const data = {
        firstName: generateAnonymizedValue(customer.firstName),
        lastName: generateAnonymizedValue(customer.lastName),
        email: this.parseAndAnonymizedEmail(customer.email),
        address: {
          line1: generateAnonymizedValue(customer.address.line1),
          line2: generateAnonymizedValue(customer.address?.line2),
          postcode: generateAnonymizedValue(customer.address.postcode),
          city: customer.address.city,
          state: customer.address.state,
          country: customer.address.country,
        },
        createdAt: customer.createdAt,
      };

      customersAnonymisedData.push(new CustomersAnonymised(data));
    }

    await CustomersAnonymised.insertMany(customersAnonymisedData);
  }

  private parseAndAnonymizedEmail(email: string): string {
    const values: string[] = email.split('@');
    return `${generateAnonymizedValue(values[0])}@${values[1]}`;
  }
}

const customerHooks = new CustomerHooks();

export { customerHooks };
