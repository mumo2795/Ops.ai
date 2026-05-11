"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LegalPageClose() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-2 rounded-full border-border bg-background/80 text-foreground hover:bg-secondary dark:border-zinc-700 dark:bg-secondary/30 dark:hover:bg-secondary/50"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4 shrink-0" aria-hidden />
      Close
    </Button>
  );
}
