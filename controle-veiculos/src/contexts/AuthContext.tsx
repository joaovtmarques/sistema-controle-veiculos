import { createContext, useEffect, useState } from 'react';

import {
	getAuthLocalStorage,
	LoginRequest,
	setAuthLocalStorage,
} from '../utils/auth';
import { Auth, AuthProviderProps, ContextProps } from '../types/Auth';

export const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<Auth | null>();

	async function authenticate(
		email: string,
		password: string,
		rememberMe: boolean,
	) {
		const response = await LoginRequest({ email, password, rememberMe });

		const payload = {
			token: response!.data.token,
		};

		setAuth({ token: payload.token });
		setAuthLocalStorage(payload.token);
		if (!rememberMe) {
			window.onunload = () => {
				window.localStorage.clear();
			};
		}
	}

	async function logout() {
		setAuth(null);
		setAuthLocalStorage(null);
	}

	return (
		<AuthContext.Provider
			value={{
				...auth,
				authenticate,
				logout,
				getAuthLocalStorage,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
