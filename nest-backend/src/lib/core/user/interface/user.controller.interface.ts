import { IUser } from './user.interface';

/**
 * @Controller('api/user')
 */
export interface IUserController {
  /**
   * @Post()
   * @param email string
   * @param password string
   */
  create(email: string, password: string): Promise<IUser>;
  /**
   * @Post('get')
   * @param params Partial<IUser>
   */
  findOne(params: Partial<IUser>): Promise<IUser>;
}
