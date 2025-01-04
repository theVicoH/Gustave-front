"use client";

import { cn } from "@/lib/utils";

export default function TypingIndicator() {
  return (
    <div className="flex gap-1 px-2">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={cn(
            "w-2 h-2 rounded-full bg-primary/60",
            "animate-bounce"
          )}
          style={{
            animationDelay: `${dot * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
} 