export interface ICreateStampParams {
  userId: string;
  vehicleId: string;
  lic: number;
  vencHab: number;
}

export interface ECreateStampParams extends ICreateStampParams {
  number: number;
  status: string;
}

export interface IUpdateStampParams {
  stampId: string;
  lic: number;
  vencHab: number;
  number: number;
  status: string;
}

export interface ICreateStampSpreadsheetParams {
  number: number;
  name: string;
  rank: string;
  warName: string;
  SU: string;
  phoneNumber: string;
  type: string;
  model: string;
  color: string;
  plate: string;
  lic: string;
  hab: string;
}

export enum StampStatus {
  U_ANALYSIS = 'U_ANALYSIS',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
