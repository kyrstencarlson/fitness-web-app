import {
  BadRequestException,
  Injectable,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_ENGINE } from '../../constant';
import { USER_SCHEMA_NAME } from './interface/user.constant';
import {
  IUser,
  IUserParamsCreate,
  IUserParamsUpdate,
} from './interface/user.interface';
import { ModelUser } from './interface/user.schema';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectModel(USER_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelUser: Model<ModelUser>,
  ) {
    // setTimeout(() => {
    //   console.log('UserService');
    // }, 5000);
  }

  public async getById(id: string): Promise<IUser> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const user = await this._ModelUser.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  public async getAll(): Promise<IUser[]> {
    return await this._ModelUser.find();
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

  public async create(params: IUserParamsCreate): Promise<IUser> {
    const { email, password } = params;

    if (!email || !password) {
      throw new BadRequestException('Email and password is required');
    }

    try {
      return await this._ModelUser.create(params);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not create user');
    }
  }

  public async update(body: IUserParamsUpdate): Promise<IUser> {
    const { _id, ...params } = body;
    try {
      return await this._ModelUser.findByIdAndUpdate(_id, params, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not update user');
    }
  }

  public async delete(id: string): Promise<IUser> {
    try {
      return await this._ModelUser.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Could not delete user');
    }
  }
}
