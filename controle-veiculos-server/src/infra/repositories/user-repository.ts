import {
  ICreateUserParams,
  IUpdateUserParams,
} from '@/src/api/controllers/user';
import { UserModel } from '@/src/domain/models';

export interface UserRepository {
  create(params: ICreateUserParams): Promise<UserModel>;

  findById(userId: string): Promise<UserModel | null>;

  findAll(): Promise<UserModel[]>;

  deleteUser(userId: string): Promise<void>;

  updateUser(params: IUpdateUserParams): Promise<void>;
}
