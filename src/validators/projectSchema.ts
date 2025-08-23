import { z } from 'zod';

export const projectSchema = z.object({
	name: z.string().min(1, 'Por favor, digite ao menos duas palavras'),
	client: z.string().min(1, 'Por favor, digite ao menos uma palavra'),
	startDate: z.string().min(1, 'Selecione uma data válida'),
	endDate: z.string().min(1, 'Selecione uma data válida'),
	imageUrl: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
