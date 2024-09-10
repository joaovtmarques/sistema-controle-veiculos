import { VehicleRepository } from '@/src/infra/repositories';

export class DeleteVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(vehicleId: string) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) throw new Error('Veículo não encontrado');

    await this.vehicleRepository.delete(vehicleId);
  }
}
