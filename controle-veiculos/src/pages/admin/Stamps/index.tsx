import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlass, Trash } from 'phosphor-react';

import { useApi } from '../../../hooks/useApi';
import { Stamp } from '../../../types/interfaces';
import { Header, Menu, CardItem, Footer, Input } from '../../../components';

export function Stamps() {
	const api = useApi();
	const location = useLocation();

	const [stamps, setStamps] = useState<Stamp[]>([]);
	const [filter, setFilter] = useState();

	async function handleFilter(filter: string) {
		if (filter !== '') {
			let filteredstamps = [];

			filteredstamps = stamps.filter(
				stamp =>
					stamp.number.toString().includes(filter) ||
					stamp.user.name.includes(filter) ||
					stamp.user.warName.includes(filter) ||
					stamp.user.rank.includes(filter) ||
					stamp.vehicle.plate.includes(filter),
			);

			if (filteredstamps.length === 0) setStamps([]);

			setStamps(filteredstamps);
		} else {
			const stamps = await api.findAllStamps();

			setStamps(stamps.data);
		}
	}

	async function handleDeleteStamp(index: number, stamp: Stamp) {
		if (
			window.confirm(
				`Deseja excluir o selo ${stamp.number} de ${stamp.user.name} ?`,
			)
		) {
			await api.deleteStamp({
				lic: stamp.lic.toString(),
				number: stamp.number.toString(),
				stampId: stamp.id,
				status: stamp.status,
				vencHab: stamp.vencHab.toString(),
			});

			setStamps([...stamps.slice(0, index), ...stamps.slice(index + 1)]);
		}
	}

	useEffect(() => {
		async function handlestamps() {
			let stampsArr: Stamp[] = [];
			const stamps = await api.findAllStamps();

			stamps.data.map((stamp: Stamp) => {
				if (stamp.status !== 'INACTIVE') {
					if (stamp.status !== 'U_ANALYSIS') {
						stampsArr.push(stamp);
					}
				}
			});
			setStamps(stampsArr.reverse());
		}

		handlestamps();
	}, [stamps]);

	useEffect(() => {
		handleFilter(filter!);
	}, [filter]);

	return (
		<div className="flex flex-col min-h-full overflow-x-hidden">
			<Header />
			<div className="flex h-full">
				<div className="w-[254px] h-screen border-r border-b px-4 border-gray3/50 py-8">
					<Menu route={location.pathname} />
				</div>
				<div className="p-8 w-full">
					<div className="flex gap-3 items-center w-[570px] mb-5">
						<Input
							placeholder="Procurar selo"
							value={filter}
							onChange={(e: any) => setFilter(e.target.value)}
						/>
						<div className="bg-green1 w-11 h-11 rounded-md flex items-center justify-center hover:opacity-75 duration-200 cursor-pointer">
							<MagnifyingGlass className="h-7 w-7 text-white" />
						</div>
					</div>
					<div className="flex flex-col gap-5">
						{stamps.map((stamp, key) => {
							return (
								<CardItem type="stamp" stamp={stamp} key={key}>
									<div
										className="hover:scale-150 duration-200 cursor-pointer"
										onClick={() => handleDeleteStamp(key, stamp)}>
										<Trash className="h-5 w-5 text-red" />
									</div>
								</CardItem>
							);
						})}
						{stamps.length === 0 && (
							<div className="font-open font-normal text-sm text-gray3">
								Nenhum selo cadastrado.
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
