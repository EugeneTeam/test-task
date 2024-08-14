import { startServer } from './app';
import { CustomerRouter } from './modules/customer/customer.controller';
import { API_PREFIX } from './common/common.constants';
import { Express } from 'express';

startServer().then((app: Express): void => {
  app.use(API_PREFIX, CustomerRouter);
});
