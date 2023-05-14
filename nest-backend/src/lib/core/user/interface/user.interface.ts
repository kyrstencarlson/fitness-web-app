export class IUser {
  email: string;
  password: string;
  profile: {
    name: string;
    birthday: Date;
  };
}
