import { IEngineWorkoutDay } from './workout.interface';

/**
 * @Controller('api/engine/workout')
 */
export interface IEngineWorkoutController {
  /**
   * @Post('get')
   * @param params Partial<IEngineWorkoutDay>
   */
  findOne(params: Partial<IEngineWorkoutDay>): Promise<IEngineWorkoutDay>;
}
