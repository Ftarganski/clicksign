import { EmptyComponent } from '@/components/modules';
import { Separator } from '@/components/ui';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col gap-4 p-4 md:p-6' {...rest}>
			<h1 className='text-3xl font-bold'>{t('projects.title')}</h1>
			<div>{t('projects.description')}</div>
			<Separator />

			<EmptyComponent message={'vazio'} />
		</div>
	);
};

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;
