import { FC, HTMLAttributes } from 'react';

export interface HeaderBarProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
}

const HeaderBar: FC<HeaderBarProps> = ({ title, ...rest }) => {
	return (
		<header
			className='flex flex-row w-full h-20 shadow-2xl bg-secondary items-center justify-between px-6 py-4'
			{...rest}
		>
			<div className='flex-1 flex justify-center items-center'>
				<div className='flex items-center gap-4 text-background'>
					<img src='/images/logoHeader.svg' alt='Logo' className='h-12 w-auto' />
					<div className='w-24 text-center'>{title}</div>
				</div>
			</div>
		</header>
	);
};

HeaderBar.displayName = 'HeaderBar';

export default HeaderBar;
