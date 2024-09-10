import { UploadRepository, UserRepository } from '@/src/infra/repositories';

export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: string, files: string[]) {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    let filesStr = '';

    files.map((file) => {
      if (filesStr === '') {
        filesStr = file;
      } else {
        filesStr += ',' + file;
      }
    });

    await this.uploadRepository.create({
      userId: userId,
      files: filesStr,
    });
  }
}
