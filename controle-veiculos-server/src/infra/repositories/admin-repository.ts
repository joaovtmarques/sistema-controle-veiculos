import { AdminModel } from '../../domain/models';

export interface AdminRepository {
  findById(id: string): Promise<AdminModel | null>;

  findByEmail(email: string): Promise<AdminModel | null>;
}
