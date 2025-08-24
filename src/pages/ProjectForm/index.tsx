import { HeaderComponent, ProjectForm } from '@/components/modules';

import { generateBase64Id } from '@/helpers/helperHash64';
import { useCreateProject, useUpdateProject } from '@/hooks/mutations/useProjectMutation';
import { getProjectSchema } from '@/validators';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import z from 'zod';

export interface ProjectFormPageProps {}

const { t } = useTranslation();
const projectSchema = getProjectSchema(t);
type FormData = z.infer<typeof projectSchema> & { id?: string; isFavorite?: boolean };

const parseProject = (raw: string | undefined): Partial<FormData> | null => {
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		return {
			...parsed,
			isFavorite: typeof parsed.isFavorite === 'boolean' ? parsed.isFavorite : false,
		};
	} catch {
		return null;
	}
};

const getDefaultValues = (project: Partial<FormData> | null): Partial<FormData> => ({
	name: project?.name ?? '',
	client: project?.client ?? '',
	startDate: project?.startDate ?? '',
	endDate: project?.endDate ?? '',
	imageUrl: project?.imageUrl ?? '',
	isFavorite: project?.isFavorite ?? false,
});

const ProjectFormPage: FC<ProjectFormPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	const navigate = useNavigate();
	const search: any = useSearch({ from: '/_authenticated/projects/projectform/' });
	const mode = search?.mode === 'update' ? 'update' : 'create';

	const createProject = useCreateProject({
		onSuccess: () => {
			toast.success(t('commons.toasts.projectCreatedSuccess'));
		},
		onError: () => {
			toast.error(t('commons.toasts.projectCreatedError'));
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

	const project = useMemo(() => parseProject(search?.project), [search?.project]);
	const defaultValues = useMemo(() => getDefaultValues(project), [project]);

	const handleSubmit = (data: FormData) => {
		const payload = {
			...data,
			imageUrl: data.imageUrl || '/images/fallbackProject.png',
		};

		if (mode === 'update' && project?.id) {
			updateProject.mutate(
				{
					id: project.id!,
					name: payload.name,
					client: payload.client,
					startDate: payload.startDate,
					endDate: payload.endDate,
					imageUrl: payload.imageUrl,
					isFavorite: project.isFavorite ?? false,
				},
				{ onSuccess: () => navigate({ to: '/projects' }) }
			);
		} else {
			createProject.mutate(
				{
					id: generateBase64Id(),
					...payload,
					isFavorite: false,
				},
				{ onSuccess: () => navigate({ to: '/projects' }) }
			);
		}
	};

	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8 ' {...rest}>
			<HeaderComponent
				title={mode === 'update' ? t('project.form.editTitle') : t('project.form.newTitle')}
				buttonText={t('commons.buttons.back')}
			/>
			<ProjectForm onSubmit={handleSubmit} defaultValues={defaultValues} mode={mode} />
		</div>
	);
};

ProjectFormPage.displayName = 'ProjectFormPage';

export default ProjectFormPage;
