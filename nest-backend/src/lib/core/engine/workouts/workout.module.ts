import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ENGINE } from 'src/lib/constant';
import { WORKOUT_SCHEMA_NAME, engineWorkoutSchema } from './interface';
import { EngineWorkoutController } from './workout.controller';
import { EngineWorkoutService } from './workout.service';
import { USER_SCHEMA_NAME, userSchema } from '../../user';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: WORKOUT_SCHEMA_NAME,
          schema: engineWorkoutSchema,
        },
        {
          name: USER_SCHEMA_NAME,
          schema: userSchema,
        },
      ],
      DB_ENGINE,
    ),
  ],
  controllers: [EngineWorkoutController],
  providers: [EngineWorkoutService],
  exports: [EngineWorkoutService],
})
export class EngineWorkoutModule {}
