import { ProjectFormPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/projects/projectform/')({
	component: ProjectFormRoute,
});

function ProjectFormRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<ProjectFormPage />
		</Fragment>
	)
}
