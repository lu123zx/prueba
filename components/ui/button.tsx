import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide outline-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Sobre fondo hueso.
        default:
          "border border-accent bg-accent text-accent-foreground hover:border-graphite hover:bg-graphite",
        outline:
          "border border-graphite/30 bg-transparent text-graphite hover:border-graphite",
        ghost: "bg-transparent text-graphite hover:bg-graphite/5",
        // Sobre fondo grafito: al invertir, el hover pasa a hueso.
        "default-dark":
          "border border-accent bg-accent text-accent-foreground hover:bg-bone hover:text-graphite",
        "outline-dark":
          "border border-bone/30 bg-transparent text-bone hover:border-bone",
      },
      size: {
        default: "h-12 px-7 has-[>svg]:px-6",
        sm: "h-10 px-5 text-[13px]",
        lg: "h-14 px-9 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
