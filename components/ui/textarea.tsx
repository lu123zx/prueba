import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full border border-graphite/20 bg-transparent px-4 py-3 text-base text-graphite transition-colors duration-200 placeholder:text-graphite/40 hover:border-graphite/40 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-700",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
