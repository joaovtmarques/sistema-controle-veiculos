import '../../global/styles.css';

import * as Select from '@radix-ui/react-select';
import { CaretDown, XCircle } from 'phosphor-react';
import { ChangeEvent, useRef, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import {
	User,
	Vehicle,
	ICreateUser,
	ICreateVehicle,
} from '../../types/interfaces';
import { useApi } from '../../hooks/useApi';
import { SUArr, colorsArr, rankArr } from '../../utils/rank';
import { Button, Footer, Header, Input } from '../../components';

import controleCia from '../../../public/declaracao-cia.pdf';
import cadastramentoVeiculosPdf from '../../../public/cadastramento-veiculos.pdf';

export function Home() {
	const api = useApi();

	let fileArr = [] as File[];
	let filesData = new FormData();
	const [isOpen, setIsOpen] = useState(false);
	const [vehicle, setVehicle] = useState('');
	const [docs, setDocs] = useState<File[]>([]);
	const [userData, setUserData] = useState<ICreateUser>({
		name: '',
		warName: '',
		rank: '',
		phoneNumber: '',
		SU: '',
	});
	const [vehicleData, setVehicleData] = useState<ICreateVehicle>({
		model: '',
		color: '',
		plate: '',
		type: '',
		userId: '',
		lic: '',
		vencHab: '',
	});
	const [user, setUser] = useState<User>();

	const refFile = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const { files } = e.target;

			Array.prototype.forEach.call(files, function (file) {
				fileArr.push(file);
			});
			setDocs(fileArr);
			// setDocs(_prevDocs => {
			// 	return [...docs, fileArr];
			// });
		}
	};

	const removeFile = (index: number) => {
		setDocs([...docs.slice(0, index), ...docs.slice(index + 1)]);
	};

	const handleFileClick = (_e: ChangeEvent<HTMLInputElement>) => {
		refFile.current?.click();
	};

	const handleSubmit = async () => {
		if (
			userData.name &&
			userData.warName &&
			userData.SU &&
			userData.rank &&
			userData.phoneNumber &&
			vehicleData.color &&
			vehicleData.model &&
			vehicleData.plate &&
			vehicleData.type &&
			vehicleData.lic &&
			vehicleData.vencHab &&
			vehicle
		) {
			try {
				console.log(userData, vehicleData);

				const user: User = await api.createUser(userData);
				const vehicle: Vehicle = await api.createVehicle({
					...vehicleData,
					userId: user.id,
				});
				filesData.append('warName', user.warName);
				filesData.append('rank', user.rank);
				filesData.append('userId', user.id);
				docs.forEach(file => {
					filesData.append('file', file);
				});
				const upload = await api.uploadFiles(filesData);
				const form = await api.createForm({
					name: userData.name,
					warName: userData.warName,
					rank: userData.rank,
					SU: userData.SU,
					phoneNumber: userData.phoneNumber,
					vehicle: vehicleData.type,
					model: vehicleData.model,
					plate: vehicleData.plate,
					color: vehicleData.color,
				});
				const stamp = await api.createStamp({
					userId: user.id,
					vehicleId: vehicle.id,
					lic: vehicleData.lic,
					vencHab: vehicleData.vencHab,
				});

				alert(
					'Formulário enviado. Se os documentos estiverem corretos, a conclusão do selo será em até 7 dias (1 semana)',
				);
				window.location.reload();
			} catch (err: any) {
				alert('Erro: ' + err.response.data);
			}
		} else {
			alert('Preencha todos os campos');
		}
	};

	return (
		<div className="flex flex-col min-h-full">
			<Header />
			<main className="bg-white px-52 flex gap-14 pt-8 pb-10">
				<div className="flex-1">
					<div className="mb-6">
						<p className="font-open font-semibold text-black text-2xl">
							Formulário de Controle de Veículos
						</p>
						<p className="font-open font-normal text-black text-xs">
							Preencha os campos abaixo.
						</p>
					</div>
					<form className="flex flex-col gap-4">
						<Input
							value={userData.name}
							placeholder="Nome completo"
							onChange={(e: any) =>
								setUserData({ ...userData, name: e.target.value })
							}
						/>
						<Input
							value={userData.warName}
							placeholder="Nome de guerra"
							onChange={(e: any) =>
								setUserData({ ...userData, warName: e.target.value })
							}
						/>
						<div className="w-full flex gap-4">
							<Select.Root
								onValueChange={rank =>
									setUserData({ ...userData, rank: rank })
								}>
								<Select.Trigger
									className="SelectTrigger"
									aria-label="Posto/Graduação">
									<Select.Value placeholder="Selecione o posto/graduação" />
									<Select.Icon className="SelectIcon">
										<CaretDown />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content className="SelectContent">
										<Select.ScrollUpButton className="SelectScrollButton">
											<CaretDown />
										</Select.ScrollUpButton>
										<Select.Viewport className="SelectViewport">
											<Select.Group>
												<Select.Label className="SelectLabel">
													Selecione o posto/graduação
												</Select.Label>
												{rankArr.map((rank, key) => {
													return (
														<Select.Item
															className="SelectItem"
															value={rank}
															key={key}>
															<Select.ItemText>{rank}</Select.ItemText>
															<Select.ItemIndicator className="SelectItemIndicator"></Select.ItemIndicator>
														</Select.Item>
													);
												})}
											</Select.Group>
										</Select.Viewport>
										<Select.ScrollDownButton className="SelectScrollButton">
											<CaretDown />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
							<Input
								value={userData.phoneNumber}
								placeholder="Telefone/Celular"
								onChange={(e: any) =>
									setUserData({ ...userData, phoneNumber: e.target.value })
								}
							/>
						</div>
						{/* <Input
							value={userData.SU}
							placeholder="OM/SU (ex: 6º BIL/12 Cia Com)"
							onChange={(e: any) =>
								setUserData({ ...userData, SU: e.target.value })
							}
						/> */}
						<Select.Root
							onValueChange={SU => {
								if (SU === '12º Bda Inf L') {
									setUserData({ ...userData, SU: 'Cia Cmdo' });
								} else {
									setUserData({ ...userData, SU: SU });
								}
							}}>
							<Select.Trigger className="SelectTrigger" aria-label="OM/SU">
								<Select.Value placeholder="Selecione a OM/SU" />
								<Select.Icon className="SelectIcon">
									<CaretDown />
								</Select.Icon>
							</Select.Trigger>
							<Select.Portal>
								<Select.Content className="SelectContent">
									<Select.ScrollUpButton className="SelectScrollButton">
										<CaretDown />
									</Select.ScrollUpButton>
									<Select.Viewport className="SelectViewport">
										<Select.Group>
											<Select.Label className="SelectLabel">
												Selecione a OM/SU
											</Select.Label>
											{SUArr.map((su, key) => {
												return (
													<Select.Item
														className="SelectItem"
														value={su}
														key={key}>
														<Select.ItemText>{su}</Select.ItemText>
														<Select.ItemIndicator className="SelectItemIndicator"></Select.ItemIndicator>
													</Select.Item>
												);
											})}
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton className="SelectScrollButton">
										<CaretDown />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
						<div className="w-full flex gap-4">
							<Input
								value={vehicleData.model}
								placeholder="Modelo do veículo"
								onChange={(e: any) =>
									setVehicleData({ ...vehicleData, model: e.target.value })
								}
							/>
							<Input
								value={vehicleData.plate}
								placeholder="Placa"
								onChange={(e: any) =>
									setVehicleData({ ...vehicleData, plate: e.target.value })
								}
							/>
						</div>
						<div className="flex gap-7 items-center">
							{/* <Input
								value={vehicleData.color}
								placeholder="Cor do veículo"
								onChange={(e: any) =>
									setVehicleData({ ...vehicleData, color: e.target.value })
								}
							/> */}
							<Select.Root
								onValueChange={color =>
									setVehicleData({ ...vehicleData, color: color })
								}>
								<Select.Trigger className="SelectTrigger" aria-label="OM/SU">
									<Select.Value placeholder="Selecione a cor do veículo" />
									<Select.Icon className="SelectIcon">
										<CaretDown />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content className="SelectContent">
										<Select.ScrollUpButton className="SelectScrollButton">
											<CaretDown />
										</Select.ScrollUpButton>
										<Select.Viewport className="SelectViewport">
											<Select.Group>
												<Select.Label className="SelectLabel">
													Selecione a cor do veículo
												</Select.Label>
												{colorsArr.map((color, key) => {
													return (
														<Select.Item
															className="SelectItem"
															value={color}
															key={key}>
															<Select.ItemText>{color}</Select.ItemText>
															<Select.ItemIndicator className="SelectItemIndicator"></Select.ItemIndicator>
														</Select.Item>
													);
												})}
											</Select.Group>
										</Select.Viewport>
										<Select.ScrollDownButton className="SelectScrollButton">
											<CaretDown />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
							<div>
								<RadioGroup.Root
									className="RadioGroupRoot"
									aria-label="View density"
									onValueChange={type => {
										setVehicle(type);
										setVehicleData({ ...vehicleData, type: type });
									}}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}>
										<RadioGroup.Item
											className="RadioGroupItem"
											value="Carro"
											id="r1">
											<RadioGroup.Indicator className="RadioGroupIndicator" />
										</RadioGroup.Item>
										<label className="Label" htmlFor="r1">
											Carro
										</label>
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<RadioGroup.Item
											className="RadioGroupItem"
											value="Moto"
											id="r2">
											<RadioGroup.Indicator className="RadioGroupIndicator" />
										</RadioGroup.Item>
										<label className="Label" htmlFor="r2">
											Moto
										</label>
									</div>
								</RadioGroup.Root>
							</div>
						</div>
						<div className="w-full flex gap-4">
							<Input
								value={vehicleData.lic}
								type="number"
								min="2023"
								max="2025"
								placeholder="Licenciamento veíc. (ex: 2025)"
								onChange={(e: any) =>
									setVehicleData({ ...vehicleData, lic: e.target.value })
								}
							/>
							<Input
								value={vehicleData.vencHab}
								type="number"
								min="2024"
								max="2040"
								placeholder="Vencimento hab. (ex: 2034)"
								onChange={(e: any) =>
									setVehicleData({ ...vehicleData, vencHab: e.target.value })
								}
							/>
						</div>
					</form>
					<div className="flex flex-col gap-6 mt-6">
						<p className="font-open font-normal text-black text-xs">
							Obs: Este formulário só será recebido mediante assinatura dos
							responsáveis pela 2ª Seção. O selo só será validado com carimbo e
							a assinatura dos mesmos.
						</p>
						<p className="font-open font-normal text-black text-xs">
							Ao enviar este formulário, declaro ter ciência dos termos acima
							descritos e das normas de estacionamento do Forte Ipiranga.
						</p>
					</div>
				</div>
				<div>
					<div className="mb-6">
						<p className="font-open font-semibold text-black text-2xl">
							Envio de Documentos
						</p>
						<p className="font-open font-normal text-black text-xs mt-2 mb-2">
							Verifique no documento abaixo sua situação e quais documentos deve
							enviar.
						</p>
						<a
							href={cadastramentoVeiculosPdf}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-green1 px-3 py-1 rounded-md text-white text-xs font-open font-medium hover:bg-green2 duration-200">
							ACESSAR DOCUMENTO
						</a>
					</div>
					<div className="flex flex-col gap-2">
						<p className="font-open font-normal text-black text-xs mt-2 mb-2">
							Se necessário, realize o download do formulário anexado abaixo.
						</p>
						<a
							href={controleCia}
							target="_blank"
							rel="noopener noreferrer"
							className="font-open font-bold text-black text-xs underline">
							MODELO DE DECLARAÇÃO DE VEÍCULO DE TERCEIROS
						</a>
						<p className="font-open font-normal text-black text-xs mt-2 mb-2">
							Após preencher e reconhecer firma em cartório, envie em anexo
							<br /> o formulário escaneado, no formato .PDF
						</p>
					</div>
					<div className="mb-12 mt-8">
						<Button onClick={handleFileClick} title="Selecionar documentos" />

						<input
							ref={refFile}
							type="file"
							className="bg-white hidden"
							onChange={handleFileChange}
							multiple
						/>
						{docs &&
							docs.map((item, key) => {
								return (
									<div
										key={key}
										className="flex items-center justify-between w-[270px] bg-gray1 rounded-md px-2 py-1 mt-5">
										<p className="font-open font-normal text-gray3 text-xs truncate">
											{item?.name}
										</p>
										<div
											className="cursor-pointer hover:text-red/70 duration-200"
											onClick={() => {
												removeFile(docs.indexOf(item));
											}}>
											<XCircle className="text-red h-5 w-5 ml-4" />
										</div>
									</div>
								);
							})}
						<p className="font-open font-normal text-black text-xs mt-3">
							Lembre-se de anexar cópias dos documentos atualizados e conferir
							todos os
							<br /> dados antes de confirmar.
						</p>
					</div>

					<Button title="Enviar" typeButton="submit" onClick={handleSubmit} />
				</div>
			</main>
			<Footer />
		</div>
	);
}
