import {
  ECreateStampParams,
  IUpdateStampParams,
} from '../../api/controllers/stamp';
import { StampModel } from '../../domain/models';

export interface StampRepository {
  create: (params: ECreateStampParams) => Promise<StampModel>;

  findAllStamps: () => Promise<StampModel[]>;

  findStampByPlate: (plate: string) => Promise<StampModel | null>;

  findByUserId: (userId: string) => Promise<StampModel | null>;

  findById: (stampId: string) => Promise<StampModel | null>;

  update: (params: IUpdateStampParams) => Promise<void>;
}
