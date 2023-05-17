export enum EUserRoles {
  ADMIN = 'admin',
  ENGINE = 'engine',
  SKILLS = 'skills',
  STRENGTH = 'strength',
}

export class IUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  roles: EUserRoles[];
  profile: IUserProfile;
}

export class IUserProfile {
  name: string;
  birthday: Date;
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
  roles?: EUserRoles[];
  profile?: {
    name?: string;
    birthday?: Date;
  };
}
