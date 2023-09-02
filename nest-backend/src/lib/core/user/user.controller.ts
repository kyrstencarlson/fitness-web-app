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
import {
  IUser,
  IUserParamsCreate,
  IUserParamsUpdate,
} from './interface/user.interface';
import { UserService } from './user.service';
import { IUserController } from './interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post('find-one')
  async findOne(@Body() params: Partial<IUser>): Promise<IUser> {
    return this.userService.findOne(params);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<IUser> {
    return this.userService.getById(id);
  }

  @Get()
  async listAll(): Promise<IUser[]> {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() params: IUserParamsCreate): Promise<IUser> {
    return this.userService.create(params);
  }

  @Put()
  async update(@Body() params: IUserParamsUpdate): Promise<IUser> {
    return this.userService.update(params);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IUser> {
    return this.userService.delete(id);
  }
}
