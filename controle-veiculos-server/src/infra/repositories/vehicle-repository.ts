import {
  IUpdateVehicleParams,
  IVehicleParams,
} from '../../api/controllers/vehicle';
import { VehicleModel } from '../../domain/models';

export interface VehicleRepository {
  create(params: IVehicleParams): Promise<VehicleModel>;

  findByPlate(plate: string): Promise<VehicleModel | null>;

  findAll(): Promise<VehicleModel[]>;

  findById(vehicleId: string): Promise<VehicleModel | null>;

  update(params: IUpdateVehicleParams): Promise<void>;

  delete(vehicleId: string): Promise<void>;
}
