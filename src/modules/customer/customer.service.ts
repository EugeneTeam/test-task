import { faker } from '@faker-js/faker';
import { Customer } from './customer.schema';
import { customerFactory } from '../../factories/customer.factory';
import { addressFactory } from '../../factories/address.factory';
import { CREATE_INTERVAL } from '../../common/common.constants';
import { Request, Response } from 'express';

export class CustomerService {
  private static interval: ReturnType<typeof setTimeout>;

  static start(req: Request, res: Response) {
    this.interval = setInterval(async () => {
      const usersCount = faker.number.int({ min: 1, max: 10 });
      const customers: InstanceType<typeof Customer>[] = [];

      for (let i = 0; i < usersCount; i++) {
        customers.push(
          customerFactory.createCustomer({
            address: addressFactory.createAddress({}),
          })
        );
      }
      await Customer.insertMany(customers);
    }, CREATE_INTERVAL);

    res.status(200).json({ status: 'success' });
  }

  static stop(req: Request, res: Response): void {
    clearInterval(this.interval);
    res.status(200).json({ status: 'success' });
  }
}
