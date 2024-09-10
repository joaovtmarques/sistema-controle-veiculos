export interface IVehicleParams {
  type: string;
  model: string;
  plate: string;
  color: string;
  userId: string;
}

export interface IUpdateVehicleParams extends IVehicleParams {
  vehicleId: string;
}

export interface IDeleteVehicleParams {
  vehicleId: string;
}
