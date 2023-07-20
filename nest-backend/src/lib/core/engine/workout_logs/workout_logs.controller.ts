import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import {
  IEngineWorkoutLog,
  IEngineWorkoutLogParamsModality,
  IEngineWorkoutLogParamsModalityUnits,
  IEngineWorkoutLogsController,
} from './interface';
import { EngineWorkoutLogService } from './workout_logs.service';
import { IDayType } from '../workouts';

@Controller('engine/logs')
@UseGuards(AuthGuard)
export class EngineWorkoutLogController
  implements IEngineWorkoutLogsController
{
  constructor(
    private readonly _EngineWorkoutLogService: EngineWorkoutLogService,
  ) {}

  @Post(':user_id/find-one')
  async findOne(
    @Param('user_id') user_id: string,
    @Body() params: Partial<IEngineWorkoutLog>,
  ): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.findOne(user_id, params);
  }

  @Get(':id')
  async getById(@Param('id') _id: string): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.getById(_id);
  }

  @Get(':id/find')
  async getAllForUser(@Param('id') _id: string): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.allForUser(_id);
  }

  @Post(':user_id/month/:month')
  async getAllForMonth(
    @Param('user_id') user_id: string,
    @Param('month') month: number,
  ): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.getAllForMonth(user_id, month);
  }

  @Post(':user_id/type/:type')
  async getAllForType(
    @Param('user_id') user_id: string,
    @Param('type') type: IDayType,
  ): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.getAllByType(user_id, type);
  }

  @Post('modality')
  async getModality(
    @Body() body: IEngineWorkoutLogParamsModality,
  ): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.getAllByModality(body);
  }

  @Post('modality-units')
  async getModalityAndUnits(
    @Body() body: IEngineWorkoutLogParamsModalityUnits,
  ): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.getAllByModalityAndUnits(body);
  }
}
