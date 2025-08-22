import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/projects/$id')({
	component: ProjectComponent,
});

function ProjectComponent() {
	return <div>Hello "/_authenticated/projects/$id"!</div>;
}
