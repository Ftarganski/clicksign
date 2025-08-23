import { Upload, X } from 'lucide-react';
import { Button } from './button';

import { cn } from '@/utils';
import { ChangeEvent, DragEvent, forwardRef, InputHTMLAttributes, useCallback, useMemo, useState } from 'react';

export interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
	files?: File[];
	onFilesChange?: (data: File[]) => void;
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
	({ files, onFilesChange, onChange, multiple, disabled, placeholder, className, id = 'InputFile', ...props }, ref) => {
		const [dragging, setDragging] = useState(false);

		const handleChange = useCallback(
			(ev: ChangeEvent<HTMLInputElement>) => {
				if (onChange) onChange(ev);
				if (ev.target.files) onFilesChange?.(Array.from(ev.target.files));
			},
			[onChange, onFilesChange]
		);

		const handleDrop = useCallback(
			(ev: DragEvent<HTMLLabelElement>) => {
				ev.preventDefault();
				setDragging(false);
				if (ev.dataTransfer.files) onFilesChange?.(Array.from(ev.dataTransfer.files));
			},
			[onFilesChange]
		);

		const previews = useMemo(() => {
			return files?.map((file) => {
				return file.type.startsWith('image/') ? URL.createObjectURL(file) : '/icons/doc.png';
			});
		}, [files]);

		return (
			<label
				htmlFor={id}
				onDrop={handleDrop}
				onDragOver={(ev) => ev.preventDefault()}
				onDragEnter={() => setDragging(true)}
				onDragLeave={() => setDragging(false)}
				className={cn(
					'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-background text-sm font-medium whitespace-nowrap ring-offset-background transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
					dragging ? 'border-primary' : 'border-input hover:border-muted',
					disabled && 'pointer-events-none',
					className
				)}
			>
				<div className='flex min-h-16 items-center justify-center gap-2 p-4'>
					{previews && previews.length > 0 ? (
						previews.map((preview, index) => (
							<img key={preview} src={preview} alt={`Preview ${index}`} className='h-16 w-16 rounded' />
						))
					) : (
						<Upload className='m-4 h-8 w-8' />
					)}
				</div>
				<div className='flex w-full justify-between gap-2 rounded bg-accent p-4 text-accent-foreground'>
					<span className='overflow-hidden text-ellipsis whitespace-nowrap'>
						{files && files.length > 0 ? files.map((file) => file.name).join(', ') : placeholder}
					</span>
					{files && files.length > 0 && (
						<Button
							type='button'
							size='auto'
							variant='ghost'
							onClick={(ev) => {
								ev.preventDefault();
								ev.stopPropagation();
								onFilesChange?.([]);
							}}
						>
							<X />
						</Button>
					)}
				</div>
				<input
					id={id}
					type='file'
					className='hidden'
					aria-hidden='true'
					multiple={multiple}
					onChange={handleChange}
					ref={ref}
					{...props}
				/>
			</label>
		);
	}
);
InputFile.displayName = 'Input';

export { InputFile };
