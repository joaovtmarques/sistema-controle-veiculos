import { VehicleModel } from '@/src/domain/models';
import { VehicleRepository } from '@/src/infra/repositories/vehicle-repository';

export class FindAllVehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(): Promise<VehicleModel[]> {
    return this.vehicleRepository.findAll();
  }
}
