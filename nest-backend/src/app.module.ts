import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './lib/core/auth/auth.module';
import { UserModule } from './lib/core/user/user.module';
import { MongoDatabaseModule } from './lib/mongo/mongo.module';
import { EngineWorkoutModule } from './lib/core/engine';

const CORE_MODULES = [UserModule, AuthModule];

const ENGINE_MODULES = [EngineWorkoutModule];

@Module({
  imports: [
    ...CORE_MODULES,
    ...ENGINE_MODULES,
    MongoDatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
