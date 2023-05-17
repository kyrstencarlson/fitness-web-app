import { IUser } from '../../user';
import {
  IAuthParamsForgotPassword,
  IAuthParamsRegister,
} from './auth.interface';

/**
 * @Controller('api/auth')
 */
export interface IAuthController {
  login(IAuthParamsLogin);
  register(params: IAuthParamsRegister);
  logout(): Promise<void>;
  // refreshToken(): Promise<void>;
  forgotPassword(params: IAuthParamsForgotPassword): Promise<void>;
}
