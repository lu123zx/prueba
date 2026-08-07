"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-px w-full grow bg-border"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-px bg-accent"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="block size-5 shrink-0 rounded-full border border-accent bg-accent transition-colors duration-200 hover:bg-foreground hover:border-foreground disabled:pointer-events-none"
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };
