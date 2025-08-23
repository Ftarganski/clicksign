import { ProjectsPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/projects/')({
	component: ProjectsRoute,
});

function ProjectsRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<ProjectsPage />
		</Fragment>
	);
}
