import { SearchPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/projects/search/')({
	component: SearchRoute,
});

function SearchRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<SearchPage />
		</Fragment>
	);
}
