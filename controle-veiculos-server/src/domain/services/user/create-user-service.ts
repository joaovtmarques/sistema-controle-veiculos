import { UserModel } from '@/src/domain/models';
import { capitalize } from '@/src/api/controllers/helpers';
import { ICreateUserParams } from '@/src/api/controllers/user';
import { UserRepository } from '@/src/infra/repositories/user-repository';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ICreateUserParams): Promise<UserModel> {
    return await this.userRepository.create({
      name: capitalize(data.name),
      SU: capitalize(data.SU),
      phoneNumber: data.phoneNumber,
      rank: data.rank,
      warName: capitalize(data.warName),
    });
  }
}
