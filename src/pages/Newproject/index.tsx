import { HeaderComponent, NewProjectForm } from '@/components/modules';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface NewprojectPageProps {}

const NewprojectPage: FC<NewprojectPageProps> = ({ ...rest }) => {
	const { t } = useTranslation();

	return (
		<div className='container max-w-[1280px] mx-auto w-full h-full flex flex-col gap-6 p-8 ' {...rest}>
			<HeaderComponent title={t('project.new.title')} buttonText={t('commons.buttons.back')} />
			<NewProjectForm />
		</div>
	);
};

NewprojectPage.displayName = 'NewprojectPage';

export default NewprojectPage;
