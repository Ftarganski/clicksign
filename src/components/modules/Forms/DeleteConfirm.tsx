import { Button, Dialog, Separator } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface DeleteConfirmProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => Promise<void>;
	title: string;
	description: string;
	name: string;
}

const DeleteConfirm: FC<DeleteConfirmProps> = ({
	isOpen,
	onOpenChange,
	onConfirm,
	name,
	title,
	description,
	...rest
}) => {
	const { t } = useTranslation();

	const handleConfirm = useCallback(async () => {
		await onConfirm();
		onOpenChange(false);
	}, [onConfirm, onOpenChange]);

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange} {...rest}>
			<Dialog.Content className='bg-card ' hideClose>
				<div className='absolute left-1/2 -top-8 -translate-x-1/2 bg-primary-foreground rounded-full shadow-lg flex items-center justify-center w-14 h-14 z-10'>
					<Trash2 className='text-card' size={20} />
				</div>
				<Dialog.Header className='gap-4'>
					<Dialog.Title className='text-center font-semibold text-primary py-4'>{title}</Dialog.Title>
					<Separator />
					<Dialog.Description className='flex flex-col text-center gap-4 p-4'>
						<div className='text-md text-muted'>{description}</div>
						<div className='font-medium text-2xl text-secondary'>{name}</div>
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer className='gap-6'>
					<Button variant='outline' className='flex-1 rounded-full' onClick={() => onOpenChange(false)}>
						{t('commons.buttons.cancel')}
					</Button>
					<Button variant='default' className='flex-1 rounded-full' onClick={handleConfirm}>
						{t('commons.buttons.confirm')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};

DeleteConfirm.displayName = 'DeleteConfirm';

export default DeleteConfirm;
