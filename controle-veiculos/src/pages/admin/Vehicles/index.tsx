import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlass } from 'phosphor-react';

import { useApi } from '../../../hooks/useApi';
import { Vehicle } from '../../../types/interfaces';
import { Header, Menu, CardItem, Footer, Input } from '../../../components';

export function Vehicles() {
	const api = useApi();
	const location = useLocation();

	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [filter, setFilter] = useState();

	async function handleFilter(filter: string) {
		if (filter !== '') {
			let filteredvehicles = [];

			filteredvehicles = vehicles.filter(
				vehicle =>
					vehicle.plate.includes(filter) ||
					vehicle.user.name.includes(filter) ||
					vehicle.user.warName.includes(filter) ||
					vehicle.user.rank.includes(filter) ||
					vehicle.model.includes(filter),
			);

			if (filteredvehicles.length === 0) setVehicles([]);

			setVehicles(filteredvehicles);
		} else {
			const vehicles = await api.findAllVehicles();

			setVehicles(vehicles.data.reverse());
		}
	}

	useEffect(() => {
		async function handlevehicles() {
			const vehicles = await api.findAllVehicles();

			let vehiclesStamp: Vehicle[] = [];

			vehicles.data.map((vehicle: Vehicle) => {
				if (vehicle.stamp?.status !== 'INACTIVE') {
					if (vehicle.stamp?.status !== 'U_ANALYSIS') {
						vehiclesStamp.push(vehicle);
					}
				}
			});

			setVehicles(vehiclesStamp.reverse());
		}

		handlevehicles();
	}, []);

	useEffect(() => {
		handleFilter(filter!);
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
							placeholder="Procurar veículo"
							value={filter}
							onChange={(e: any) => setFilter(e.target.value)}
						/>
						<div className="bg-green1 w-11 h-11 rounded-md flex items-center justify-center hover:opacity-75 duration-200 cursor-pointer">
							<MagnifyingGlass className="h-7 w-7 text-white" />
						</div>
					</div>
					<div className="flex flex-col gap-5">
						{vehicles.map((vehicle, key) => {
							return <CardItem type="vehicle" vehicle={vehicle} key={key} />;
						})}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
