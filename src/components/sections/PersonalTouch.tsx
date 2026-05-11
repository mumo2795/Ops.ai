import { Sparkles, Heart, Clock, Brain, Shield, Eye } from "lucide-react";

const pillars = [
  {
    icon: Eye,
    accent: "from-blue-500/20 to-cyan-500/20",
    accentBorder: "border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400",
    title: "Contextual Awareness",
    subtitle: "Understands your business context without being told.",
    chat: [
      { role: "user" as const, text: "We're expanding to the Southeast Asia market." },
      { role: "ai" as const, text: "I've prepared a market entry analysis — local regulations, competitor landscape, and recommended partners in Malaysia, Thailand, and Singapore. Ready to review? 🌏" },
    ],
    badge: "Business intelligence that understands your industry.",
  },
  {
    icon: Heart,
    accent: "from-rose-500/20 to-pink-500/20",
    accentBorder: "border-rose-500/20",
    iconBg: "bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400",
    title: "Deeply Integrated",
    subtitle: "Remembers your workflows so you don't have to.",
    chat: [
      { role: "user" as const, text: "Set up the monthly financial close process." },
      { role: "ai" as const, text: "I've configured the close workflow — accounts reconciliation automated, approval chains set, and compliance checks enabled. First close runs on the 28th. 📊" },
    ],
    badge: "Workflows, preferences, and context — all remembered.",
  },
  {
    icon: Clock,
    accent: "from-amber-500/20 to-orange-500/20",
    accentBorder: "border-amber-500/20",
    iconBg: "bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400",
    title: "Always On Autopilot",
    subtitle: "Runs operations in the background so you stay ahead.",
    chat: [
      { role: "user" as const, text: "Give me the weekly operations brief." },
      { role: "ai" as const, text: "Here's your weekly brief:\n📈 Revenue: +12% vs last week\n👥 Team: 3 open positions, 2 interviews scheduled\n⚠️ Inventory: SKU-4421 running low (5 days)\n✅ All compliance checks passed" },
    ],
    badge: "Set it once. Ops.AI handles the rest.",
  },
];

function ChatBubble({ role, text, delay }: { role: "user" | "ai"; text: string; delay: number }) {
  if (role === "user") {
    return (
      <div
        className="flex justify-end opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="max-w-[75%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex justify-start opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay + 0.25}s` }}
    >
      <div className="max-w-[85%] bg-secondary dark:bg-[hsl(0,0%,14%)] border border-border/50 dark:border-[hsl(0,0%,20%)] rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{text}</p>
      </div>
    </div>
  );
}

export function PersonalTouch() {
  return (
    <section className="section-padding relative overflow-hidden bg-transparent">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="container-main relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary dark:bg-secondary/50 border border-border/50 mb-6">
            <Brain className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Adaptive Intelligence</span>
          </div>
          <h2 className="text-headline mb-4">
            Built Around
            <br />
            <span className="gradient-text">Who You Are</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-lg mx-auto">
            Ops.AI learns your business operations, workflows, and preferences — becoming more valuable every day while keeping your data completely secure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group relative bg-card dark:bg-[hsl(0,0%,6%)] border border-border/60 dark:border-[hsl(0,0%,15%)] rounded-2xl overflow-hidden transition-all duration-500 hover:border-foreground/15 hover:shadow-xl dark:hover:border-[hsl(0,0%,22%)] opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Top gradient accent */}
              <div className={`h-1 w-full bg-gradient-to-r ${pillar.accent}`} />

              <div className="p-6">
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl ${pillar.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{pillar.subtitle}</p>
                  </div>
                </div>

                {/* Chat illustration */}
                <div className="mt-5 rounded-xl bg-secondary/40 dark:bg-[hsl(0,0%,10%)] border border-border/30 dark:border-[hsl(0,0%,18%)] p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/20">
                    <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-primary">Ops.AI</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">Chat with Ops.AI</span>
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  {pillar.chat.map((msg, mi) => (
                    <ChatBubble key={mi} role={msg.role} text={msg.text} delay={i * 0.2 + mi * 0.15} />
                  ))}
                </div>

                {/* Badge */}
                <div className="mt-4 flex items-center gap-2">
                  <Shield className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                  <p className="text-[11px] text-muted-foreground/70">{pillar.badge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}