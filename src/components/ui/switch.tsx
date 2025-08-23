import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/utils';
import type { ComponentProps } from 'react';

function Switch({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			className={cn(
				'peer data-[state=checked]:bg-warning data-[state=unchecked]:bg-popover-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-popover-foreground inline-flex h-[1.15rem] w-10 px-1 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					'bg-background dark:data-[state=unchecked]:bg-card dark:data-[state=checked]:bg-card pointer-events-none block size-3 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-0'
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
