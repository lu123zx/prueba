import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border border-graphite/20 bg-transparent px-4 py-2 text-base text-graphite transition-colors duration-200 placeholder:text-graphite/40 hover:border-graphite/40 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-700",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
