import { Button } from './button';
import { Calendar, CalendarProps, DateRange } from './calendar';
import { Popover } from './popover';

import { Calendar1 } from 'lucide-react';
import { forwardRef, ReactNode, useCallback, useMemo, useState } from 'react';

type DatePickerSingleProps = Omit<CalendarProps, 'onSelect'> & {
	mode: 'single';
	selected?: Date;
	onSelect?: ((date: Date | undefined) => void) | undefined;
	placeholder?: string;
	icon?: ReactNode;
	displayFormat?: ((date: Date | undefined) => string) | undefined;
};

type DatePickerRangeProps = Omit<CalendarProps, 'onSelect'> & {
	mode: 'range';
	selected?: DateRange;
	onSelect?: ((range: DateRange | undefined) => void) | undefined;
	placeholder?: string;
	icon?: ReactNode;
	displayFormat?: ((range: DateRange | undefined) => string) | undefined;
};

type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>((props, ref) => {
	const [open, setOpen] = useState(false);

	const { placeholder, className, displayFormat, icon, onSelect, mode, selected, ...calendarProps } = props;

	const display = useMemo(() => {
		if (mode === 'single' && selected) {
			if (typeof displayFormat === 'function') return displayFormat(selected as Date);
			return (selected as Date)?.toLocaleDateString();
		}
		if (mode === 'range' && selected) {
			if (typeof displayFormat === 'function') return displayFormat(selected as DateRange);
			const range = selected as DateRange;
			if (range?.from && range?.to) {
				return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
			}
			if (range?.from) return range.from.toLocaleDateString();
		}
		return placeholder;
	}, [placeholder, selected, displayFormat, mode]);

	const handleSelect = useCallback(
		(value: any) => {
			if (typeof onSelect === 'function') onSelect(value);
			if (mode === 'single' && value instanceof Date && !isNaN(value.getTime())) {
				setOpen(false);
			}
			if (mode === 'range' && value && value.from && value.to) {
				setOpen(false);
			}
		},
		[onSelect, mode]
	);

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<Button ref={ref} variant='outline' className='justify-start border-border px-3 ' type='button'>
					<span className='ellipsis flex-1 text-left text-muted'>{display}</span>
					{icon ?? <Calendar1 className='text-muted' />}
				</Button>
			</Popover.Trigger>
			<Popover.Content className='w-auto p-0'>
				{mode === 'single' ? (
					<Calendar {...calendarProps} mode='single' selected={selected as Date | undefined} onSelect={handleSelect} />
				) : (
					<Calendar
						{...calendarProps}
						mode='range'
						selected={selected as DateRange | undefined}
						onSelect={handleSelect}
					/>
				)}
			</Popover.Content>
		</Popover.Root>
	);
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
