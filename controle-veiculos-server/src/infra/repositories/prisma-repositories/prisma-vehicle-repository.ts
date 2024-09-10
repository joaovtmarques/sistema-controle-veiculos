import {
  IUpdateVehicleParams,
  IVehicleParams,
} from '@/src/api/controllers/vehicle';
import prismaClient from '@/src/prisma';
import { VehicleModel } from '@/src/domain/models';
import { VehicleRepository } from '../vehicle-repository';

export class PrismaVehicleRepository implements VehicleRepository {
  async create(data: IVehicleParams): Promise<VehicleModel> {
    return await prismaClient.vehicle.create({
      data,
    });
  }

  async findByPlate(plate: string): Promise<VehicleModel | null> {
    return await prismaClient.vehicle.findFirst({
      where: {
        plate,
      },
    });
  }

  async findAll(): Promise<VehicleModel[]> {
    return await prismaClient.vehicle.findMany({
      include: {
        user: true,
        stamp: true,
      },
    });
  }

  async findById(vehicleId: string): Promise<VehicleModel | null> {
    return await prismaClient.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });
  }

  async update(params: IUpdateVehicleParams): Promise<void> {
    await prismaClient.vehicle.updateMany({
      data: {
        model: params.model,
        color: params.color,
        type: params.type,
        plate: params.plate,
      },
    });
  }

  async delete(vehicleId: string): Promise<void> {
    await prismaClient.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });
  }
}
