import { Button, Form, Input } from '@/components/ui';
import { projectSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

type FormData = z.infer<typeof projectSchema>;

export interface NewProjectFormProps {
	onSubmit: (data: FormData) => void;
}

const NewProjectForm: FC<NewProjectFormProps> = ({ onSubmit }) => {
	const { t } = useTranslation();
	const form = useForm<FormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			name: '',
			client: '',
			startDate: '',
			endDate: '',
			imageUrl: '',
		},
	});

	return (
		<Form.Root
			form={form}
			onSubmit={form.handleSubmit(onSubmit)}
			className='w-full rounded-md flex flex-col border items-center border-border p-8'
		>
			<div className='flex flex-col gap-6 w-[720px] '>
				<Form.Field
					name='name'
					render={({ field }) => (
						<Form.Item>
							<div className='flex flex-row gap-2'>
								<Form.Label className='text-primary-foreground'>{t('project.form.name')}</Form.Label>
								<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
							</div>
							<Form.Control>
								<Input {...field} placeholder={t('project.form.namePlaceholder')} className='w-full bg-card' />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Form.Field
					name='client'
					render={({ field }) => (
						<Form.Item>
							<div className='flex flex-row gap-2'>
								<Form.Label className='text-primary-foreground'>{t('project.form.client')}</Form.Label>
								<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
							</div>
							<Form.Control>
								<Input {...field} placeholder={t('project.form.clientPlaceholder')} className='w-full bg-card' />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Form.Field
					name='startDate'
					render={({ field }) => (
						<Form.Item>
							<div className='flex flex-row gap-2'>
								<Form.Label className='text-primary-foreground'>{t('project.form.startDate')}</Form.Label>
								<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
							</div>
							<Form.Control>
								<Input {...field} type='date' className='w-full bg-card' />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name='endDate'
					render={({ field }) => (
						<Form.Item>
							<div className='flex flex-row gap-2'>
								<Form.Label className='text-primary-foreground'>{t('project.form.endDate')}</Form.Label>
								<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
							</div>

							<Form.Control>
								<Input {...field} type='date' className='w-full bg-card' />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Controller
					name='imageUrl'
					control={form.control}
					render={({ field }) => (
						<Form.Item className='col-span-1 md:col-span-2'>
							<Form.Label className='text-primary-foreground'>{t('project.form.cover')}</Form.Label>
							<Form.Control>
								<div className='border border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-4'>
									<input
										type='file'
										accept='.jpg,.jpeg,.png'
										onChange={(e) => {
											const file = e.target.files?.[0];
											if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
												const reader = new FileReader();
												reader.onload = () => field.onChange(reader.result as string);
												reader.readAsDataURL(file);
											} else {
												field.onChange('');
												alert('Escolha uma imagem .jpg ou .png');
											}
										}}
										className='hidden'
										id='image-upload'
									/>
									<Upload className='text-muted' />
									<span className='text-sm text-muted'>{t('project.form.imageAlert')}</span>
									<Button variant='outline' className='rounded-full'>
										{t('project.form.selectImage')}
									</Button>
								</div>
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Button type='submit' variant='default' className='rounded-full' disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? t('commons.button.saving') : t('commons.button.save')}
				</Button>
			</div>
		</Form.Root>
	);
};

export default NewProjectForm;
