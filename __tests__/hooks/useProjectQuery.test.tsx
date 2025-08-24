import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { ReactNode } from 'react';
import * as projectApi from '../../src/api/projectApi';
import { useGetProject, useListProjects } from '../../src/hooks/queries/useProjectQuery';

jest.mock('../../src/api/projectApi');

const wrapper = ({ children }: { children: ReactNode }) => (
	<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useListProjects', () => {
	it('deve buscar lista de projetos', async () => {
		(projectApi.projectApi.list as jest.Mock).mockResolvedValueOnce([{ id: '1', name: 'Projeto 1' }]);
		const { result } = renderHook(() => useListProjects(), { wrapper });
		await act(async () => {
			await new Promise((resolve) => {
				const interval = setInterval(() => {
					if (result.current.isSuccess) {
						clearInterval(interval);
						resolve(null);
					}
				}, 10);
			});
		});
		expect(result.current.data).toEqual([{ id: '1', name: 'Projeto 1' }]);
	});
});

describe('useGetProject', () => {
	it('deve buscar projeto por id', async () => {
		(projectApi.projectApi.get as jest.Mock).mockResolvedValueOnce({ id: '1', name: 'Projeto 1' });
		const { result } = renderHook(() => useGetProject('1'), { wrapper });
		await act(async () => {
			await new Promise((resolve) => {
				const interval = setInterval(() => {
					if (result.current.isSuccess) {
						clearInterval(interval);
						resolve(null);
					}
				}, 10);
			});
		});
		expect(result.current.data).toEqual({ id: '1', name: 'Projeto 1' });
	});

	it('não busca se id for falsy', async () => {
		const { result } = renderHook(() => useGetProject(''), { wrapper });
		expect(result.current.isLoading).toBe(false);
	});
});
