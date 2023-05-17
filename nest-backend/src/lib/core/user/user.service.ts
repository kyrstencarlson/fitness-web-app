import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_ENGINE } from '../../constant';
import { USER_SCHEMA_NAME } from './interface/user.constant';
import { IUser } from './interface/user.interface';
import { ModelUser } from './interface/user.schema';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class UserService {
  constructor(
    @InjectModel(USER_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelUser: Model<ModelUser>,
  ) {
    setTimeout(() => {
      console.log('UserService');
    }, 5000);
  }

  public async findOne(params: Partial<IUser>): Promise<IUser> {
    if (!params || !Object.keys(params).length) {
      throw new BadRequestException('Missing params');
    }

    const user = await this._ModelUser.findOne(params);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  public async create(email: string, password: string): Promise<IUser> {
    try {
      return await this._ModelUser.create({ email, password });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
