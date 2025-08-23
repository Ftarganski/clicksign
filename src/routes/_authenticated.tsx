import { Header } from '@/components/modules';

import { Toaster } from '@/components/ui';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_authenticated')({
	component: AuthLayout,
});

export default function AuthLayout() {
	return (
		<Suspense>
			<Toaster />
			<div className='flex flex-col h-screen'>
				<Header />
				<div className='flex-1 min-h-0'>
					<Outlet />
				</div>
			</div>
		</Suspense>
	);
}
