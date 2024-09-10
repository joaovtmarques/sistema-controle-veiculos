import { UserModel } from '@/src/domain/models';
import { UserRepository } from '@/src/infra/repositories/user-repository';

export class FindAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }
}
