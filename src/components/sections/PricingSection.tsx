"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatUsd(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

type Billing = "monthly" | "annual";

type PlanTier = {
  name: string;
  description: string;
  monthly: number;
  annual: number;
  features: string[];
  cta: string;
};

const ANNUAL_DISCOUNT = 0.2;

const plans: PlanTier[] = [
  {
    name: "Ops.AI Dashboard",
    description: "Full intelligence workspace across HR, Finance, Inventory, Procurement, Marketing, and Sales — unified KPIs and narratives.",
    monthly: 1499,
    annual: Math.round(1499 * 12 * (1 - ANNUAL_DISCOUNT)),
    features: [
      "Everything in Command Center",
      "Six AI dashboard surfaces (HR, Finance, Inventory, Procurement, Marketing, Sales)",
      "Enterprise connector pack and governed data sync",
      "Custom KPI watchlists and variance explanations",
      "Priority support with named response targets",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "P.AI Command Center",
    description: "Secure messaging layer for WhatsApp, Slack, and Telegram — approvals, briefings, and actions where your teams already work.",
    monthly: 499,
    annual: Math.round(499 * 12 * (1 - ANNUAL_DISCOUNT)),
    features: [
      "Multi-channel Command Center",
      "Role-based approvals and escalations",
      "Executive briefings and alerts",
      "Voice and text execution",
      "Standard business-hours support",
    ],
    cta: "Start Free Trial",
  },
];

const API_FIXED_MONTHLY = 5000;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useAnimatedInteger(target: number, durationMs: number) {
  const [value, setValue] = useState(target);
  const displayedRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = displayedRef.current;
    cancelAnimationFrame(rafRef.current);

    if (from === target) {
      setValue(target);
      return;
    }

    let start: number | null = null;
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      displayedRef.current = target;
      setValue(target);
      return;
    }

    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / durationMs);
      const eased = easeOutCubic(t);
      const next = Math.round(from + (target - from) * eased);
      displayedRef.current = next;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        displayedRef.current = target;
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, durationMs]);

  return value;
}

function MainPlanPriceTag({ billing, monthly, annual }: { billing: Billing; monthly: number; annual: number }) {
  const saveYearly = monthly * 12 - annual;
  const effectiveMonthly = Math.round(annual / 12);
  const muted = "text-muted-foreground";
  const strong = "text-foreground";

  const mainTarget = billing === "monthly" ? monthly : annual;
  const countedMain = useAnimatedInteger(mainTarget, 720);

  return (
    <div className="min-h-[5.25rem] flex flex-col justify-start">
      <div className="flex flex-wrap items-baseline gap-1">
        <span className={cn("text-4xl font-semibold tabular-nums tracking-tight", strong)}>${formatUsd(countedMain)}</span>
        <span className={cn("text-sm tabular-nums transition-colors duration-200", muted)}>
          {billing === "monthly" ? "/month" : "/year"}
        </span>
      </div>
      <div
        key={billing}
        className={cn(
          "mt-2 min-h-[3rem] flex items-start will-change-[opacity,transform]",
          "animate-pricing-sub-reveal motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transform-none",
        )}
      >
        {billing === "monthly" ? (
          <p className={cn("text-xs", muted)}>Billed monthly</p>
        ) : (
          <p className={cn("text-sm font-medium leading-snug", strong)}>
            ~${formatUsd(effectiveMonthly)}/month — save ${formatUsd(saveYearly)}/year (20% off)
          </p>
        )}
      </div>
    </div>
  );
}

function BillingToggle({ value, onChange }: { value: Billing; onChange: (v: Billing) => void }) {
  const active =
    "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30 ring-offset-2 ring-offset-background dark:ring-offset-background";
  const inactive = "text-muted-foreground hover:text-foreground hover:bg-background/60 dark:hover:bg-background/10";

  return (
    <div
      className="inline-flex rounded-full border border-border bg-muted/50 p-1 shadow-sm dark:bg-muted/25"
      role="group"
      aria-label="Billing period"
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        aria-pressed={value === "monthly"}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
          value === "monthly" ? active : inactive,
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        aria-pressed={value === "annual"}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
          value === "annual" ? active : inactive,
        )}
      >
        Annual{" "}
        <span className={value === "annual" ? "opacity-95" : "text-primary dark:text-primary"}>(Save 20%)</span>
      </button>
    </div>
  );
}

export function PricingSection() {
  // const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="section-padding bg-secondary/30 dark:bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-overline mb-4">Pricing</p>
          <h2 className="text-headline mb-4">
            Enterprise
            <br />
            Pricing
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card p-10 shadow-sm dark:border-[hsl(0,0%,24%)] dark:bg-[hsl(0,0%,10.5%)]">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-body-lg text-muted-foreground mb-8">
                Custom pricing built for your scale. Schedule a brief strategy session to discuss your specific
                requirements.
              </p>
              <a
                href="https://calendar.app.google/jE68kqsgzNXXH3UY8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200 focus-ring"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*
      ============================================================
      ORIGINAL PRICING CONTENT — commented out for reference
      ============================================================

      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-overline mb-4">Pricing</p>
          <h2 className="text-headline mb-4">
            Transparent
            <br />
            enterprise pricing
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Start with a 7-day free trial. No credit card required. Prices in USD. Annual billing includes 20% savings.
          </p>
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 transition-all duration-300 flex h-full min-h-0 flex-col card-premium hover:shadow-lg"
            >
              <div className="mb-6 shrink-0 pt-2 min-h-[6.75rem] sm:min-h-[7rem] flex flex-col">
                <h3 className="text-2xl font-semibold mb-2 shrink-0">{plan.name}</h3>
                <p className="text-sm leading-relaxed flex-1 max-w-prose text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 shrink-0 pb-6 border-b min-h-[6.75rem] sm:min-h-[7rem] flex flex-col justify-start border-border/50 dark:border-border">
                <MainPlanPriceTag billing={billing} monthly={plan.monthly} annual={plan.annual} />
              </div>

              <ul className="space-y-3 mb-8 min-h-0 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="w-full rounded-full mt-auto h-12 text-base font-medium hover:scale-[1.02] transition-all focus-ring"
                variant="default"
                asChild
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative mb-6 rounded-2xl border border-border bg-card p-10 shadow-sm dark:border-[hsl(0,0%,24%)] dark:bg-[hsl(0,0%,10.5%)] dark:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.75)]">
            <div className="pt-2 text-center max-w-3xl mx-auto">
              <p className="text-overline mb-3 text-primary">Custom solutions</p>
              <h3 className="text-2xl font-semibold mb-2">Add-ons</h3>
              <p className="text-sm text-muted-foreground mb-9">
                Optional services beyond packaged tiers — scoped to your organization.
              </p>

              <ul className="grid gap-4 md:grid-cols-2 text-left">
                <li>
                  <div className="h-full rounded-xl border border-border/70 bg-secondary/20 p-4 dark:border-[hsl(0,0%,26%)] dark:bg-[hsl(0,0%,14%)]">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">Custom integration</p>
                      <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground dark:bg-primary/90 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
                        $499 / one-off
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">For connectors not available in the default integration list.</p>
                  </div>
                </li>
                <li>
                  <div className="h-full rounded-xl border border-border/70 bg-secondary/20 p-4 dark:border-[hsl(0,0%,26%)] dark:bg-[hsl(0,0%,14%)]">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">Custom workflow</p>
                      <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground dark:bg-primary/90 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
                        From $199 / month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">For existing AI modules, based on workflow complexity and scope.</p>
                  </div>
                </li>
                <li>
                  <div className="h-full rounded-xl border border-border/70 bg-secondary/20 p-4 dark:border-[hsl(0,0%,26%)] dark:bg-[hsl(0,0%,14%)]">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">Custom AI project request</p>
                      <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground dark:bg-primary/90 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
                        From $499 / month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Dedicated project design and implementation based on complexity.</p>
                  </div>
                </li>
                <li>
                  <div className="h-full rounded-xl border border-border/70 bg-secondary/20 p-4 dark:border-[hsl(0,0%,26%)] dark:bg-[hsl(0,0%,14%)]">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">Dedicated and priority support</p>
                      <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground dark:bg-primary/90 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]">
                        $599 / month
                      </span>
                    </div>
                    <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                      <li>24/7 response coverage</li>
                      <li>Via WhatsApp, Telegram, or Slack</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="pt-2 text-center max-w-2xl mx-auto">
              <p className="text-overline mb-3 text-primary">API access</p>
              <h3 className="text-2xl font-semibold mb-2">Private API</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Programmatic access for internal systems, data products, and automation — scoped keys, audit logs, and
                enterprise SLAs.
              </p>
              <div className="flex flex-wrap items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">${formatUsd(API_FIXED_MONTHLY)}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="text-sm font-medium text-foreground mt-2">Plus usage-based token charges.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">7-day free trial</span> on Command Center and Dashboard •
            Create your account to scope connectors
          </p>
        </div>
      </div>
      */}
    </section>
  );
}
