import { IUploadFiles } from '@/src/api/controllers/upload';
import { UploadModel } from '@/src/domain/models';

export interface UploadRepository {
  create(data: IUploadFiles): Promise<void>;

  findByUserId(userId: string): Promise<UploadModel | null>;
}
