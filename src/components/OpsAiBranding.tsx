import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

const markSize: Record<LogoSize, string> = {
  sm: "h-8 w-8 text-sm",
  md: "h-9 w-9 text-base",
  lg: "h-10 w-10 text-lg",
  xl: "h-12 w-12 text-xl",
};

const wordSize: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl sm:text-4xl",
};

/** Logo mark + optional Ops.AI wordmark for nav, footer, and hub center. */
export function OpsAiLogo({
  size = "md",
  className,
  showWordmark = true,
}: {
  size?: LogoSize;
  className?: string;
  /** When false, only the circular mark is shown (e.g. compact nav, integrations hub). */
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "shrink-0 rounded-xl bg-primary font-bold tracking-tight text-primary-foreground shadow-md ring-1 ring-primary/20 flex items-center justify-center",
          markSize[size],
        )}
        aria-hidden
      >
        O
      </span>
      {showWordmark ? (
        <span className={cn("font-semibold tracking-tight text-foreground", wordSize[size])}>
          Ops<span className="text-primary">.AI</span>
        </span>
      ) : null}
    </span>
  );
}

/** Compact wordmark only (chat headers, small UI). */
export function OpsAiWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold tracking-tight text-foreground", className)}>
      Ops<span className="text-primary">.AI</span>
    </span>
  );
}
