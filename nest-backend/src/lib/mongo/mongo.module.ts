import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongo.config.service';
import { DB_ENGINE } from 'src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      connectionName: DB_ENGINE,
    }),
  ],
  providers: [MongooseConfigService],
  exports: [],
})
export class MongoDatabaseModule {}
