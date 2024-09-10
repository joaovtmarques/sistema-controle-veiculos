import { UserModel } from './user';
import { StampModel } from './stamp';

export interface VehicleModel {
  id: string;
  model: string;
  plate: string;
  color: string;
  type: string;
  userId: string;
}

export interface VehicleUserModel extends VehicleModel {
  user: UserModel;
}

export interface VehicleUserStampModel extends VehicleUserModel {
  stamp: StampModel;
}
