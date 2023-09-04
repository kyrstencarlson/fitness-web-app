export enum EUserRoles {
  ADMIN = 'admin',
  ENGINE = 'engine',
  SKILLS = 'skills',
  STRENGTH = 'strength',
}

export enum EUserGender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SPECIFIED = 'not specified',
}

export class IUser {
  _id: string;
  email: string;
  password: string;
  // tokens: {
  //   accessToken?: string;
  //   refreshToken?: string;
  // };
  token: string;
  engine_current_month: number;
  skills_current_month: number;
  strength_current_month: number;
  roles: EUserRoles[];
  profile: IUserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export class IUserProfile {
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: EUserGender;
  height: number;
  weight: number;
}

export class IUserParamsCreate {
  email: string;
  password: string;
  profile?: Partial<IUserProfile>;
}

export class IUserParamsFindOne {
  _id?: string;
  email?: string;
  token?: string;
}

export class IUserParamsUpdate {
  _id: string;
  email?: string;
  password?: string;
  // tokens?: {
  //   accessToken?: string;
  //   refreshToken?: string;
  // };
  token?: string;
  roles?: IUser['roles'];
  engine_current_month?: IUser['engine_current_month'];
  skills_current_month?: IUser['skills_current_month'];
  strength_current_month?: IUser['strength_current_month'];
  profile?: {
    first_name?: IUserProfile['first_name'];
    last_name?: IUserProfile['last_name'];
    birthday?: IUserProfile['birthday'];
    gender?: IUserProfile['gender'];
    height?: IUserProfile['height'];
    weight?: IUserProfile['weight'];
  };
}
