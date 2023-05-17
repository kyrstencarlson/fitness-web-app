import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { PROVIDER } from 'src/config';
import { environment } from './environment';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    switch (environment.environmentName) {
      case 'production':
        return {
          uri: process.env.MONGO_URI,
          readPreference: 'nearest',
          readPreferenceTags: [{ provider: PROVIDER }],
        };
      case 'staging':
        return {
          uri: process.env.MONGO_URI,
          readPreference: 'nearest',
          readPreferenceTags: [{ provider: PROVIDER }],
        };
      case 'development':
        return {
          uri: process.env.MONGO_TEST_URI,
          readPreference: 'nearest',
          readPreferenceTags: [{ provider: PROVIDER }],
        };
      default:
        console.log('default', process.env.MONGO_TEST_URI);
        return {
          uri: process.env.MONGO_TEST_URI,
          readPreference: 'nearest',
          readPreferenceTags: [{ provider: PROVIDER }],
        };
    }
  }
}
