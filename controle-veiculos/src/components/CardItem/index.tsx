import { Pencil, Trash } from 'phosphor-react';

import { Stamp, User, Vehicle } from '../../types/interfaces';

interface CardItemProps {
	type: string;
	user?: User;
	vehicle?: Vehicle;
	stamp?: Stamp;
	children?: JSX.Element;
}

export function CardItem({
	type,
	user,
	vehicle,
	stamp,
	children,
}: CardItemProps) {
	return (
		<div
			className={`h-[70px] rounded-md bg-gray1 w-full flex items-center justify-between px-8 hover:opacity-90 duration-200 hover:scale-105`}>
			<div className="flex gap-7 items-center">
				<div className="flex gap-7">
					{type === 'stamp' && (
						<div className="flex flex-col gap-1">
							<p className="font-open font-bold text-black text-xs">
								Número do selo
							</p>
							<p className="font-open font-normal text-black text-xs">
								{stamp?.number}
							</p>
						</div>
					)}
					{type === 'vehicle' && (
						<div className="flex gap-7">
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">
									Tipo do veículo
								</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{vehicle?.type}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">Modelo</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{vehicle?.model}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">Cor</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{vehicle?.color}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">Placa</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{vehicle?.plate}
								</p>
							</div>
						</div>
					)}

					{type === 'user' && (
						<div className="flex flex-col gap-1 w-40">
							<p className="font-open font-bold text-black text-xs">Nome</p>
							<p className="font-open font-normal text-black text-xs truncate">
								{type === 'user' ? user?.name : vehicle?.user.name}
							</p>
						</div>
					)}
					<div className="flex flex-col gap-1 w-[97px]">
						<p className="font-open font-bold text-black text-xs">
							{type === 'user' ? 'Nome de guerra' : 'Proprietário'}
						</p>
						<p className="font-open font-normal text-black text-xs truncate">
							{type === 'user'
								? user?.warName
								: type === 'vehicle'
								? vehicle?.user.warName
								: stamp?.user.warName}
						</p>
					</div>
					<div className="flex flex-col gap-1">
						<p className="font-open font-bold text-black text-xs">Graduação</p>
						<p className="font-open font-normal text-black text-xs">
							{type === 'user'
								? user?.rank
								: type === 'vehicle'
								? vehicle?.user.rank
								: stamp?.user.rank}
						</p>
					</div>
					{type === 'user' && (
						<div className="flex flex-col gap-1">
							<p className="font-open font-bold text-black text-xs">SU/Cia</p>
							<p className="font-open font-normal text-black text-xs">
								{user?.SU}
							</p>
						</div>
					)}
					{type === 'user' && (
						<div className="flex flex-col gap-1">
							<p className="font-open font-bold text-black text-xs">Telefone</p>
							<p className="font-open font-normal text-black text-xs">
								{user?.phoneNumber}
							</p>
						</div>
					)}
					{type === 'stamp' && (
						<div className="flex gap-7">
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">
									Veículo
								</p>
								<p className="font-open font-normal text-black text-xs">
									{stamp?.vehicle.type}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">Modelo</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{stamp?.vehicle.model}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">Placa</p>
								<p className="font-open font-normal text-black text-xs truncate">
									{stamp?.vehicle.plate}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">
									Licenciamento
								</p>
								<p className="font-open font-normal text-black text-xs">
									{stamp?.lic}
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<p className="font-open font-bold text-black text-xs">
									Venc. Hab.
								</p>
								<p className="font-open font-normal text-black text-xs">
									{stamp?.vencHab}
								</p>
							</div>
						</div>
					)}

					{type === 'vehicle' && (
						<div className="flex flex-col gap-1">
							<p className="font-open font-bold text-black text-xs">
								Venc. Hab.
							</p>
							<p className="font-open font-normal text-black text-xs">
								{vehicle?.stamp.vencHab}
							</p>
						</div>
					)}
					{type === 'vehicle' && (
						<div className="flex flex-col gap-1">
							<p className="font-open font-bold text-black text-xs">Selo</p>
							<p className="font-open font-normal text-black text-xs">
								{vehicle?.stamp.number}
							</p>
						</div>
					)}
				</div>
			</div>

			{children}
		</div>
	);
}
