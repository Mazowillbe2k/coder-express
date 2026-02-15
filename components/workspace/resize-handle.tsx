"use client";

import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResizeHandleProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}

export function ResizeHandle({ className, direction = "horizontal" }: ResizeHandleProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-border hover:bg-primary/20 transition-colors cursor-col-resize group",
        direction === "horizontal" ? "w-1 h-full" : "h-1 w-full",
        className
      )}
    >
      <GripVertical className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
