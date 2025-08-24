import { CardProject, HeaderComponent } from '@/components/modules';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export interface SearchPageProps {}

const SearchPage = (props: any) => {
	const { t } = useTranslation();
	const router = useRouter();
	const { searchValue = '', searchResults = [] } =
		(router.state.location.state as { searchValue?: string; searchResults?: any[] } | undefined) || {};

	console.log(searchResults);
	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8 ' {...props}>
			<HeaderComponent title={t('search.title')} buttonText={t('commons.buttons.back')} />
			{searchResults.length === 0 ? (
				<div className='text-center text-muted pt-10'>{t('commons.fallbacks.noResults', { searchValue })}</div>
			) : (
				<div className='flex flex-wrap gap-4'>
					{searchResults.map((project: any, idx: number) => (
						<CardProject
							key={project.id || idx}
							project={project}
							highlight={searchValue.length >= 3 ? searchValue : ''}
							handleEdit={function (): void {
								throw new Error('Function not implemented.');
							}}
							handleDelete={function (): void {
								throw new Error('Function not implemented.');
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

SearchPage.displayName = 'SearchPage';

export default SearchPage;
