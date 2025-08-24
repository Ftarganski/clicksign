import { Button } from './button';
import { Calendar, CalendarProps } from './calendar';
import { Popover } from './popover';

import { Calendar1 } from 'lucide-react';
import { forwardRef, ReactNode, useMemo } from 'react';

export type DatePickerProps = CalendarProps & { placeholder?: string; icon?: ReactNode };

const DatePicker = forwardRef<
	HTMLButtonElement,
	DatePickerProps & { displayFormat?: (date: Date | undefined) => string }
>(({ placeholder, className, displayFormat, icon, ...props }, ref) => {
	const display = useMemo(() => {
		if (props.mode === 'single' && props.selected) {
			if (displayFormat) return displayFormat(props.selected);
			return props.selected?.toLocaleDateString(props.locale?.code);
		}
		return placeholder;
	}, [placeholder, props, displayFormat]);

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button ref={ref} variant='outline' className='justify-start border-border px-3 '>
					<span className='ellipsis flex-1 text-left text-muted'>{display}</span>
					{icon ?? <Calendar1 className='text-muted' />}
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
