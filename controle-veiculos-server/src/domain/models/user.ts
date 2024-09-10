import { VehicleModel } from './vehicle';

export interface UserModel {
  id: string;
  name: string;
  warName: string;
  rank: string;
  phoneNumber: string;
  SU: string;
  vehicle?: VehicleModel;
}
