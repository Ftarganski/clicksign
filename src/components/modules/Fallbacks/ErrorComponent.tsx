import { FC } from 'react';

export interface ErrorComponentProps {
	message?: string;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({ message }) => {
	return (
		<div className='flex flex-col gap-10 justify-center items-center p-4'>
			<div className='flex flex-col gap-2'>
				<div className='text-center text-9xl px-10 font-semibold text-foreground'>401</div>
				<div className='text-center text-4xl px-10 font-semibold text-foreground'>ERROR</div>
			</div>
			<img src={'/images/notFound.svg'} alt={message} width={500} height={500} />
			<div className='text-center text-2xl px-10 font-semibold text-destructive'>{message}</div>
		</div>
	);
};

ErrorComponent.displayName = 'ErrorComponent';

export default ErrorComponent;
