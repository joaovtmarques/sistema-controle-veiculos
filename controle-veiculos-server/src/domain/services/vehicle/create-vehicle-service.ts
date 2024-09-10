import { VehicleModel } from '@/src/domain/models';
import { capitalize } from '@/src/api/controllers/helpers';
import { IVehicleParams } from '@/src/api/controllers/vehicle';
import { VehicleRepository } from '@/src/infra/repositories/vehicle-repository';

export class CreateVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(data: IVehicleParams): Promise<VehicleModel> {
    const vehicle = await this.vehicleRepository.findByPlate(
      data.plate.toUpperCase().replace('-', '').replace(' ', '')
    );

    if (vehicle) {
      throw new Error('A vehicle with this plate is already registered');
    }

    return await this.vehicleRepository.create({
      color: capitalize(data.color),
      model: capitalize(data.model),
      plate: data.plate.toUpperCase(),
      type: capitalize(data.type),
      userId: data.userId,
    });
  }
}
