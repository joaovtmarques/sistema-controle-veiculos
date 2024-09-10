import prismaClient from '@/src/prisma';
import { AdminModel } from '@/src/domain/models';
import { AdminRepository } from '../admin-repository';

export class PrismaAdminRepository implements AdminRepository {
  async findById(id: string): Promise<AdminModel | null> {
    return await prismaClient.admin.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<AdminModel | null> {
    return await prismaClient.admin.findFirst({
      where: {
        email,
      },
    });
  }
}
