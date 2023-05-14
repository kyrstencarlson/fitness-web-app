import { IUser } from '../../user';

/**
 * @Controller('api/auth')
 */
export interface IAuthController {
  login(email: string, password: string): Promise<IUser>;
  register(params: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<IUser>;
  logout(): Promise<void>;
  // refreshToken(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
}
