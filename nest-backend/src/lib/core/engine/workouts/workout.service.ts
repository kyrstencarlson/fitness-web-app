import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_ENGINE } from 'src/config';
import {
  EWorkoutType,
  IEngineWorkoutDay,
  ModelEngineWorkout,
  WORKOUT_SCHEMA_NAME,
} from './interface';
import {
  USER_SCHEMA_NAME,
  ModelUser,
  UserService,
  EUserRoles,
} from '../../user';

@Injectable()
export class EngineWorkoutService {
  constructor(
    @InjectModel(WORKOUT_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelEngineWorkout: Model<ModelEngineWorkout>,
    @InjectModel(USER_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelUser: Model<ModelUser>,
  ) {}

  public async findOne(
    params: Partial<IEngineWorkoutDay>,
  ): Promise<IEngineWorkoutDay> {
    if (!params || !Object.keys(params).length) {
      throw new BadRequestException('Missing params');
    }

    const workout = await this._ModelEngineWorkout.findOne(params);

    if (!workout) {
      throw new BadRequestException('Could not find workout');
    }

    return workout;
  }

  public async getById(_id: string): Promise<IEngineWorkoutDay> {
    if (!_id) {
      throw new BadRequestException('Missing params');
    }

    const workout = await this._ModelEngineWorkout.findById(_id);

    if (!workout) {
      throw new BadRequestException('Could not find workout for id: ' + _id);
    }

    return workout;
  }

  public async listAll(): Promise<IEngineWorkoutDay[]> {
    try {
      return await this._ModelEngineWorkout.find().sort({
        day: 1,
      });
    } catch (error) {
      throw new BadRequestException('Could not find workouts');
    }
  }

  public async getAllForUser(user_id: string): Promise<IEngineWorkoutDay[]> {
    if (!user_id) {
      throw new BadRequestException('user id is required');
    }

    const user = await this._ModelUser.findOne({ _id: user_id });

    if (!user) {
      throw new BadRequestException('Could not find user for id: ' + user_id);
    }

    const month = user.engine_current_month;

    if (user.roles.includes(EUserRoles.ADMIN)) {
      return await this.listAll();
    }

    const workouts = await this._ModelEngineWorkout
      .find({
        month: {
          $lte: month,
        },
      })
      .sort({
        day: 1,
      });

    if (!workouts) {
      throw new BadRequestException('Could not find workouts this user');
    }

    return workouts;
  }

  public async getAllForMonth(month: number): Promise<IEngineWorkoutDay[]> {
    if (!month) {
      throw new BadRequestException('Month is required');
    }

    const workout = await this._ModelEngineWorkout.find({ month }).sort({
      day: 1,
    });

    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for month: ' + month,
      );
    }

    return workout;
  }

  public async getAllForWeek(week: number): Promise<IEngineWorkoutDay[]> {
    if (!week) {
      throw new BadRequestException('week is required');
    }

    const workout = await this._ModelEngineWorkout.find({ week }).sort({
      day: 1,
    });
    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for week: ' + week,
      );
    }

    return workout;
  }

  public async getAllByType(type: EWorkoutType): Promise<IEngineWorkoutDay[]> {
    if (!type) {
      throw new BadRequestException('type is required');
    }

    const workout = await this._ModelEngineWorkout.find({ type });

    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for type: ' + type,
      );
    }

    return workout;
  }

  public async getAllByPhase(phase: number): Promise<IEngineWorkoutDay[]> {
    if (!phase) {
      throw new BadRequestException('phase is required');
    }

    const workout = await this._ModelEngineWorkout.find({ phase }).sort({
      day: 1,
    });

    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for phase: ' + phase,
      );
    }

    return workout;
  }

  public async getAllByPhaseMonth(month: number): Promise<IEngineWorkoutDay[]> {
    if (!month) {
      throw new BadRequestException('Month is required');
    }

    const workout = await this._ModelEngineWorkout
      .find({ phaseMonth: month })
      .sort({
        day: 1,
      });

    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for phase month: ' + month,
      );
    }

    return workout;
  }

  public async getAllByPhaseWeek(week: number): Promise<IEngineWorkoutDay[]> {
    if (!week) {
      throw new BadRequestException('week is required');
    }

    const workout = await this._ModelEngineWorkout
      .find({ phaseWeek: week })
      .sort({
        day: 1,
      });

    if (!workout) {
      throw new BadRequestException(
        'Could not find workouts for phase week: ' + week,
      );
    }

    return workout;
  }
}
