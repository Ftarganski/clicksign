import { CardProject, HeaderComponent } from '@/components/modules';
import DeleteConfirm from '@/components/modules/Forms/DeleteConfirm';
import { useDeleteProject, useUpdateProject } from '@/hooks/mutations';
import { Project } from '@/types';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export interface SearchPageProps {}

const SearchPage = (props: any) => {
	const { t } = useTranslation();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
	const navigate = useNavigate();
	const router = useRouter();

	const { searchValue = '', searchResults = [] } =
		(router.state.location.state as { searchValue?: string; searchResults?: any[] } | undefined) || {};
	const [results, setResults] = useState(searchResults);

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

	const handleDeleteClick = useCallback((project: Project) => {
		setProjectToDelete(project);
		setDeleteModalOpen(true);
	}, []);

	const handleConfirmDelete = useCallback(async () => {
		if (projectToDelete) {
			await deleteProject.mutateAsync(projectToDelete.id);
			setResults((searchResults || []).filter((p: Project) => p.id !== projectToDelete.id));
			setProjectToDelete(null);
		}
	}, [deleteProject, projectToDelete, searchResults]);

	const handleFavorite = useCallback(
		async (project: Project) => {
			await updateProject.mutateAsync({ ...project, isFavorite: !project.isFavorite });
			setResults((prev) => prev.map((p: Project) => (p.id === project.id ? { ...p, isFavorite: !p.isFavorite } : p)));
		},
		[updateProject]
	);

	return (
		<div className='container max-w-[1536px] mx-auto w-full h-full flex flex-col gap-6 p-8 ' {...props}>
			<HeaderComponent title={t('search.title')} buttonText={t('commons.buttons.back')} />
			{results.length === 0 ? (
				<div className='text-center text-muted pt-10'>{t('commons.fallbacks.noResults', { searchValue })}</div>
			) : (
				<div className='flex flex-wrap gap-4'>
					{results.map((project: any, idx: number) => (
						<CardProject
							key={project.id || idx}
							project={project}
							highlight={''}
							handleEdit={() =>
								navigate({ to: '/projects/projectform', search: { project: JSON.stringify(project), mode: 'update' } })
							}
							handleDelete={() => handleDeleteClick(project)}
							handleFavorite={() => handleFavorite(project)}
						/>
					))}
				</div>
			)}
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

SearchPage.displayName = 'SearchPage';

export default SearchPage;
