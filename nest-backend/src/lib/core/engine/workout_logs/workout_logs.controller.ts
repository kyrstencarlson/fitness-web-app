import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import {
  IEngineWorkoutLog,
  IEngineWorkoutLogParamsCreate,
  IEngineWorkoutLogParamsModality,
  IEngineWorkoutLogParamsModalityUnits,
  IEngineWorkoutLogParamsUpdate,
  IEngineWorkoutLogsController,
} from './interface';
import { EngineWorkoutLogService } from './workout_logs.service';
import { EWorkoutType } from '../workouts';

@Controller('engine/logs')
@UseGuards(AuthGuard)
export class EngineWorkoutLogController
  implements IEngineWorkoutLogsController
{
  constructor(
    private readonly _EngineWorkoutLogService: EngineWorkoutLogService,
  ) {}

  @Post()
  async create(
    @Body() body: IEngineWorkoutLogParamsCreate,
  ): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.create(body);
  }

  @Put()
  async update(
    @Body() body: IEngineWorkoutLogParamsUpdate,
  ): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.update(body);
  }

  @Delete(':id')
  async delete(@Param('id') _id: string): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.delete(_id);
  }

  @Post(':user_id/find-one')
  async findOne(
    @Param('user_id') user_id: string,
    @Body() params: Partial<IEngineWorkoutLog>,
  ): Promise<IEngineWorkoutLog> {
    return this._EngineWorkoutLogService.findOne(user_id, params);
  }

  @Post('list')
  async list(): Promise<IEngineWorkoutLog[]> {
    return this._EngineWorkoutLogService.listAll();
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
    @Param('type') type: EWorkoutType,
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

  @Get(':user_id/completed')
  async getCompleted(@Param('user_id') user_id: string) {
    return this._EngineWorkoutLogService.getCompletedMonths(user_id);
  }
}
