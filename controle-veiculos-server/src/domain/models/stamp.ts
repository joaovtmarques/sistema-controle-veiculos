import { UserModel } from './user';
import { VehicleModel } from './vehicle';

export interface StampModel {
  id: string;
  number: number;
  userId: string;
  vehicleId: string;
  status: string;
  vehicle?: VehicleModel | null;
  user?: UserModel | null;
}
