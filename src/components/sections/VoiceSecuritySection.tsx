import { Check, Database, KeyRound, Lock, Mic, Server, ShieldCheck } from "lucide-react";

export function VoiceSecuritySection() {
  return (
    <section className="section-padding bg-transparent pt-0">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-overline mb-4">Control and Trust</p>
          <h2 className="text-headline mb-4">
            Text or Voice.
            <br />
            Always Private.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Everything in your Command Center works naturally through chat and voice, with privacy-first security at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="card-premium opacity-0 animate-fade-in-up hover:shadow-[0_24px_64px_-24px_hsl(var(--foreground)/0.35)] transition-all duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Voice Commands</p>
                <p className="text-xs text-muted-foreground">Use text or voice interchangeably</p>
              </div>
            </div>

            <div className="rounded-xl border border-border dark:border-[hsl(0,0%,22%)] bg-secondary/50 dark:bg-[hsl(0,0%,10%)] p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-[3px] items-end h-8 flex-1">
                  {[3, 5, 8, 4, 7, 10, 6, 9, 3, 5, 7, 4, 8, 5, 3, 6, 9, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-primary/50 rounded-full animate-pulse"
                      style={{ height: `${h * 2.5}px`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">Listening</span>
              </div>

              <div className="bg-card dark:bg-[hsl(0,0%,12%)] rounded-lg p-3 mb-3 border border-border/50 dark:border-[hsl(0,0%,24%)]">
                <p className="text-xs italic text-muted-foreground">
                  "Cancel my 4 PM meeting today and send apologies"
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {["CarPlay", "Android Auto", "Earbuds", "Phone Assistant"].map((label) => (
                  <span key={label} className="px-2 py-1 rounded-full text-[10px] border border-border dark:border-[hsl(0,0%,24%)] bg-card dark:bg-[hsl(0,0%,12%)] text-muted-foreground">
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-lg px-2.5 py-2">
                <span className="text-green-500 text-xs">✓</span>
                <p className="text-xs text-foreground">Meeting cancelled. Apology sent to all attendees.</p>
              </div>
            </div>
          </div>

          <div
            className="card-premium opacity-0 animate-fade-in-up hover:shadow-[0_24px_64px_-24px_hsl(var(--foreground)/0.35)] transition-all duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Security and Privacy</p>
                <p className="text-xs text-muted-foreground">Built for premium confidentiality</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
              {[
                "We do not sell or share your data.",
                "Connections run through secured integrations with controlled permissions.",
                "Your context and workflows stay private and account-scoped.",
                "Monitoring and safeguards are in place for sensitive actions.",
              ].map((line, i) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                </div>
              ))}

              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-card text-[11px] text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  Private by default
                </div>
              </div>
            </div>
          </div>

          <div
            className="card-premium opacity-0 animate-fade-in-up hover:shadow-[0_24px_64px_-24px_hsl(var(--foreground)/0.35)] transition-all duration-300"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Data Ownership</p>
                <p className="text-xs text-muted-foreground">Retention and scope from your dashboard</p>
              </div>
            </div>

            <div className="rounded-xl border border-border dark:border-[hsl(0,0%,22%)] bg-secondary/50 dark:bg-[hsl(0,0%,10%)] p-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-foreground">Auto-delete stored data</span>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">On</span>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Every</p>
                <div className="flex flex-wrap gap-1.5">
                  {["7 days", "15 days", "30 days"].map((label, i) => (
                    <span
                      key={label}
                      className={`px-2.5 py-1 rounded-lg text-[11px] border ${
                        i === 2
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border dark:border-[hsl(0,0%,24%)] bg-card dark:bg-[hsl(0,0%,12%)] text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">Applies to</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-primary bg-primary/10 px-2 py-2 text-left text-[11px] font-medium text-foreground">
                    Professional data
                  </div>
                  <div className="rounded-lg border border-border dark:border-[hsl(0,0%,24%)] bg-card dark:bg-[hsl(0,0%,12%)] px-2 py-2 text-left text-[11px] text-muted-foreground">
                    Personal data
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-border/60 dark:border-[hsl(0,0%,20%)] pt-3">
                <span className="font-medium text-foreground">Disclaimer:</span> Choosing auto-deletion does not reduce what the AI can do for you—it only controls how long copies of your data are retained, on your schedule.
              </p>
            </div>
          </div>

          <div
            className="card-premium opacity-0 animate-fade-in-up hover:shadow-[0_24px_64px_-24px_hsl(var(--foreground)/0.35)] transition-all duration-300"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Credential Relay</p>
                <p className="text-xs text-muted-foreground">
                  Outbound agent traffic passes through a governed proxy so secrets never sit in agent memory.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
              {[
                "Your agent sends its request through the relay — credentials are not embedded in the agent context.",
                "The relay attaches authentication at the proxy layer before the call reaches the destination.",
                "The destination receives an authenticated request while the agent never touches the underlying secret.",
              ].map((line) => (
                <div key={line} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                </div>
              ))}

              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-card text-[11px] text-muted-foreground">
                  <Server className="w-3 h-3" />
                  Proxy-side secrets · zero agent exposure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

