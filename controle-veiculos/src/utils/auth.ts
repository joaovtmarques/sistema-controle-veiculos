import { useApi } from '../hooks/useApi';
import { ILoginRequest } from '../types/interfaces';

export function setAuthLocalStorage(token: string | null) {
	localStorage.setItem('token', JSON.stringify(token));
}

export function getAuthLocalStorage() {
	const json = localStorage.getItem('token');

	if (!json) return null;

	const auth = JSON.parse(json);

	return auth ?? null;
}

export async function LoginRequest(data: ILoginRequest) {
	try {
		return useApi().login(data);
	} catch (err) {
		return null;
	}
}
