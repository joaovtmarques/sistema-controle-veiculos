import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';

import { useAuth } from '../../../hooks/useAuth';
import { ILoginRequest } from '../../../types/interfaces';
import { Button, Footer, Header, Input } from '../../../components';

export function Login() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
		email: '',
		password: '',
		rememberMe: false,
	});

	function handleRedirect() {
		if (auth.token) {
			navigate('/admin');
		}
	}

	async function handleLogin() {
		try {
			if (loginRequest.email && loginRequest.password) {
				await auth.authenticate(
					loginRequest.email,
					loginRequest.password,
					loginRequest.rememberMe,
				);
				handleRedirect();
			} else {
				alert('Erro: Preencha todos os campos');
			}
		} catch (err: any) {
			alert('Erro: ' + err.response.data);
		}
	}

	useEffect(() => {
		handleRedirect();
	}, [auth.token]);

	return (
		<div className="flex flex-col min-h-full">
			<Header />
			<main className="flex-1 flex flex-col items-center justify-center bg-white px-52 pt-20 pb-10">
				<div className="mb-6">
					<p className="font-open font-semibold text-black text-2xl text-center">
						Login
					</p>
					<p className="font-open font-normal text-black text-xs text-center">
						Entre com e-mail e senha.
					</p>
				</div>
				<div className="flex flex-col gap-11">
					<div className="flex flex-col gap-4 w-[380px]">
						<Input
							placeholder="Endereço de e-mail"
							value={loginRequest.email}
							onChange={(e: any) =>
								setLoginRequest({ ...loginRequest, email: e.target.value })
							}
						/>
						<Input
							placeholder="Senha"
							type="password"
							value={loginRequest.password}
							onChange={(e: any) =>
								setLoginRequest({ ...loginRequest, password: e.target.value })
							}
						/>
						<div className="w-full flex items-center">
							<Checkbox.Root
								onCheckedChange={checked => {
									if (checked === true) {
										setLoginRequest({ ...loginRequest, rememberMe: true });
									} else {
										setLoginRequest({ ...loginRequest, rememberMe: false });
									}
								}}
								className="w-5 h-5 p-1 rounded bg-[#F1F1F1]">
								<Checkbox.Indicator>
									<Check className="w-3 h-3 text-green1" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							<p className="text-xs lg:text-sm text-gray2 font-regular ml-4">
								Lembrar login
							</p>
						</div>
					</div>
					<div className="w-[380px]">
						<Button title="Entrar" typeButton="login" onClick={handleLogin} />
					</div>
				</div>
			</main>
			<Footer admin />
		</div>
	);
}
