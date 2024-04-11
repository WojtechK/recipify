import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-orange-950 dark:focus-visible:ring-orange-300",
  {
    variants: {
      variant: {
        default:
          "bg-orange-600 text-orange-50 hover:bg-orange-900/90 dark:bg-orange-50 dark:text-orange-900 dark:hover:bg-orange-50/90",
        destructive:
          "bg-red-500 text-orange-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-orange-50 dark:hover:bg-red-900/90",
        outline:
          "border border-orange-200 bg-white hover:bg-orange-100 hover:text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:hover:bg-orange-800 dark:hover:text-orange-50",
        secondary:
          "bg-orange-100 text-orange-900 hover:bg-orange-100/80 dark:bg-orange-800 dark:text-orange-50 dark:hover:bg-orange-800/80",
        ghost:
          "hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-50",
        link: "text-orange-900 underline-offset-4 hover:underline dark:text-orange-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading ? true : props.disabled}
        {...props}
      >
        {isLoading ? <ReloadIcon className="animate-spin"/> : props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
