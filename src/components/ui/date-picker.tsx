import { cn } from '@/utils';
import { Button } from './button';
import { Calendar, CalendarProps } from './calendar';
import { Popover } from './popover';

import { Calendar1 } from 'lucide-react';
import { forwardRef, useMemo } from 'react';

export type DatePickerProps = CalendarProps & { placeholder?: string };

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(({ placeholder, className, ...props }, ref) => {
	const display = useMemo(() => {
		if (props.mode === 'single' && props.selected) {
			return props.selected?.toLocaleDateString(props.locale?.code);
		}

		return placeholder;
	}, [placeholder, props]);

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button ref={ref} variant='outline' className={cn('justify-start', className)}>
					<Calendar1 />
					<span className='ellipsis flex-1 text-left'>{display}</span>
				</Button>
			</Popover.Trigger>
			<Popover.Content className='w-auto p-0'>
				<Calendar {...props} />
			</Popover.Content>
		</Popover.Root>
	);
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
