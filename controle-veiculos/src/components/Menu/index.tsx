import { useNavigate } from 'react-router-dom';
import { Car, SignOut, Stamp, Swatches, UsersFour } from 'phosphor-react';

import { useAuth } from '../../hooks/useAuth';

interface MenuProps {
	route?: string;
}

export function Menu({ route }: MenuProps) {
	const auth = useAuth();
	const navigate = useNavigate();

	const options = [
		{
			route: '/admin',
			title: 'Militares',
			icon: UsersFour,
		},
		{
			route: '/admin/vehicles',
			title: 'Veículos',
			icon: Car,
		},
		{
			route: '/admin/stamps',
			title: 'Selos',
			icon: Swatches,
		},
		{
			route: '/admin/approve-stamp',
			title: 'Aprovar Selo',
			icon: Stamp,
		},
	];

	async function handleLogout() {
		auth.logout();
		navigate('/admin/login');
	}

	return (
		<div className="w-full flex flex-col items-center justify-between h-full">
			<div className="flex flex-col gap-5 w-full">
				{options.map((option, key) => {
					return (
						<div
							key={key}
							onClick={() => navigate(option.route)}
							className={`w-full ${
								route === option.route ? 'bg-green2' : 'bg-green1'
							} hover:opacity-75 duration-200 rounded-md flex items-center gap-3 p-3 cursor-pointer`}>
							<option.icon className="h-8 w-8 text-white" />
							<p className="font-open font-bold text-white text-sm">
								{option.title}
							</p>
						</div>
					);
				})}
			</div>
			<button
				onClick={handleLogout}
				className="w-full bg-gray1 hover:opacity-75 duration-200 rounded-md flex items-center gap-3 p-3 font-open font-bold text-black text-sm cursor-pointer">
				<SignOut className="h-8 w-8 text-black" />
				Sair
			</button>
		</div>
	);
}
