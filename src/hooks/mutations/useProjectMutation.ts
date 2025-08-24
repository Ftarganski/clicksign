import { projectApi } from '@/api';
import type { Project } from '@/types';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

export function useCreateProject(options?: UseMutationOptions<Project, Error, Project>) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (project: Project) => projectApi.create(project),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			options?.onSuccess?.(...args);
		},
		onError: options?.onError,
	});
}

export function useUpdateProject(options?: UseMutationOptions<Project, Error, Project>) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (project: Project) => projectApi.update(project),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			options?.onSuccess?.(...args);
		},
		onError: options?.onError,
	});
}

export function useDeleteProject(options?: UseMutationOptions<void, Error, string>) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => projectApi.delete(id),
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			options?.onSuccess?.(...args);
		},
		onError: options?.onError,
	});
}
