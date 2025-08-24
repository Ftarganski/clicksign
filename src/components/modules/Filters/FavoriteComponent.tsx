import { Switch } from '@/components/ui';
import { FC } from 'react';

export interface FavoriteComponentProps {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	label?: string;
}

const FavoriteComponent: FC<FavoriteComponentProps> = ({ checked, onCheckedChange, label, ...rest }) => {
	return (
		<div className='flex items-center justify-center gap-2 w-full' {...rest}>
			<Switch checked={checked} onCheckedChange={onCheckedChange} />
			<span className='text-base font-normal text-accent-foreground'>{label}</span>
		</div>
	);
};

FavoriteComponent.displayName = 'FavoriteComponent';

export default FavoriteComponent;
