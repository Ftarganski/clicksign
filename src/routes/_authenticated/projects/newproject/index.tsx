import { NewprojectPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/projects/newproject/')({
	component: NewprojectRoute,
});

function NewprojectRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<NewprojectPage />
		</Fragment>
	);
}
