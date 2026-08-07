import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[120px] w-full border border-input bg-transparent px-4 py-3 text-base text-foreground outline-none transition-colors duration-200",
        "placeholder:text-muted-foreground/70",
        "hover:border-graphite/40 focus-visible:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
