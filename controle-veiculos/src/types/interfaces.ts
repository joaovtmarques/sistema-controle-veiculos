export interface Vehicle {
	id: string;
	model: string;
	plate: string;
	color: string;
	userId: string;
	type: VehicleType;
	user: User;
	stamp: Stamp;
}

export enum VehicleType {
	CAR,
	MOTORCYCLE,
}

export interface Stamp {
	id: string;
	number: number;
	userId: string;
	vehicleId: string;
	status: string;
	lic: string;
	vencHab: string;
	vehicle: Vehicle;
	user: User;
}

export interface ICreateUser {
	name: string;
	warName: string;
	rank: string;
	phoneNumber: string;
	SU: string;
}

export interface User {
	id: string;
	name: string;
	warName: string;
	rank: string;
	phoneNumber: string;
	SU: string;
}

export interface ICreateVehicle {
	model: string;
	plate: string;
	color: string;
	type: string;
	userId: string;
	lic: string;
	vencHab: string;
}

export interface ICreateForm {
	name: string;
	warName: string;
	rank: string;
	phoneNumber: string;
	SU: string;
	vehicle: string;
	model: string;
	plate: string;
	color: string;
}

export interface IUploadFiles {
	rank: string;
	warName: string;
	file: File[] | FileList | null;
}

export interface ICreateStamp {
	userId: string;
	vehicleId: string;
	lic: string;
	vencHab: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface IUpdateStampRequest {
	lic: string;
	vencHab: string;
	stampId: string;
	number: string;
	status: string;
}
