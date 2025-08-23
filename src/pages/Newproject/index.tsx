import { HeaderComponent, NewProjectForm } from '@/components/modules';

import { generateBase64Id } from '@/helpers/helperHash64';
import { useCreateProject } from '@/hooks/mutations/useProjectMutation';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface NewprojectPageProps {}

const NewprojectPage: FC<NewprojectPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();
	const createProject = useCreateProject();

	function handleSubmit(data: {
		name: string;
		client: string;
		startDate: string;
		endDate: string;
		imageUrl?: string | undefined;
	}) {
		console.log('Form submit data:', data);
		createProject.mutate({
			id: generateBase64Id(),
			name: data.name,
			client: data.client,
			startDate: data.startDate,
			endDate: data.endDate,
			imageUrl: data.imageUrl || '/images/fallbackProject.png',
			isFavorite: false,
		});
	}

	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8 ' {...rest}>
			<HeaderComponent title={t('project.new.title')} buttonText={t('commons.buttons.back')} />
			<NewProjectForm onSubmit={handleSubmit} />
		</div>
	);
};

NewprojectPage.displayName = 'NewprojectPage';

export default NewprojectPage;
