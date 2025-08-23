import { projectApi } from '@/api';
import type { Project } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useListProjects() {
	return useQuery<Project[]>({
		queryKey: ['projects'],
		queryFn: () => projectApi.list(),
	});
}
