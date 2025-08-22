import { SearchPage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_authenticated/search/')({
	component: SearchRoute,
});

function SearchRoute({ ...rest }) {
	return (
		<Fragment {...rest}>
			<div className='container max-w-[1280px] mx-auto w-full flex flex-col gap-6 '>
				<SearchPage />
			</div>
		</Fragment>
	);
}
