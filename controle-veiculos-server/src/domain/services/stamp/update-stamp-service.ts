import { IUpdateStampParams } from '@/src/api/controllers/stamp';
import { StampRepository } from '@/src/infra/repositories';

export class UpdateStampService {
  constructor(private readonly stampRepository: StampRepository) {}

  async execute(params: IUpdateStampParams) {
    const stamp = await this.stampRepository.findById(params.stampId);

    if (!stamp) throw new Error('Selo não encontrado');

    await this.stampRepository.update(params);

    return await this.stampRepository.findById(params.stampId);
  }
}
