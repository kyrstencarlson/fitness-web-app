import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_ENGINE } from 'src/config';
import { IDayType } from '../workouts';
import {
  IEngineWorkoutLog,
  IEngineWorkoutLogParamsCreate,
  IEngineWorkoutLogParamsModality,
  IEngineWorkoutLogParamsModalityUnits,
  IEngineWorkoutLogParamsUpdate,
  ModelEngineWorkoutLog,
  POPULATE_WORKOUT_LOGS,
  WORKOUT_LOGS_SCHEMA_NAME,
} from './interface';

@Injectable()
export class EngineWorkoutLogService {
  private logger = new Logger(EngineWorkoutLogService.name);
  constructor(
    @InjectModel(WORKOUT_LOGS_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelEngineWorkoutLog: Model<ModelEngineWorkoutLog>,
  ) {}

  public async create(
    body: IEngineWorkoutLogParamsCreate,
  ): Promise<IEngineWorkoutLog> {
    const { user_id, workout, ...params } = body;

    if (!user_id || !workout) {
      throw new BadRequestException('User_id and workout_id are required');
    }

    try {
      return await this._ModelEngineWorkoutLog.create(params);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not create workout log');
    }
  }

  public async update(
    body: IEngineWorkoutLogParamsUpdate,
  ): Promise<IEngineWorkoutLog> {
    const { log_id, ...params } = body;

    if (!log_id) {
      throw new BadRequestException('Log id is required');
    }

    try {
      return await this._ModelEngineWorkoutLog.findByIdAndUpdate(
        log_id,
        params,
        { new: true, runValidators: true },
      );
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not create workout log');
    }
  }

  public async delete(id: string): Promise<IEngineWorkoutLog> {
    if (!id) {
      throw new BadRequestException('Log id is required');
    }

    try {
      return await this._ModelEngineWorkoutLog.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not create workout log');
    }
  }

  public async allForUser(user_id: string): Promise<IEngineWorkoutLog[]> {
    if (!user_id) {
      throw new BadRequestException('user id is required');
    }

    const logs = await this._ModelEngineWorkoutLog.find({ user: user_id });

    if (!logs) {
      throw new BadRequestException('Could not find workout logs for user');
    }

    return logs;
  }

  public async findOne(
    user_id: string,
    params: Omit<Partial<IEngineWorkoutLog>, 'user'>,
  ): Promise<IEngineWorkoutLog> {
    if (!params || !Object.keys(params).length) {
      throw new BadRequestException('Missing params');
    }

    const logs = await this._ModelEngineWorkoutLog.findOne({
      user: user_id,
      ...params,
    });

    if (!logs) {
      throw new BadRequestException('Could not find workout log');
    }

    return logs;
  }

  public async getById(_id: string): Promise<IEngineWorkoutLog> {
    if (!_id) {
      throw new BadRequestException('Missing params');
    }

    const workout = await this._ModelEngineWorkoutLog.findById(_id);

    if (!workout) {
      throw new BadRequestException(
        'Could not find workout log for id: ' + _id,
      );
    }

    return workout;
  }

  public async getAllForMonth(
    user_id: string,
    month: number,
  ): Promise<IEngineWorkoutLog[]> {
    if (!month) {
      throw new BadRequestException('Month is required');
    }

    const workout = await this._ModelEngineWorkoutLog
      .find({
        user: user_id,
        'workout.month': month,
      })
      .populate(POPULATE_WORKOUT_LOGS);

    if (!workout) {
      throw new BadRequestException(
        'Could not find workout logs for month: ' + month,
      );
    }

    return workout;
  }

  public async getAllByType(
    user_id: string,
    type: IDayType,
  ): Promise<IEngineWorkoutLog[]> {
    if (!type) {
      throw new BadRequestException('type is required');
    }

    const workout = await this._ModelEngineWorkoutLog
      .find({
        user: user_id,
        workout_type: type,
      })
      .populate(POPULATE_WORKOUT_LOGS);

    if (!workout) {
      throw new BadRequestException(
        'Could not find workout logs for type: ' + type,
      );
    }

    return workout;
  }

  public async getAllByModality(
    body: IEngineWorkoutLogParamsModality,
  ): Promise<IEngineWorkoutLog[]> {
    const { user_id, modality, start_month, end_month } = body;
    if (!user_id) {
      throw new BadRequestException('user id is required');
    }

    const findParams = {
      user: user_id,
      modality,
    };

    if (start_month && end_month) {
      findParams['workout_month'] = {
        $gte: start_month,
        $lte: end_month,
      };
    }

    const log = await this._ModelEngineWorkoutLog
      .find(findParams)
      .populate('workout');

    if (!log) {
      throw new BadRequestException(
        'Could not find workout logs for this user for modality: ' + modality,
      );
    }

    return log;
  }

  public async getAllByModalityAndUnits(
    body: IEngineWorkoutLogParamsModalityUnits,
  ): Promise<IEngineWorkoutLog[]> {
    const { user_id, modality, units, start_month, end_month } = body;
    if (!user_id) {
      throw new BadRequestException('user id is required');
    }

    const findParams = {
      user: user_id,
      modality,
      units,
    };

    if (start_month && end_month) {
      findParams['workout_month'] = {
        $gte: start_month,
        $lte: end_month,
      };
    }

    const log = await this._ModelEngineWorkoutLog
      .find(findParams)
      .populate('workout');
    if (!log) {
      throw new BadRequestException(
        'Could not find workout logs for this user',
      );
    }

    return log;
  }
}
