import { useApi } from '../../hooks/useApi';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

interface ApproveStampFormProps {
	userId: string;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

export function ApproveStampForm({
	userId,
	open,
	setOpen,
}: ApproveStampFormProps) {
	const api = useApi();

	const [uploads, setUploads] = useState();

	useEffect(() => {
		async function handleUserUploads() {
			const uploadsByUser = api.findUploadsByUser(userId);

			console.log(uploadsByUser);

			// setUploads(uploadsByUser);
		}

		handleUserUploads();
	}, []);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen} defaultOpen={false}>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/60 inset-0 fixed overflow-y-auto grid place-items-center p-8">
					<Dialog.Content className="bg-black text-white p-8 w-[90%] sm:2/3 md:w-3/5 lg:w-1/3 h-auto shadow-lg shadow-black/25 rounded-xl">
						<Dialog.Title className="sm:text-base md:text-xl lg:text-2xl text-white font-medium">
							Cadastre um cliente
						</Dialog.Title>

						<footer className="mt-6 flex justify-end flex-col md:flex-row lg:flex-row gap-y-6 md:gap-x-6 lg:gap-x-6">
							<Dialog.Close className="px-8 md:ml-8 h-12 bg-gray2 rounded-xl text-white text-xs md:text-base lg:text-base font-medium hover:opacity-90">
								Cancelar
							</Dialog.Close>
						</footer>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export const DialogPrimitive = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
