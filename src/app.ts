import express, { Express } from 'express';
import { configService } from './configs/config.service';
import mongoClient from 'mongoose';

const app: Express = express();

const connectToDb = async (): Promise<void> => {
  await mongoClient.connect(configService.getMongoUrl(), {
    dbName: configService.getMongoDbName(),
  });
};

const startServer = async (): Promise<Express> => {
  await connectToDb();

  app.listen(configService.appPort(), () => {
    console.log('server already started!');
  });

  return app;
};

export { startServer };
