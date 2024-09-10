import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlass } from 'phosphor-react';

import { useApi } from '../../../hooks/useApi';
import { User } from '../../../types/interfaces';
import { Header, Menu, CardItem, Footer, Input } from '../../../components';

export function HomeAdmin() {
	const api = useApi();
	const location = useLocation();

	const [users, setUsers] = useState<User[]>([]);
	const [filter, setFilter] = useState();

	async function handleFilter(filter: string) {
		if (filter !== '') {
			let filteredUsers = [];

			filteredUsers = users.filter(
				user =>
					user.name.includes(filter) ||
					user.rank.includes(filter) ||
					user.warName.includes(filter),
			);

			if (filteredUsers.length === 0) setUsers([]);

			setUsers(filteredUsers);
		} else {
			const users = await api.findAllUsers();

			setUsers(users.data);
		}
	}

	useEffect(() => {
		async function handleUsers() {
			const users = await api.findAllUsers();

			setUsers(users.data);
		}

		handleUsers();
	}, []);

	useEffect(() => {
		handleFilter(filter!);
		console.log(users);
	}, [filter]);

	return (
		<div className="flex flex-col min-h-full">
			<Header />
			<div className="flex h-full">
				<div className="w-[254px] h-screen border-r border-b px-4 border-gray3/50 py-8">
					<Menu route={location.pathname} />
				</div>
				<div className="p-8 w-full">
					<div className="flex gap-3 items-center w-[570px] mb-5">
						<Input
							placeholder="Procurar militar"
							value={filter}
							onChange={(e: any) => setFilter(e.target.value)}
						/>
						<div className="bg-green1 w-11 h-11 rounded-md flex items-center justify-center hover:opacity-75 duration-200 cursor-pointer">
							<MagnifyingGlass className="h-7 w-7 text-white" />
						</div>
					</div>
					<div className="flex flex-col gap-5">
						{users.map((user, key) => {
							return <CardItem type="user" user={user} key={key} />;
						})}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
