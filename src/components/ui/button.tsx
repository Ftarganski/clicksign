import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
	'inline-flex items-center gap-2 rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary-foreground text-background hover:bg-primary/90 hover:cursor-pointer',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:cursor-pointer',
				success: 'bg-success text-success-foreground hover:bg-success/90 hover:cursor-pointer',
				warning: 'bg-warning text-warning-foreground hover:bg-warning/90 hover:cursor-pointer',
				outline:
					'border border-primary-foreground bg-card text-primary-foreground hover:bg-muted-foreground hover:cursor-pointer hover:text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:cursor-pointer',
				ghost: 'hover:bg-accent hover:text-accent-foreground hover:cursor-pointer',
				link: 'text-primary-foreground underline-offset-4 hover:cursor-pointer',
			},
			size: {
				default: 'h-10 px-6 py-2',
				xs: 'h-6 rounded-md px-1',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				auto: 'h-auto w-auto p-1',
			},
			align: {
				start: 'justify-start',
				center: 'justify-center',
				end: 'justify-end',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			align: 'center',
		},
	}
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, align, asChild = false, type = 'button', ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({ variant, size, align }), className)} type={type} ref={ref} {...props} />
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
