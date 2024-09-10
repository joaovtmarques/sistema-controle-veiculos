import prismaClient from '@/src/prisma';
import { UploadModel } from '@/src/domain/models';
import { UploadRepository } from '../upload-repository';
import { IUploadFiles } from '@/src/api/controllers/upload';

export class PrismaUploadRepository implements UploadRepository {
  async create(data: IUploadFiles): Promise<void> {
    await prismaClient.upload.create({
      data,
    });
  }

  async findByUserId(userId: string): Promise<UploadModel | null> {
    return await prismaClient.upload.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }
}
