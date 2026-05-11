"use client";

import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TermsOfServiceContent } from "@/components/legal/TermsOfServiceContent";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import { cn } from "@/lib/utils";

/** Scrollable body; extra top padding clears the dialog close control. */
const dialogBodyClass =
  "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-16 pr-14 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:pt-[4.5rem] sm:pr-14 sm:pb-10";

/**
 * Large, readable legal modal: nearly full width on small screens, capped width on desktop.
 * Mobile: top-aligned so tall content is not clipped by vertical centering.
 */
const dialogSurfaceClass = cn(
  "flex flex-col gap-0 overflow-hidden border border-border bg-background p-0 shadow-xl",
  "rounded-xl sm:rounded-2xl dark:border-zinc-800 dark:bg-card",
  "left-1/2 top-[max(1rem,env(safe-area-inset-top,0px))] max-h-[calc(100dvh-2rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] w-[min(calc(100vw-1.5rem),64rem)] -translate-x-1/2 translate-y-0",
  "sm:top-1/2 sm:max-h-[min(92dvh,920px)] sm:-translate-y-1/2",
  "max-w-none",
);

export type LegalDocumentModalControls = {
  openTerms: () => void;
  openPrivacy: () => void;
  modals: React.ReactNode;
};

/** In-form Terms / Privacy dialogs so users can read legal text without leaving the auth page. */
export function useLegalDocumentModals(): LegalDocumentModalControls {
  const [active, setActive] = useState<null | "terms" | "privacy">(null);

  const openTerms = useCallback(() => setActive("terms"), []);
  const openPrivacy = useCallback(() => setActive("privacy"), []);

  const modals = (
    <>
      <Dialog open={active === "terms"} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className={cn(dialogSurfaceClass)}>
          <DialogTitle className="sr-only">Terms of Service</DialogTitle>
          <DialogDescription className="sr-only">Legal terms for using the Ops.AI platform.</DialogDescription>
          <div className={dialogBodyClass}>
            <TermsOfServiceContent />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={active === "privacy"} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className={cn(dialogSurfaceClass)}>
          <DialogTitle className="sr-only">Privacy Policy</DialogTitle>
          <DialogDescription className="sr-only">How Ops.AI collects and uses your information.</DialogDescription>
          <div className={dialogBodyClass}>
            <PrivacyPolicyContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  return { openTerms, openPrivacy, modals };
}

/** Styled as an inline text link; use with `type="button"` for in-form legal modals. */
export const authLegalTriggerClass =
  "inline p-0 h-auto font-medium text-foreground bg-transparent border-0 cursor-pointer underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground hover:opacity-90 transition-[opacity,decoration-color] focus-ring rounded-sm";
