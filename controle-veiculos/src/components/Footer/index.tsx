interface FooterProps {
	admin?: boolean;
}

export function Footer({ admin }: FooterProps) {
	return (
		<footer
			className={`bg-gray1 px-52 py-2 ${admin && 'absolute bottom-0 w-full'}`}>
			<div>
				<p className="font-open font-normal text-gray3 text-sm text-center">
					Seção de Informática - 2024
				</p>
				<p className="font-open font-normal text-gray3 text-sm text-center">
					6º Batalhão de Infantaria Aeromóvel
				</p>
			</div>
		</footer>
	);
}
