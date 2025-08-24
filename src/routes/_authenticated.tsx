import { HeaderBar } from '@/components/modules';

import { Toaster } from '@/components/ui';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_authenticated')({
	component: AuthLayout,
});

export default function AuthLayout() {
	const { t } = useTranslation();
	return (
		<Suspense>
			<Toaster />
			<div className='flex flex-col'>
				<HeaderBar title={t('system.title')} />
				<div className='flex-1 min-h-0'>
					<Outlet />
				</div>
			</div>
		</Suspense>
	);
}
