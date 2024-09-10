import { StampModel } from '@/src/domain/models';
import { StampRepository } from '@/src/infra/repositories/stamp-repository';

export class FindAllStampsService {
  constructor(private readonly stampRepository: StampRepository) {}

  async execute(): Promise<StampModel[]> {
    return await this.stampRepository.findAllStamps();
  }
}
