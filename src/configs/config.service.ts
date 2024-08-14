import { config } from 'dotenv';

config({ path: `env/.env.${process.env.NODE_ENV || 'development'}` });

class ConfigService {
  appPort(): number {
    return 3000;
  }

  getMongoDbName(): string {
    return 'test_db_name';
  }

  getMongoUrl(): string {
    return this.getValue('DB_URI');
  }

  getValue(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Value by key ${key} not found`);
    }

    return value;
  }
}

const configService = new ConfigService();

export { configService };
