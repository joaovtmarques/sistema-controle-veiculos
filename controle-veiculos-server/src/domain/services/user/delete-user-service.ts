import { UserRepository } from '@/src/infra/repositories/user-repository';

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.deleteUser(userId);
  }
}
