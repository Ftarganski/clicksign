import { z } from 'zod';

export const getProjectSchema = (t: (key: string) => string) =>
	z.object({
		name: z
			.string()
			.min(1, { message: t('project.form.errors.nameRequired') })
			.refine((val) => val.trim().split(/\s+/).length >= 2, {
				message: t('project.form.errors.nameMinWords'),
			}),
		client: z.string().min(1, { message: t('project.form.errors.clientRequired') }),
		startDate: z.string().min(1, { message: t('project.form.errors.startDateRequired') }),
		endDate: z.string().min(1, { message: t('project.form.errors.endDateRequired') }),
		imageUrl: z.string().optional(),
	});

const defaultT = (key: string) => key;
export const projectFormData = getProjectSchema(defaultT);

export type ProjectFormData = z.infer<ReturnType<typeof getProjectSchema>>;
