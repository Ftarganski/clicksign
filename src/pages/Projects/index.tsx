import { EmptyComponent, ListProjects } from '@/components/modules';
import { PlusCircle } from 'lucide-react';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	// TODO REMOVE
	const list = false;

	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8' {...rest}>
			{list ? (
				<EmptyComponent
					title={t('projects.emptyList.title')}
					description={t('projects.emptyList.description')}
					button={t('projects.emptyList.button')}
					linkTo='/projects/newproject'
					icon={<PlusCircle />}
				/>
			) : (
				<ListProjects />
			)}
		</div>
	);
};

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;
