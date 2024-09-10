import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	typeButton?: string;
	onClick?: (e: any) => void;
}

export function Button({ title, typeButton, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={`${
				(typeButton === 'submit' && 'bg-green2') || 'bg-green1'
			} font-open font-semibold text-white text-sm
      rounded flex items-center justify-center py-4 hover:bg-opacity-90 duration-200 ${
				typeButton === 'doc' ? 'min-w-[128px] max-w-[128px]' : 'w-[270px]'
			} ${typeButton === 'login' && 'w-full'}`}>
			{title}
		</button>
	);
}
