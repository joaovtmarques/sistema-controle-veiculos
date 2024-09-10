import { UserModel } from '@/src/domain/models';
import { IUpdateUserParams } from '@/src/api/controllers/user';
import { UserRepository } from '@/src/infra/repositories/user-repository';

export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: IUpdateUserParams): Promise<UserModel> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) throw new Error('User not found');

    await this.userRepository.updateUser(data);

    const updatedUser = await this.userRepository.findById(user.id);

    if (!updatedUser) throw new Error('User updated not found');

    return updatedUser;
  }
}
