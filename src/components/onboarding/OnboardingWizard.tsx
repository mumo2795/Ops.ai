"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  Check,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Slack,
  Sparkles,
} from "lucide-react";
import { WorkspaceIntegrationLogo } from "@/components/integrations/WorkspaceIntegrationLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { AmbientBackdrop } from "@/components/layout/AmbientBackdrop";
import { OpsAiLogo } from "@/components/OpsAiBranding";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WORKSPACE_INTEGRATIONS, type WorkspaceIntegrationId } from "@/lib/workspace-integrations";
import { cn } from "@/lib/utils";

type VerifyChannel = "email" | "phone";

const RESEND_SECONDS = 45;

const STEP_LABELS = ["Verify", "Connect", "Activate"] as const;

function StepDots({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-3 items-center gap-2 px-4" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex justify-center">
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                n === step ? "w-8 bg-primary" : n < step ? "w-2 bg-primary/50" : "w-2 bg-muted-foreground/25",
              )}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 px-2 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={cn(i + 1 === step && "text-primary", i + 1 < step && "text-primary/70")}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [channel, setChannel] = useState<VerifyChannel>("email");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [sending, setSending] = useState(false);

  const [wanted, setWanted] = useState<Set<WorkspaceIntegrationId>>(() => new Set());
  const [connected, setConnected] = useState<Set<WorkspaceIntegrationId>>(() => new Set());
  const [connectingId, setConnectingId] = useState<WorkspaceIntegrationId | null>(null);

  const [whatsappBusy, setWhatsappBusy] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setInterval(() => setCooldown((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [cooldown]);

  const sendCode = useCallback(() => {
    if (cooldown > 0) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setCodeSent(true);
      setCooldown(RESEND_SECONDS);
      toast.success(`Verification code sent to your ${channel === "email" ? "email" : "phone"}.`);
    }, 600);
  }, [channel, cooldown]);

  const verifyOtp = () => {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit code.");
      return;
    }
    setVerified(true);
    toast.success("Verified successfully.");
  };

  const toggleWant = (id: WorkspaceIntegrationId, checked: boolean) => {
    setWanted((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
    if (!checked) {
      setConnected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const connectOne = (id: WorkspaceIntegrationId) => {
    setConnectingId(id);
    window.setTimeout(() => {
      setConnectingId(null);
      setConnected((prev) => new Set(prev).add(id));
      toast.success(`${WORKSPACE_INTEGRATIONS.find((i) => i.id === id)?.name ?? "Integration"} connected.`);
    }, 900);
  };

  const activateWhatsApp = () => {
    setWhatsappBusy(true);
    window.setTimeout(() => {
      setWhatsappBusy(false);
      toast.success("WhatsApp command center is active.");
      router.push("/dashboard");
    }, 800);
  };

  const canContinueStep1 = verified;
  const wantedList = useMemo(() => WORKSPACE_INTEGRATIONS.filter((i) => wanted.has(i.id)), [wanted]);

  const destinationLabel =
    channel === "email" ? "your sign-in email address" : "the phone number on your account";

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-background text-foreground">
      <AmbientBackdrop />

      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/10 dark:border-zinc-800/90">
        <div className="container-main flex items-center justify-between gap-4 py-3.5">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80 focus-ring rounded-md"
          >
            <OpsAiLogo size="sm" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" className="hidden text-muted-foreground sm:inline-flex" asChild>
              <Link href="/dashboard">Skip for now</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-4 pb-24 pt-24 sm:pb-28 sm:pt-28">
        <div className="mb-8 text-center sm:mb-10">
          <Badge variant="secondary" className="mb-4 font-normal">
            Workspace setup · Step {step} of 3
          </Badge>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
            Welcome — let&apos;s finish setup
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            Verify how we reach you, optionally connect the tools you already use, then turn on your WhatsApp command
            center. You can change any of this later from the dashboard.
          </p>
          <div className="mt-8">
            <StepDots step={step} />
          </div>
        </div>

        {step === 1 ? (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Verify your contact</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Choose email or phone for your one-time code. After you send a code, enter the six digits you receive
                  to continue.
                </p>
              </div>
            </div>

            <RadioGroup
              value={channel}
              onValueChange={(v) => {
                setChannel(v as VerifyChannel);
                setCodeSent(false);
                setOtp("");
                setVerified(false);
                setCooldown(0);
              }}
              className="grid gap-3 sm:grid-cols-2"
            >
              <label
                htmlFor="verify-email"
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
                  channel === "email" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/40",
                )}
              >
                <RadioGroupItem value="email" id="verify-email" className="mt-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                    Email
                  </div>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">One-time code to {destinationLabel}.</p>
                </div>
              </label>
              <label
                htmlFor="verify-phone"
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
                  channel === "phone" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/40",
                )}
              >
                <RadioGroupItem value="phone" id="verify-phone" className="mt-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                    Phone
                  </div>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">SMS or app-based code to your saved number.</p>
                </div>
              </label>
            </RadioGroup>

            <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground sm:text-sm">
              Code will be sent to{" "}
              <span className="font-medium text-foreground">
                {channel === "email" ? "you@company.com" : "+1 ··· ··· 4242"}
              </span>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" onClick={sendCode} disabled={sending || cooldown > 0} className="rounded-full">
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : codeSent ? (
                    "Resend code"
                  ) : (
                    "Send verification code"
                  )}
                </Button>
                {cooldown > 0 ? (
                  <span className="text-xs text-muted-foreground">Resend available in {cooldown}s</span>
                ) : null}
              </div>

              {codeSent ? (
                <div className="space-y-4 rounded-2xl border border-border bg-muted/25 p-4">
                  <Label className="text-sm font-medium">Enter 6-digit code</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-1.5">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="flex flex-wrap gap-3">
                    <Button type="button" variant="secondary" className="rounded-full" onClick={verifyOtp}>
                      Verify code
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-muted-foreground"
                      onClick={sendCode}
                      disabled={cooldown > 0 || sending}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Resend
                    </Button>
                  </div>
                  {verified ? (
                    <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      <Check className="h-4 w-4 shrink-0" />
                      Verified — you can continue to integrations.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" size="sm" className="text-muted-foreground sm:hidden" asChild>
                <Link href="/dashboard">Skip setup</Link>
              </Button>
              <Button
                type="button"
                className="rounded-full gap-2 sm:ml-auto"
                disabled={!canContinueStep1}
                onClick={() => setStep(2)}
              >
                Continue to integrations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Connect integrations</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Click a card to include an integration, then use Connect to authorize it. You can skip this entirely
                  and add services anytime under{" "}
                  <span className="font-medium text-foreground">Dashboard → Integrations</span>.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {WORKSPACE_INTEGRATIONS.map((item) => {
                const isWanted = wanted.has(item.id);
                const isConnected = connected.has(item.id);
                const busy = connectingId === item.id;
                return (
                  <li
                    key={item.id}
                    className={cn(
                      "flex flex-col gap-3 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5",
                      isWanted
                        ? "border-primary/50 bg-primary/[0.07] shadow-sm dark:border-primary/45 dark:bg-primary/10"
                        : "border-border bg-muted/20 hover:bg-muted/30 dark:hover:bg-muted/25",
                    )}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      className="flex min-w-0 flex-1 cursor-pointer flex-col gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-center sm:gap-4"
                      onClick={() => toggleWant(item.id, !isWanted)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleWant(item.id, !isWanted);
                        }
                      }}
                      aria-pressed={isWanted}
                      aria-label={`${item.name}. ${isWanted ? "Selected for workspace" : "Not selected"}. Activate to toggle.`}
                    >
                      <WorkspaceIntegrationLogo name={item.name} logo={item.logo} hubSlackSvg={item.hubSlackSvg} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-foreground">{item.name}</p>
                          {isConnected ? (
                            <Badge
                              className={cn(
                                "gap-1 border-transparent font-normal shadow-none transition-colors",
                                "bg-emerald-600 text-white hover:bg-emerald-700",
                                "dark:bg-emerald-700 dark:text-white dark:hover:bg-emerald-600",
                              )}
                            >
                              <Check className="h-3 w-3 shrink-0" aria-hidden />
                              Connected
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{item.blurb}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {isWanted ? "Selected — tap Connect to authorize." : "Click this card to select."}
                        </p>
                      </div>
                    </div>
                    {isWanted && !isConnected ? (
                      <Button
                        type="button"
                        size="sm"
                        className="shrink-0 self-end rounded-full sm:self-center"
                        disabled={busy}
                        onClick={(e) => {
                          e.stopPropagation();
                          connectOne(item.id);
                        }}
                      >
                        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
                      </Button>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
              {wantedList.length === 0
                ? "Nothing selected — you can connect tools later from the dashboard."
                : `${wantedList.length} selected · ${connected.size} of ${wantedList.length} connected`}
            </p>

            <Separator className="my-6" />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="rounded-full gap-2" onClick={() => setStep(3)}>
                Continue to command center
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Activate command centers</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  WhatsApp is ready for your private command channel. Additional surfaces are in development and will
                  appear here as they become available.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col rounded-2xl border border-primary/25 bg-primary/5 p-5 shadow-sm sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">WhatsApp</span>
                  <Badge>Available</Badge>
                </div>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Message Ops.AI like a trusted chief of staff: calendar, inbox, briefings, and secure actions from one
                  thread.
                </p>
                <Button type="button" className="mt-auto w-full rounded-full" disabled={whatsappBusy} onClick={activateWhatsApp}>
                  {whatsappBusy ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Activating…
                    </>
                  ) : (
                    "Activate WhatsApp"
                  )}
                </Button>
              </div>

              {(
                [
                  { name: "Slack", icon: Slack },
                  { name: "Telegram", icon: Send },
                  { name: "Microsoft Teams", icon: Building2 },
                ] as const
              ).map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col rounded-2xl border border-dashed border-border bg-muted/15 p-5 opacity-95 sm:p-6"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {name}
                    </span>
                    <Badge variant="secondary">Coming soon</Badge>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    Same command experience, adapted to {name}. We will notify you when this channel is ready for your
                    workspace.
                  </p>
                  <Button type="button" variant="outline" className="mt-5 w-full rounded-full" disabled>
                    Unavailable
                  </Button>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setStep(2)}>
                Back
              </Button>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button type="button" variant="secondary" className="rounded-full" asChild>
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
