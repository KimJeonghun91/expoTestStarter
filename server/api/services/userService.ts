import { ERROR_MSG } from '@/constants/msg';
import apiMockClient from '../apiMockClient';
import { User, SafeUser, LoginResult } from '../types/user';
import { AxiosError } from 'axios';

export class userService {
  static async getUsers(): Promise<SafeUser[]> {
    try {
      const response = await apiMockClient.get<User[]>('/users');
      // 비밀번호 정보 제거
      return response.data.map(({ userPw, ...safeUser }) => safeUser);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async userLogin(userId: string, userPw: string): Promise<LoginResult> {
    try {
      const response = await apiMockClient.get<User[]>(`/users?userId=${userId}`);

      if (response.data.length === 0) {
        return {
          success: false,
          message: ERROR_MSG.ID_NOT_FOUND
        };
      }

      const user = response.data[0];

      if (user.userPw === userPw) {
        const { userPw, ...safeUserData } = user;
        return {
          success: true,
          user: safeUserData,
          message: `${user.name}님 환영합니다.`
        };
      }

      return {
        success: false,
        message: ERROR_MSG.PASSWORD_INCORRECT
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getUserByUuid(uuid: string): Promise<SafeUser | null> {
    try {
      const response = await apiMockClient.get<User[]>(`/users?uuid=${uuid}`);
      if (response.data.length > 0) {
        const { userPw, ...safeUserData } = response.data[0];
        return safeUserData;
      }
      return null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      return new Error(error.response?.data?.message || '서버 오류가 발생했습니다.');
    }
    return error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.');
  }
}
