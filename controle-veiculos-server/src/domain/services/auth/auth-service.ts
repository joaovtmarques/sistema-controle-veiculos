import { AuthRequest } from '@/src/api/controllers/auth';
import { AdminRepository } from '@/src/infra/repositories';
import { GenerateToken } from '@/src/domain/provider/generate-token-provider';

export class AuthService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(data: AuthRequest) {
    const adminExists = await this.adminRepository.findByEmail(data.email);

    if (!adminExists) {
      throw new Error('E-mail ou senha incorreta');
    }

    if (!(data.password === adminExists.password)) {
      throw new Error('E-mail ou senha incorreta');
    }

    const generateTokenProvider = new GenerateToken(this.adminRepository);

    const token = await generateTokenProvider.execute(adminExists.id);

    return { token };
  }
}
