"use client";

import Link from "next/link";
import { OpsAiLogo } from "@/components/OpsAiBranding";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Override default `max-w-[440px]` (e.g. signup needs more room for phone country row). */
  contentMaxWidthClassName?: string;
};

export function AuthShell({ title, subtitle, children, footer, contentMaxWidthClassName }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
      >
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-muted blur-3xl" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/10 dark:border-zinc-800/90">
        <div className="container-main flex items-center justify-between py-3.5 sm:py-4">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity focus-ring rounded-md"
          >
            <OpsAiLogo size="sm" />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-20 sm:pt-24">
        <div
          className={cn(
            "w-full opacity-0 animate-fade-in-up",
            contentMaxWidthClassName ?? "max-w-[440px]",
          )}
          style={{ animationFillMode: "forwards" }}
        >
          <div
            className={cn(
              "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm",
              "text-card-foreground dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.65)]",
            )}
          >
            <div className="mb-5 space-y-1.5">
              <h1 className="text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-foreground">{title}</h1>
              {subtitle ? <p className="text-sm text-muted-foreground leading-relaxed">{subtitle}</p> : null}
            </div>
            {children}
          </div>
          {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </div>
    </main>
  );
}
