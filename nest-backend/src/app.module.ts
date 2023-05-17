import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './lib/core/auth/auth.module';
import { UserModule } from './lib/core/user/user.module';
import { MongoDatabaseModule } from './lib/mongo/mongo.module';

const CORE_MODULES = [UserModule, AuthModule];

@Module({
  imports: [...CORE_MODULES, MongoDatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
