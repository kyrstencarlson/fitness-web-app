import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { IEngineWorkoutController } from './interface/workout.controller.interface';
import { EngineWorkoutService } from './workout.service';
import { IDayType, IEngineWorkoutDay } from './interface';

@Controller('engine/workout')
@UseGuards(AuthGuard)
export class EngineWorkoutController implements IEngineWorkoutController {
  constructor(private readonly userService: EngineWorkoutService) {}

  @Post('find')
  async findOne(
    @Body() params: Partial<IEngineWorkoutDay>,
  ): Promise<IEngineWorkoutDay> {
    return this.userService.findOne(params);
  }

  @Post(':id')
  async getById(@Param('id') _id: string): Promise<IEngineWorkoutDay> {
    return this.userService.getById(_id);
  }

  @Post('month/:month')
  async getAllForMonth(
    @Param('month') month: number,
  ): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllForMonth(month);
  }

  @Post('week/:week')
  async getAllForWeek(
    @Param('week') week: number,
  ): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllForWeek(week);
  }

  @Post('type/:type')
  async getAllForType(
    @Param('type') type: IDayType,
  ): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllByType(type);
  }

  @Post('phase/:phase')
  async getPhase(@Param('phase') phase: number): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllByPhase(phase);
  }

  @Post('phase/month/:month')
  async getPhaseMonth(
    @Param('month') month: number,
  ): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllByPhaseMonth(month);
  }

  @Post('phase/week/:week')
  async getPhaseWeek(
    @Param('week') week: number,
  ): Promise<IEngineWorkoutDay[]> {
    return this.userService.getAllByPhaseWeek(week);
  }
}
