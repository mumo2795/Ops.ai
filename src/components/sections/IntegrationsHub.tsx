import hubspot from "thesvg/hubspot";
import jira from "thesvg/jira";
import microsoft from "thesvg/microsoft";
import microsoftOutlook from "thesvg/microsoft-outlook";
import oracle from "thesvg/oracle";
import quickbooks from "thesvg/quickbooks";
import sage from "thesvg/sage";
import salesforce from "thesvg/salesforce";
import slack from "thesvg/slack";
import zendesk from "thesvg/zendesk";
import { OpsAiLogo } from "@/components/OpsAiBranding";
import { ThesvgBrandLogo } from "@/components/integrations/ThesvgBrandLogo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type HubIntegration =
  | { name: string; color: string; icon: { svg: string } }
  | { name: string; color: string; logoPath: string }
  | { name: string; color: string; abbr: string };

/** Official logos via `thesvg` (MIT). Letter tiles only where no official asset is available. */
const integrations: HubIntegration[] = [
  { name: "Oracle NetSuite", color: "#C74634", icon: oracle },
  { name: "Salesforce", color: "#00A1E0", icon: salesforce },
  { name: "HubSpot", color: "#FF7A59", icon: hubspot },
  { name: "Microsoft 365", color: "#6264A7", icon: microsoft },
  { name: "QuickBooks", color: "#2CA01C", icon: quickbooks },
  { name: "Slack", color: "#E01E5A", icon: slack },
  { name: "Outlook", color: "#0078D4", icon: microsoftOutlook },
  { name: "Sage Sales Management", color: "#00DC06", icon: sage },
  { name: "Workable", color: "#286EF1", logoPath: "https://get.workable.com/hubfs/workable-logo-1.png" },
  { name: "Jira", color: "#0052CC", icon: jira },
  { name: "Zendesk", color: "#03363D", icon: zendesk },
];

const positions = Array.from({ length: integrations.length }, (_, index) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / integrations.length;
  const radius = 41.5;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
});

function LogoCard({ integration, position, index }: { integration: HubIntegration; position: { x: number; y: number }; index: number }) {
  return (
    <div
      className="absolute group z-10 hover:z-[80] transition-[z-index] duration-0"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`integration-float integration-float-${index % 4}`}
        style={{
          animationDelay: `${0.7 + index * 0.18}s`,
          animationDuration: `${8.5 + (index % 3) * 1.4}s`,
        }}
      >
        <Tooltip delayDuration={120}>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={integration.name}
              className="w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-1.5 shadow-lg border border-border/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-1 bg-card/90 backdrop-blur-sm focus-ring"
              style={{ boxShadow: `0 4px 20px ${integration.color}18` }}
            >
              {"abbr" in integration ? (
                <span
                  className="text-[11px] sm:text-xs font-bold tabular-nums tracking-tight"
                  style={{ color: integration.color }}
                >
                  {integration.abbr}
                </span>
              ) : "logoPath" in integration ? (
                <img
                  src={integration.logoPath}
                  alt={integration.name}
                  className={cn(
                    "h-8 w-8 object-contain",
                    integration.name === "Workable" && "dark:brightness-0 dark:invert dark:contrast-125",
                  )}
                  loading="lazy"
                />
              ) : (
                <ThesvgBrandLogo
                  icon={integration.icon}
                  label={integration.name}
                  className={cn(integration.name === "Zendesk" && "dark:[&>svg]:brightness-0 dark:[&>svg]:invert dark:[&>svg]:contrast-125")}
                />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={10}
            collisionPadding={20}
            className="z-[400] max-w-[14rem] border-border shadow-lg"
          >
            {integration.name}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

function FloatingDot({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <div
      className="absolute rounded-full bg-foreground/[0.04] animate-pulse"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        animationDuration: "4s",
      }}
    />
  );
}

export function IntegrationsHub() {
  return (
    <section className="section-padding overflow-x-hidden overflow-y-visible relative">
      <div className="absolute inset-0 bg-secondary/40 dark:bg-transparent" />

      <div className="container-main relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-overline mb-4">Enterprise integrations</p>
          <h2 className="text-headline mb-4">
            <span className="text-muted-foreground">Connect the systems</span>
            <br />
            your teams already trust
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Ops.AI reads approved enterprise sources—HRIS, ERP, CRM, procurement, finance, and collaboration—so
            leadership sees one coherent picture.
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto min-h-[460px] h-[460px]">
          <FloatingDot delay={0} x={20} y={30} size={4} />
          <FloatingDot delay={1} x={50} y={15} size={3} />
          <FloatingDot delay={2} x={70} y={50} size={5} />
          <FloatingDot delay={0.5} x={30} y={65} size={3} />
          <FloatingDot delay={1.5} x={60} y={40} size={4} />

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="surge-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {positions.map((pos, i) => (
              <g key={i}>
                <line
                  x1="50"
                  y1="50"
                  x2={pos.x}
                  y2={pos.y}
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="text-foreground"
                  strokeDasharray="1 2"
                >
                  <animate attributeName="stroke-dashoffset" values="0;-3" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                </line>

                <path
                  d={`M50 50 L${pos.x} ${pos.y}`}
                  stroke="url(#surge-gradient)"
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#surge-glow)"
                  strokeDasharray="5 120"
                  strokeDashoffset="130"
                  opacity="0.95"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="130;0;-20"
                    dur={`${1.5 + i * 0.12}s`}
                    begin={`${i * 0.18}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0.8;0"
                    dur={`${1.5 + i * 0.12}s`}
                    begin={`${i * 0.18}s`}
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            ))}
            <defs>
              <linearGradient id="surge-gradient" x1="50%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.95" />
                <stop offset="60%" stopColor="hsl(var(--gold))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-foreground/[0.02] blur-2xl" />
              <div className="absolute -inset-10 rounded-3xl bg-gold/20 blur-3xl animate-pulse" />
              <div className="relative bg-card border border-border/50 rounded-2xl px-8 py-5 sm:px-10 sm:py-5 shadow-2xl">
                <OpsAiLogo size="lg" showWordmark={false} />
              </div>
            </div>
          </div>

          {integrations.map((integration, i) => (
            <LogoCard key={integration.name} integration={integration} position={positions[i]} index={i} />
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8 mb-16 max-w-xl mx-auto">
          305+ integrations and more coming soon
        </p>

      </div>
    </section>
  );
}

