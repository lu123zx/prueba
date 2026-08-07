import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 border border-input bg-transparent px-4 py-2 text-base text-foreground outline-none transition-colors duration-200",
        "placeholder:text-muted-foreground/70",
        "hover:border-graphite/40 focus-visible:border-accent",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
