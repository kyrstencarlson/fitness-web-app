import {
  IEngineWorkoutLog,
  IEngineWorkoutLogBase,
} from './workout_logs.interface';

/**
 * @Controller('api/engine/logs')
 */
export interface IEngineWorkoutLogsController {
  /**
   * @Post('get')
   * @param user_id string
   * @param params Partial<IEngineWorkoutDay>
   */
  findOne(
    user_id: string,
    params: Partial<IEngineWorkoutLogBase>,
  ): Promise<IEngineWorkoutLog>;
}
