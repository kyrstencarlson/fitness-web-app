import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { DB_ENGINE } from 'src/config';
import { ModelUser, USER_SCHEMA_NAME } from '../user';
import { UserService } from '../user/user.service';
import {
  IAuthParamsForgotPassword,
  IAuthParamsLogin,
  IAuthParamsRegister,
  IAuthParamsResetPassword,
} from './interface/auth.interface';

export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(USER_SCHEMA_NAME, DB_ENGINE)
    private readonly _ModelUser: Model<ModelUser>,
    private userService: UserService,
  ) {}

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  };

  comparePassword = (password: string, hash: string) =>
    bcrypt.compareSync(password, hash);

  public async login(body: IAuthParamsLogin) {
    const { email, password } = body;
    const user = await this._ModelUser.findOne({ email });

    if (!user) {
      throw new Error('No user found for this email');
    }

    const match = this.comparePassword(password, user.password);

    if (!match) {
      throw new Error('Password is incorrect');
    }

    // generate token

    return user;
  }

  public async logout() {
    console.log('logout');
  }

  public async register(params: IAuthParamsRegister) {
    if (!params || !Object.keys(params).length) {
      throw new Error('Missing params');
    }
    const { email, password, confirmPassword } = params;
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const user = await this._ModelUser.findOne({ email });
    if (user) {
      throw new Error('Email already exists');
    }

    const hashed = this.hashPassword(password);
    try {
      const newUser = await this.userService.create(email, hashed);
      //token
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async forgotPassword(body: IAuthParamsForgotPassword) {
    console.log('forgotPassword');
  }

  public async resetPassword(body: IAuthParamsResetPassword) {
    console.log('resetPassword');
  }
}
