export interface User {
  uuid: string;
  name: string;
  userId: string;
  userPw: string;
}

export interface SafeUser {
  uuid: string;
  name: string;
  userId: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: SafeUser;
}
