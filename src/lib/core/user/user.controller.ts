import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';
import { IUserController } from './interface';

@Controller('api/user')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Post('get')
  async findOne(@Body() params: Partial<IUser>): Promise<IUser> {
    return this.userService.findOne(params);
  }

  @Post()
  async create(@Body() email: string, password: string): Promise<IUser> {
    return this.userService.create(email, password);
  }
}
