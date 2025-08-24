import { Button } from '@/components/ui';
import { useProcessedData } from '@/hooks';
import { useDeleteProject, useUpdateProject } from '@/hooks/mutations';
import { useListProjects } from '@/hooks/queries';
import { Project } from '@/types';
import { Link, useNavigate } from '@tanstack/react-router';
import { PlusCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import FavoriteComponent from '../Filters/FavoriteComponent';
import FilterComponent from '../Filters/FilterComponent';
import DeleteConfirm from '../Forms/DeleteConfirm';
import CardProject from './CardProject';
export interface ListProjectsProps {
	highlight?: string;
}

const ListProjects: FC<ListProjectsProps> = ({ highlight = '', ...rest }) => {
	const { t } = useTranslation();
	const projects = useListProjects();
	const [showFavorites, setShowFavorites] = useState(false);
	const [sortValue, setSortValue] = useState<keyof Project>('name');
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
	const navigate = useNavigate();
	const deleteProject = useDeleteProject({
		onSuccess: () => {
			toast.success(t('commons.toasts.projectDeletedSuccess'));
		},
		onError: () => {
			toast.error(t('commons.toasts.projectDeletedError'));
		},
	});

	const updateProject = useUpdateProject({
		onSuccess: () => {
			toast.success(t('commons.toasts.projectUpdatedSuccess'));
		},
		onError: () => {
			toast.error(t('commons.toasts.projectUpdatedError'));
		},
	});

	const sortOptions = [
		{ value: 'name' as keyof Project, label: t('projects.filters.alphabetical') },
		{ value: 'startDate' as keyof Project, label: t('projects.filters.recentStart') },
		{ value: 'endDate' as keyof Project, label: t('projects.filters.closestEnd') },
	];

	const { data: sortedProjects } = useProcessedData({
		data: projects.data || [],
		customFilterFns: showFavorites ? [(p: Project) => p.isFavorite] : [],
		sortBy: sortValue,
		sortDirection: 'asc',
	});

	const handleDeleteClick = (project: Project) => {
		setProjectToDelete(project);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (projectToDelete) {
			await deleteProject.mutateAsync(projectToDelete.id);
			setProjectToDelete(null);
		}
	};

	const handleFavorite = async (project: Project) => {
		await updateProject.mutateAsync({ ...project, isFavorite: !project.isFavorite });
	};

	return (
		<div className='flex flex-col items-start gap-10 h-full' {...rest}>
			<div className='flex flex-row justify-between items-start gap-10 w-full'>
				<div className='flex flex-row gap-2 items-center'>
					<div className='text-2xl font-semibold text-primary'>{t('projects.title')}</div>
					<div className='font-normal text-primary-foreground'>({projects.data?.length ?? 0})</div>
				</div>

				<div className='flex flex-row gap-6 items-center'>
					<FavoriteComponent
						label={t('projects.filters.favorites')}
						checked={showFavorites}
						onCheckedChange={setShowFavorites}
					/>
					<FilterComponent
						value={sortValue}
						options={sortOptions}
						onFilterChange={(v) => setSortValue(v as keyof Project)}
					/>
					<Link to={'/projects/projectform'} search={{ mode: 'create' }}>
						<Button variant='default' size='default' className='rounded-full '>
							<PlusCircle />
							{t('projects.emptyList.button')}
						</Button>
					</Link>
				</div>
			</div>
			<div className='flex flex-wrap gap-4'>
				{sortedProjects.map((project: Project, idx: number) => (
					<CardProject
						key={project.id || idx}
						project={project}
						highlight={highlight && highlight.length >= 3 ? highlight : ''}
						handleEdit={() =>
							navigate({ to: '/projects/projectform', search: { project: JSON.stringify(project), mode: 'update' } })
						}
						handleDelete={() => handleDeleteClick(project)}
						handleFavorite={() => handleFavorite(project)}
					/>
				))}
			</div>
			<DeleteConfirm
				isOpen={deleteModalOpen}
				onOpenChange={(open) => {
					setDeleteModalOpen(open);
					if (!open) setProjectToDelete(null);
				}}
				onConfirm={handleConfirmDelete}
				title={t('project.delete.title')}
				description={t('project.delete.description')}
				name={projectToDelete?.name || ''}
			/>
		</div>
	);
};

ListProjects.displayName = 'ListProjects';

export default ListProjects;
