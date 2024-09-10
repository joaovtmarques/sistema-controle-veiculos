import {
  ECreateStampParams,
  IUpdateStampParams,
} from '@/src/api/controllers/stamp';
import prismaClient from '@/src/prisma';
import { StampModel } from '@/src/domain/models';
import { StampRepository } from '../stamp-repository';

export class PrismaStampRepository implements StampRepository {
  async create(data: ECreateStampParams): Promise<StampModel> {
    return await prismaClient.stamp.create({
      data,
      include: {
        vehicle: true,
        user: true,
      },
    });
  }

  async findAllStamps(): Promise<StampModel[]> {
    return await prismaClient.stamp.findMany({
      include: {
        vehicle: true,
        user: true,
      },
    });
  }

  async findStampByPlate(plate: string): Promise<StampModel | null> {
    return await prismaClient.stamp.findFirst({
      where: {
        vehicle: {
          plate,
        },
      },
      include: {
        vehicle: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<StampModel | null> {
    return await prismaClient.stamp.findFirst({
      where: {
        userId,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async findById(stampId: string): Promise<StampModel | null> {
    return await prismaClient.stamp.findFirst({
      where: {
        id: stampId,
      },
    });
  }

  async update(params: IUpdateStampParams): Promise<void> {
    await prismaClient.stamp.updateMany({
      where: {
        id: params.stampId,
      },
      data: {
        lic: params.lic,
        vencHab: params.vencHab,
        status: params.status,
      },
    });
  }
}
