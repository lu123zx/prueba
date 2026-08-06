import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-graphite border border-accent hover:border-graphite",
        "primary-dark":
          "bg-accent text-accent-foreground hover:bg-bone hover:text-graphite border border-accent",
        secondary:
          "bg-transparent text-graphite border border-graphite/30 hover:border-graphite",
        "secondary-dark":
          "bg-transparent text-bone border border-bone/30 hover:border-bone",
        ghost: "bg-transparent hover:bg-graphite/5",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-[13px]",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
