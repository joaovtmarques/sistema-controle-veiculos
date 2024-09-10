import { IUpdateVehicleParams } from '@/src/api/controllers/vehicle';
import { UserRepository, VehicleRepository } from '@/src/infra/repositories';

export class UpdateVehicleService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly vehicleRepository: VehicleRepository
  ) {}

  async execute(data: IUpdateVehicleParams) {
    const user = await this.userRepository.findById(data.userId);

    if (!user) throw new Error('Usuário não encontrado');

    const vehicle = await this.vehicleRepository.findById(data.vehicleId);

    if (!vehicle) throw new Error('Veículo não encontrado');

    await this.vehicleRepository.update(data);

    return await this.vehicleRepository.findById(data.vehicleId);
  }
}
