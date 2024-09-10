import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlass } from 'phosphor-react';

import { useApi } from '../../../hooks/useApi';
import { Stamp } from '../../../types/interfaces';
import { Header, Menu, CardItem, Footer, Input } from '../../../components';
import { ApproveStampForm } from '../../../components/ApproveStampForm';

export function ApproveStamp() {
	const api = useApi();
	const location = useLocation();

	const [filter, setFilter] = useState();
	const [open, setOpen] = useState(false);
	const [stamps, setStamps] = useState<Stamp[]>([]);

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
		await api.deleteStamp({
			lic: stamp.lic.toString(),
			stampId: stamp.id,
			number: stamp.lic.toString(),
			status: 'INACTIVE',
			vencHab: stamp.vencHab.toString(),
		});

		setStamps([...stamps.slice(0, index), ...stamps.slice(index + 1)]);
	}
	async function handleApproveStamp(index: number, stamp: Stamp) {
		await api.approveStamp({
			lic: stamp.lic.toString(),
			stampId: stamp.id,
			number: stamp.lic.toString(),
			status: 'ACTIVE',
			vencHab: stamp.vencHab.toString(),
		});

		setStamps([...stamps.slice(0, index), ...stamps.slice(index + 1)]);
	}

	useEffect(() => {
		async function handlestamps() {
			let stampsArr: Stamp[] = [];
			const stamps = await api.findAllStamps();

			stamps.data.map((stamp: Stamp) => {
				if (stamp.status === 'U_ANALYSIS') {
					stampsArr.push(stamp);
				}
			});
			setStamps(stampsArr);
		}

		handlestamps();
	}, []);

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
									<div className="flex gap-4">
										<div
											className="bg-green1 font-open font-bold text-xs text-white px-5 h-[35px] flex items-center justify-center rounded-md  hover:scale-110 duration-200 cursor-pointer"
											onClick={() => handleApproveStamp(key, stamp)}>
											Aprovar
										</div>
										<div
											className="bg-red font-open font-bold text-xs text-white px-5 h-[35px] flex items-center justify-center rounded-md hover:scale-110 duration-200 cursor-pointer"
											onClick={() => handleDeleteStamp(key, stamp)}>
											Recusar
										</div>
									</div>
								</CardItem>
							);
						})}
						{stamps.length === 0 && (
							<div className="font-open font-normal text-sm text-gray3">
								Nenhum selo novo.
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
