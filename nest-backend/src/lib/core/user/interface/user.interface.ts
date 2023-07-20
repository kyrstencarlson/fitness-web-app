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
  token: string;
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
  token?: string;
  roles?: IUser['roles'];
  profile?: {
    first_name?: IUserProfile['first_name'];
    last_name?: IUserProfile['last_name'];
    birthday?: IUserProfile['birthday'];
    gender?: IUserProfile['gender'];
    height?: IUserProfile['height'];
    weight?: IUserProfile['weight'];
  };
}
