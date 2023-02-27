import { AxiosInstance } from 'axios';
import { CreateUserType, LoginUserType, ResponseAuthType, ResponseUserType } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async getAllUsers() {
    const { data } = await instance.get('/users');
    return data as ResponseUserType[];
  },

  async register(createUsetType: CreateUserType) {
    const { data } = await instance.post('/auth/register', createUsetType);
    return data as ResponseAuthType;
  },

  async login(loginUserType: LoginUserType) {
    const { data } = await instance.post('/auth/login', loginUserType);
    return data as ResponseAuthType;
  },

  async getMyInfo() {
    const { data } = await instance.get('/users/me');
    return data as ResponseAuthType;
  },
});
