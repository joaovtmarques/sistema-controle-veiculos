import logoImg from '../../assets/6bil.png';

export function Header() {
	return (
		<header className="bg-green1 border-b-[25px] border-green2 py-6 flex items-center justify-center w-full">
			<div className="flex items-start justify-start gap-7">
				<img src={logoImg} alt="6 BI Amv" className="w-[62px] h-[77px]" />
				<div>
					<p className="font-open font-normal text-white text-sm">
						Seção de Informática
					</p>
					<p className="font-open font-bold text-white text-[28px]">
						6º Batalhão de Infantaria Aeromóvel
					</p>
				</div>
			</div>
		</header>
	);
}
