export type Project = {
	id: string;
	name: string;
	client: string;
	startDate: string;
	endDate: string;
	image: string;
	isFavorite: boolean;
};

const STORAGE_KEY = 'projects';

function getProjects(): Project[] {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

function saveProjects(projects: Project[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export const projectApi = {
	list: () => Promise.resolve(getProjects()),
	create: (project: Project) => {
		const projects = getProjects();
		projects.push(project);
		saveProjects(projects);
		return Promise.resolve(project);
	},
	update: (updated: Project) => {
		const projects = getProjects().map((p) => (p.id === updated.id ? updated : p));
		saveProjects(projects);
		return Promise.resolve(updated);
	},
	delete: (id: string) => {
		const projects = getProjects().filter((p) => p.id !== id);
		saveProjects(projects);
		return Promise.resolve();
	},
	get: (id: string) => {
		const project = getProjects().find((p) => p.id === id);
		return Promise.resolve(project);
	},
};
