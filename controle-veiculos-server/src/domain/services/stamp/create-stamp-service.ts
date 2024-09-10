import { StampModel } from '@/src/domain/models';
import { UserRepository } from '@/src/infra/repositories/user-repository';
import { StampRepository } from '@/src/infra/repositories/stamp-repository';
import { CreateStampFileService } from './create-stamp-file-service';
import { VehicleRepository } from '@/src/infra/repositories/vehicle-repository';
import { ICreateStampParams, StampStatus } from '@/src/api/controllers/stamp';

export class CreateStampService {
  constructor(
    private readonly stampRepository: StampRepository,
    private readonly userRepository: UserRepository,
    private readonly vehicleRepository: VehicleRepository
  ) {}

  async execute(data: ICreateStampParams): Promise<StampModel> {
    const createStampFileService = new CreateStampFileService();

    const user = await this.userRepository.findById(data.userId);

    if (user) {
      const vehicle = await this.vehicleRepository.findById(data.vehicleId);

      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const stampExists = await this.stampRepository.findStampByPlate(
        vehicle.plate
      );
      const stamps = await this.stampRepository.findAllStamps();

      if (stampExists) {
        throw new Error('A stamp with this plate is already registered');
      }

      let lastStampNumber = 0;
      const [lastStamp] = stamps.slice(-1);

      if (lastStamp) {
        lastStampNumber = lastStamp.number;
      }

      const stamp = await this.stampRepository.create({
        number: lastStampNumber + 1,
        userId: data.userId,
        status: StampStatus.U_ANALYSIS,
        vencHab: parseInt(data.vencHab.toString()),
        lic: parseInt(data.lic.toString()),
        vehicleId: vehicle.id,
      });

      createStampFileService.execute({
        number: stamp.number,
        plate: vehicle.plate,
        type: vehicle.type,
        rank: user.rank,
        warName: user.warName,
        SU: user.SU,
      });

      return stamp;
    } else {
      throw new Error('User not found');
    }
  }
}
