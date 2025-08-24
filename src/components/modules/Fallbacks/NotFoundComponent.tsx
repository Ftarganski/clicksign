import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface NotFoundComponentProps {
	message?: string;
}

export const NotFoundComponent: FC<NotFoundComponentProps> = ({ message }) => {
	const { t } = useTranslation();
	return (
		<div className='w-screen h-screen flex flex-col gap-4 justify-center items-center bg-background'>
			<div className=' flex flex-col gap-2'>
				<div className='text-center text-9xl px-10 font-semibold text-foreground'>404</div>
				<div className='text-center text-4xl px-10 font-semibold text-foreground'>NOT FOUND</div>
			</div>
			<img src={'/images/error.png'} alt={message} width={400} height={400} />
			<div className='text-center text-2xl px-10 font-semibold text-foreground'>{message}</div>
			<Link to='/projects'>
				<Button variant='default' size='default' className='rounded-full '>
					{t('commons.buttons.back')}
				</Button>
			</Link>
		</div>
	);
};

NotFoundComponent.displayName = 'NotFoundComponent';

export default NotFoundComponent;
