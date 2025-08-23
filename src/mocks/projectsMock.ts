import { Project } from '@/types';

export const projectsMock: Project[] = [
	{
		id: '1',
		name: 'Projeto Exemplo',
		client: 'Cliente Exemplo',
		startDate: '2025-08-23',
		endDate: '2025-12-31',
		imageUrl: '/images/fallbackProject.png',
		isFavorite: false,
	},
	{
		id: '2',
		name: 'Projeto 2',
		client: 'Cliente 2',
		startDate: '2025-08-23',
		endDate: '2025-12-31',
		imageUrl: '/images/fallbackProject.png',
		isFavorite: true,
	},
	{
		id: '3',
		name: 'Projeto 3',
		client: 'Cliente 3',
		startDate: '2025-08-23',
		endDate: '2025-12-31',
		imageUrl: '/images/fallbackProject.png',
		isFavorite: true,
	},
	{
		id: '4',
		name: 'Projeto 4',
		client: 'Cliente 4',
		startDate: '2025-08-23',
		endDate: '2025-12-31',
		imageUrl: '/images/fallbackProject.png',
		isFavorite: false,
	},
];
