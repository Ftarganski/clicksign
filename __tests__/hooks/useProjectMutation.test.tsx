import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { useCreateProject, useDeleteProject, useUpdateProject } from '../../src/hooks/mutations/useProjectMutation';

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useCreateProject', () => {
	it('deve criar um projeto e invalidar queries', async () => {
		const { result } = renderHook(() => useCreateProject(), { wrapper });
		await act(async () => {
			const { mutateAsync } = result.current;
			const project = {
				id: '1',
				name: 'Novo Projeto',
				client: 'Cliente X',
				startDate: '2024-01-01',
				endDate: '2024-12-31',
				imageUrl: '',
				isFavorite: false,
			};
			const res = await mutateAsync(project);
			expect(res).toEqual(project);
		});
	});
});

describe('useUpdateProject', () => {
	it('deve atualizar um projeto', async () => {
		const { result } = renderHook(() => useUpdateProject(), { wrapper });
		await act(async () => {
			const { mutateAsync } = result.current;
			const project = {
				id: '1',
				name: 'Projeto Atualizado',
				client: 'Cliente Y',
				startDate: '2024-01-01',
				endDate: '2024-12-31',
				imageUrl: '',
				isFavorite: true,
			};
			const res = await mutateAsync(project);
			expect(res).toEqual(project);
		});
	});
});

describe('useDeleteProject', () => {
	it('deve deletar um projeto', async () => {
		const { result } = renderHook(() => useDeleteProject(), { wrapper });
		await act(async () => {
			const { mutateAsync } = result.current;
			const res = await mutateAsync('1');
			expect(res).toBeUndefined();
		});
	});
});
