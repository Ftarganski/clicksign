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
			<Header />
			<Outlet />
		</Suspense>
	);
}
