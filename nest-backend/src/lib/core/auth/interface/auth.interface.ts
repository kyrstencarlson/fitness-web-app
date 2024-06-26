export class IAuthParamsLogin {
  email: string;
  password: string;
}

export class IAuthParamsRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export class IAuthParamsForgotPassword {
  email: string;
}

export class IAuthParamsResetPassword {
  user_id: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export class IAuthParamsRefreshToken {
  token: string;
}
