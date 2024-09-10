import { UploadModel } from '../../models';
import { UploadRepository, UserRepository } from '@/src/infra/repositories';

export class FindUploadByUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uploadRepository: UploadRepository
  ) {}

  async execute(userId: string): Promise<UploadModel | null> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    const uploadExists = await this.uploadRepository.findByUserId(userId);

    if (!uploadExists) {
      return null;
    }

    const fileStr = uploadExists.files.toString();
    const fileArr = fileStr.split(',');

    return {
      id: uploadExists.id,
      files: fileArr,
      userId: uploadExists.userId,
    };
  }
}
