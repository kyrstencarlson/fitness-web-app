import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ENGINE } from 'src/lib/constant';
import { WORKOUT_LOGS_SCHEMA_NAME, engineWorkoutLogSchema } from './interface';
import { EngineWorkoutLogController } from './workout_logs.controller';
import { EngineWorkoutLogService } from './workout_logs.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: WORKOUT_LOGS_SCHEMA_NAME,
          schema: engineWorkoutLogSchema,
        },
      ],
      DB_ENGINE,
    ),
  ],
  controllers: [EngineWorkoutLogController],
  providers: [EngineWorkoutLogService],
  exports: [EngineWorkoutLogService],
})
export class EngineWorkoutLogsModule {}
