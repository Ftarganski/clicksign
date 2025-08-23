import { useLocation } from '@tanstack/react-router';
import { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export interface HeaderBarProps extends HTMLAttributes<HTMLDivElement> {}

const HeaderBar: FC<HeaderBarProps> = ({ ...rest }) => {
	const location = useLocation();
	const { t } = useTranslation();

	return (
		<header className='flex items-center gap-2 justify-between bg-secondary w-full h-20' {...rest}>
			<div className=' text-background'>
				<div>imagem</div>

				<div>Gerenciador de Projetos</div>
			</div>
		</header>
	);
};

HeaderBar.displayName = 'HeaderBar';

export default HeaderBar;
