import {
	ICreateForm,
	ICreateStamp,
	ICreateUser,
	ICreateVehicle,
	ILoginRequest,
	IUpdateStampRequest,
} from '../types/interfaces';
import { api } from '../services/api';

export const useApi = () => ({
	createUser: async (data: ICreateUser) => {
		const request = await api.post('/users', {
			name: data.name,
			warName: data.warName,
			rank: data.rank,
			phoneNumber: data.phoneNumber,
			SU: data.SU,
		});

		return request.data;
	},

	createVehicle: async (data: ICreateVehicle) => {
		const request = await api.post('/vehicles', {
			model: data.model,
			plate: data.plate,
			color: data.color,
			type: data.type,
			userId: data.userId,
		});

		return request.data;
	},

	uploadFiles: async (data: any) => {
		const request = await api.post('/uploads', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return request.data;
	},

	createForm: async (data: ICreateForm) => {
		const request = await api.post('/forms', data);

		return request;
	},

	createStamp: async (data: ICreateStamp) => {
		const request = await api.post('/stamps', data);

		return request;
	},

	login: async (data: ILoginRequest) => {
		const request = await api.post('/admin/login', {
			email: data.email,
			password: data.password,
		});

		return request;
	},

	findAllUsers: async () => {
		return await api.get('/users');
	},

	findAllVehicles: async () => {
		return await api.get('/vehicles');
	},

	findAllStamps: async () => {
		return await api.get('/stamps');
	},

	deleteStamp: async (data: IUpdateStampRequest) => {
		return await api.put('/stamps', {
			lic: data.lic,
			vencHab: data.vencHab,
			number: data.number,
			stampId: data.stampId,
			status: 'INACTIVE',
		});
	},

	approveStamp: async (data: IUpdateStampRequest) => {
		return await api.put('/stamps', {
			lic: data.lic,
			vencHab: data.vencHab,
			number: data.number,
			stampId: data.stampId,
			status: 'ACTIVE',
		});
	},

	findUploadsByUser: async (userId: string) => {
		return await api.get('/uploads', {
			params: { userId: userId },
		});
	},
});
