import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ENGINE } from 'src/lib/constant';
import { WORKOUT_SCHEMA_NAME, engineWorkoutSchema } from './interface';
import { EngineWorkoutController } from './workout.controller';
import { EngineWorkoutService } from './workout.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: WORKOUT_SCHEMA_NAME,
          schema: engineWorkoutSchema,
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
