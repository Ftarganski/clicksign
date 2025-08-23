import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { MoveLeft } from 'lucide-react';
import { FC, HTMLAttributes } from 'react';

export interface HeaderComponentProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	buttonText: string;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ title, buttonText, ...rest }) => {
	return (
		<div className='flex flex-col items-start w-full' {...rest}>
			<Link to='/projects'>
				<Button variant='link' className='!px-0 hover:cursor-pointer'>
					<MoveLeft />
					{buttonText}
				</Button>
			</Link>
			<h1 className='text-2xl font-semibold text-primary'>{title}</h1>
		</div>
	);
};

HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
