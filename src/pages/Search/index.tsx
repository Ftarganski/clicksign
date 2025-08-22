import { NotFoundComponent } from '@/components/modules';
import { Separator } from '@/components/ui';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-4 p-4 md:p-6' {...rest}>
			<h1 className='text-3xl font-bold'>{t('search.title')}</h1>
			<div>{t('search.description')}</div>
			<Separator />

			<NotFoundComponent message={t('commons.fallbacks.notFound')} />
		</div>
	);
};

SearchPage.displayName = 'SearchPage';

export default SearchPage;
