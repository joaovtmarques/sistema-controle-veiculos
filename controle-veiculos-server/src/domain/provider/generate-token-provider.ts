import { sign } from 'jsonwebtoken';
import { AdminRepository } from '../../infra/repositories';

export class GenerateToken {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(adminId: string) {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new Error('Administrador não encontrado');
    }

    return sign(admin, `${process.env.JWT_SECRET}`, {
      subject: admin.id,
      expiresIn: '5d',
    });
  }
}
