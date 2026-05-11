/** Shared field surface for auth forms — readable in light and dark mode. */
export const authInputClass =
  "h-11 rounded-xl border-border/90 bg-secondary/25 text-foreground placeholder:text-muted-foreground dark:border-zinc-700 dark:bg-[hsl(0,0%,10%)] dark:text-foreground";

export const authSelectTriggerClass =
  "h-11 rounded-xl border-border/90 bg-secondary/25 dark:border-zinc-700 dark:bg-[hsl(0,0%,10%)]";

/** Grouped fields on auth cards — solid surface in dark mode (avoids low-contrast /40 overlays). */
export const authFormPanelClass =
  "rounded-xl border border-border bg-muted/30 px-3.5 py-3.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/80 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]";

/** Same surface as {@link authFormPanelClass} — use one token for all grouped auth panels (incl. phone). */
export const authHighlightPanelClass = authFormPanelClass;
