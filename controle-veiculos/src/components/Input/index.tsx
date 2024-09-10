import { HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	placeholder: string;
	value?: string | any;
	type?: string;
	min?: string;
	max?: string;
}

export function Input({
	placeholder,
	value,
	type,
	min,
	max,
	...props
}: InputProps) {
	return (
		<input
			{...props}
			type={type}
			placeholder={placeholder}
			min={min}
			max={max}
			className="h-[44px] w-full border-[1px] border-gray2 rounded px-3 placeholder-gray2
      text-gray3 outline-none focus-within:border-black focus-within:text-black "
		/>
	);
}
