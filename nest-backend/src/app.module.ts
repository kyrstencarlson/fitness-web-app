import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './lib/core/user/user.module';
import { MongoDatabaseModule } from './lib/mongo/mongo.module';
import { AuthModule } from './lib/core/auth/auth.module';

const CORE_MODULES = [UserModule, AuthModule];

@Module({
  imports: [
    ...CORE_MODULES,
    MongoDatabaseModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
