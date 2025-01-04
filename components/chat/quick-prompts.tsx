"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActionButtons from "./action-buttons";

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const predefinedPrompts = [
  {
    text: "Comment puis-je vous aider ?",
    category: "general",
  },
  {
    text: "Quelles sont les fonctionnalités disponibles ?",
    category: "features",
  },
  {
    text: "Pouvez-vous m'expliquer comment ça marche ?",
    category: "help",
  },
];

export default function QuickPrompts({ onSelectPrompt }: QuickPromptsProps) {
  return (
    <div className="space-y-4">
      {/*       <ActionButtons /> */}
      <div className="grid grid-cols-1 gap-2">
        {predefinedPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start bg-card/50 backdrop-blur-sm hover:bg-card/80 text-left h-auto py-3 px-4"
            onClick={() => onSelectPrompt(prompt.text)}
          >
            {prompt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
