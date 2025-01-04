"use client";

import { Image, Sparkles, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-card/50 backdrop-blur-sm hover:bg-card/80"
      >
        <Image className="h-4 w-4 mr-2 text-blue-600" />
        Créer une image
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-card/50 backdrop-blur-sm hover:bg-card/80"
      >
        <Sparkles className="h-4 w-4 mr-2 text-indigo-600" />
        Proposer
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-card/50 backdrop-blur-sm hover:bg-card/80"
      >
        <PenLine className="h-4 w-4 mr-2 text-purple-600" />
        M'aider à écrire
      </Button>
    </div>
  );
}
