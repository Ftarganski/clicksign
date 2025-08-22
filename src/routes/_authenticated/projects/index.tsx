import { ProjectsPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/projects/')({
	component: ProjectsRoute,
});

function ProjectsRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<div className='container max-w-[1280px] mx-auto w-full flex flex-col gap-6 '>
				<ProjectsPage />
			</div>
		</Fragment>
	);
}
