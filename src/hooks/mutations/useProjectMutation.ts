import { projectApi } from '@/api';
import type { Project } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (project: Project) => projectApi.create(project),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (project: Project) => projectApi.update(project),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => projectApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
		},
	});
}
