import {
  ICreateUserParams,
  IUpdateUserParams,
} from '@/src/api/controllers/user';
import prismaClient from '@/src/prisma';
import { UserModel } from '@/src/domain/models';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
  async create(data: ICreateUserParams): Promise<UserModel> {
    return await prismaClient.user.create({
      data,
    });
  }

  async findById(userId: string): Promise<UserModel | null> {
    return await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async findAll(): Promise<UserModel[]> {
    return await prismaClient.user.findMany();
  }

  async deleteUser(userId: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(data: IUpdateUserParams): Promise<void> {
    await prismaClient.user.updateMany({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        rank: data.rank,
        warName: data.warName,
        SU: data.SU,
      },
    });
  }
}
