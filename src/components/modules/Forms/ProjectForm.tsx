import { Button, DatePicker, Form, Input } from '@/components/ui';
import { getProjectSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar1, CalendarCheck, Trash, Upload } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

export interface ProjectFormProps {
	onSubmit?: (data: ProjectFormData) => void;
	defaultValues?: Partial<ProjectFormData>;
	mode?: 'create' | 'update';
}

type ProjectFormData = z.infer<ReturnType<typeof getProjectSchema>>;

const ProjectForm: FC<ProjectFormProps> = ({ onSubmit, defaultValues, mode = 'create' }) => {
	const { t } = useTranslation();
	const projectSchema = getProjectSchema(t);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: defaultValues as any,
	});

	useEffect(() => {
		if (mode === 'update' && defaultValues) {
			form.reset(defaultValues as any);
		}
	}, [mode, defaultValues, form]);

	return (
		<Form.Root
			form={form}
			onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
			className='w-full rounded-md flex flex-col border items-center border-border p-4 sm:p-8'
		>
			<div className='flex flex-col gap-6 w-full max-w-[720px] sm:w-[720px]'>
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
				<div className='flex flex-col sm:flex-row gap-4'>
					<Form.Field
						name='startDate'
						render={({ field }) => (
							<Form.Item className='flex-1'>
								<div className='flex flex-row gap-2'>
									<Form.Label className='text-primary-foreground'>{t('project.form.startDate')}</Form.Label>
									<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
								</div>
								<Form.Control>
									<DatePicker
										mode='single'
										startMonth={new Date(new Date().getFullYear() - 10, 0)}
										endMonth={new Date(new Date().getFullYear() + 10, 11)}
										placeholder={t('project.form.startDatePlaceholder')}
										selected={field.value ? new Date(field.value) : undefined}
										icon={<Calendar1 className='text-muted' />}
										onSelect={(date: Date | undefined) => {
											if (date instanceof Date && !isNaN(date.getTime())) {
												field.onChange(date.toISOString());
											} else {
												field.onChange('');
											}
										}}
										displayFormat={(date) => (date ? date.toLocaleDateString('pt-BR') : '')}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
					<Form.Field
						control={form.control}
						name='endDate'
						render={({ field }) => (
							<Form.Item className='flex-1'>
								<div className='flex flex-row gap-2'>
									<Form.Label className='text-primary-foreground'>{t('project.form.endDate')}</Form.Label>
									<Form.Label className='text-sm text-muted'>{t('project.form.required')}</Form.Label>
								</div>
								<Form.Control>
									<DatePicker
										mode='single'
										startMonth={new Date(new Date().getFullYear() - 10, 0)}
										endMonth={new Date(new Date().getFullYear() + 10, 11)}
										placeholder={t('project.form.startDatePlaceholder')}
										selected={field.value ? new Date(field.value) : undefined}
										icon={<CalendarCheck className='text-muted' />}
										onSelect={(date: Date | undefined) => {
											if (date instanceof Date && !isNaN(date.getTime())) {
												field.onChange(date.toISOString());
											} else {
												field.onChange('');
											}
										}}
										displayFormat={(date) => (date ? date.toLocaleDateString('pt-BR') : '')}
									/>
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					/>
				</div>

				<Controller
					name='imageUrl'
					control={form.control}
					render={({ field }) => (
						<Form.Item className='col-span-1 md:col-span-2'>
							<Form.Label className='text-primary-foreground'>{t('project.form.cover')}</Form.Label>
							<Form.Control>
								{field.value ? (
									<div className='relative w-full flex items-center justify-center'>
										<img
											src={field.value}
											alt={t('project.form.cover')}
											className='rounded-lg object-cover w-full h-96 cover-full border border-border shadow'
										/>
										<div
											className='absolute flex items-center justify-center top-4 right-4 rounded-full bg-card h-8 w-8 hover:cursor-pointer'
											onClick={() => field.onChange('')}
										>
											<Trash className='text-muted' size={20} />
										</div>
									</div>
								) : (
									<div className='border border-dashed border-border rounded-lg p-6 gap-4 flex flex-col items-center w-full'>
										<input
											ref={fileInputRef}
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
										<Button
											variant='outline'
											className='rounded-full'
											type='button'
											onClick={() => fileInputRef.current?.click()}
										>
											{t('project.form.selectImage')}
										</Button>
									</div>
								)}
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>
				<Button type='submit' variant='secondary' className='rounded-full' disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? t('commons.buttons.saving') : t('commons.buttons.save')}
				</Button>
			</div>
		</Form.Root>
	);
};

export default ProjectForm;
