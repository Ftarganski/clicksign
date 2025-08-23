import { projectApi } from '@/api';
import type { Project } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useListProjects() {
	const query = useQuery<Project[]>({
		queryKey: ['projects'],
		queryFn: () => projectApi.list(),
	});
	return {
		...query,
	};
}

export function useGetProject(id: string) {
	return useQuery<Project | undefined>({
		queryKey: ['project', id],
		queryFn: () => projectApi.get(id),
		enabled: !!id,
	});
}
