import { EmptyComponent, ListProjects, SearchComponent } from '@/components/modules';
import { useListProjects } from '@/hooks/queries';
import { useNavigate } from '@tanstack/react-router';
import { PlusCircle, Search } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();
	const [searchValue, setSearchValue] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);
	const projects = useListProjects();
	const navigate = useNavigate();
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!searchOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSearchOpen(false);
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [searchOpen]);

	useEffect(() => {
		if (!searchOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setSearchOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [searchOpen]);

	const handleSearchDone = (val?: string) => {
		const search = (val ?? searchValue).toLowerCase();
		if (search.length < 3) return;
		const filtered = (projects.data || []).filter((p: any) => (p.name || '').toLowerCase().includes(search));
		navigate({
			to: '/projects/search',
			state: { searchValue: val ?? searchValue, searchResults: filtered } as any,
		});
		setSearchOpen(false);
	};

	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8' {...rest}>
			<div className='absolute top-7 right-7 items-center'>
				<Search className='text-card cursor-pointer' onClick={() => setSearchOpen(true)} />
			</div>
			{!projects.data || projects.data.length === 0 ? (
				<EmptyComponent
					title={t('projects.emptyList.title')}
					description={t('projects.emptyList.description')}
					button={t('projects.emptyList.button')}
					icon={<PlusCircle />}
				/>
			) : (
				<ListProjects highlight={searchValue} />
			)}

			{searchOpen && (
				<div
					ref={searchRef}
					className='fixed top-0 left-0 w-full h-20 z-50 bg-secondary flex items-center animate-fade-in'
				>
					<SearchComponent
						value={searchValue}
						onFilterChange={setSearchValue}
						placeholder={t('projects.filters.searchPlaceholder')}
						onSearchDone={handleSearchDone}
					/>
				</div>
			)}
		</div>
	);
};

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;
