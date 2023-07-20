import { IUser, IUserParamsCreate } from './user.interface';

/**
 * @Controller('api/user')
 */
export interface IUserController {
  /**
   * @Post()
   * @param params IUserParamsCreate
   */
  create(params: IUserParamsCreate): Promise<IUser>;
  /**
   * @Post('get')
   * @param params Partial<IUser>
   */
  findOne(params: Partial<IUser>): Promise<IUser>;
}
