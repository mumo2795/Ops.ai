"use client";

import {
  AlertTriangle,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Megaphone,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dashboards = [
  {
    id: "hr",
    title: "AI HR Dashboard",
    description: "Talent pipeline, retention risk, payroll signals, and manager actions in one board-ready surface.",
    icon: Users,
    accent: "from-violet-500/25 via-fuchsia-500/20 to-transparent",
    metrics: [
      { label: "Open roles", value: "12" },
      { label: "Time-to-hire", value: "24d" },
      { label: "Attrition risk", value: "6.8%" },
      { label: "Payroll variance", value: "-1.2%" },
    ],
    capabilities: [
      "Role-level hiring forecasts by department and location",
      "Early-warning flags from attendance, overtime, and engagement",
      "Auto-generated action plans for HRBPs and line managers",
      "Compensation and promotion equity views with audit-friendly drill-down to source systems",
    ],
    workflows: [
      "Attendance trigger: if a team member is absent twice this week, notify manager and HR automatically.",
      "Leave conflict check: when leave is requested, flag overlap with critical shifts before approval.",
      "Payroll anomaly check: if overtime exceeds set limits, request manager confirmation before payroll closes.",
    ],
    actions: ["Trigger retention playbook", "Send hiring bottleneck digest", "Escalate payroll anomalies"],
    dataSources: ["HRIS", "ATS", "Payroll", "Engagement surveys"],
    insight:
      "Attrition risk is elevated in Product and Support relative to peer functions; time-to-hire in both groups exceeds the enterprise average of 24 days. Prioritizing vacancies in these organizations is advised to stabilize workload prior to authorizing incremental headcount elsewhere.",
    status: "Action ready",
  },
  {
    id: "finance",
    title: "AI Finance Dashboard",
    description: "Cash visibility, close readiness, margin movement, and variance narratives without spreadsheet lag.",
    icon: CreditCard,
    accent: "from-emerald-500/25 via-teal-500/20 to-transparent",
    metrics: [
      { label: "Runway", value: "14.2 mo" },
      { label: "EBITDA vs plan", value: "+2.1%" },
      { label: "DSO", value: "41d" },
      { label: "Close readiness", value: "93%" },
    ],
    capabilities: [
      "AI-generated variance commentary tied to your chart of accounts",
      "Collections and payables risk scored by counterparty",
      "Board packet narrative draft with source-linked assumptions",
      "Liquidity and covenant monitoring with forward-looking cash and runway scenarios",
    ],
    workflows: [
      "Invoice overdue trigger: when an invoice passes due date, send reminder and alert account owner.",
      "Budget overrun alert: if department spend crosses monthly budget, notify finance lead instantly.",
      "Month-end checklist follow-up: remind owners of incomplete close tasks every day until done.",
    ],
    actions: ["Prioritize receivables outreach", "Lock month-end checklist", "Publish board narrative draft"],
    dataSources: ["ERP / GL", "AP/AR", "Treasury", "FP&A models"],
    insight:
      "The increase in days sales outstanding (DSO) is driven primarily by a concentrated set of large enterprise receivables that remain within contractual terms but outside target payment cadence. Targeted collection activity against those counterparties is expected to improve cash conversion more materially than broad outreach on low-balance accounts.",
    status: "Healthy",
  },
  {
    id: "inventory",
    title: "AI Inventory Dashboard",
    description: "SKU velocity, stockout risk, and replenishment recommendations across warehouses and channels.",
    icon: Boxes,
    accent: "from-amber-500/25 via-orange-500/20 to-transparent",
    metrics: [
      { label: "Fill rate", value: "97.4%" },
      { label: "DOH", value: "41" },
      { label: "Stockout risk SKUs", value: "18" },
      { label: "Excess stock", value: "$184k" },
    ],
    capabilities: [
      "Demand sensing with channel-level seasonality adjustments",
      "Smart reorder points using supplier lead-time reliability",
      "Aging inventory decomposition by margin and carrying cost",
      "Multi-echelon replenishment and transfer recommendations across warehouse and channel lanes",
    ],
    workflows: [
      "Low stock trigger: when SKU stock drops below threshold, create reorder task for purchasing.",
      "Slow-moving stock alert: flag items with no sales for 30 days for promo or transfer review.",
      "Supplier delay alert: if inbound shipment is late, notify operations and suggest backup stock transfer.",
    ],
    actions: ["Approve cross-warehouse transfer", "Trigger replenishment batch", "Flag dead-stock liquidation"],
    dataSources: ["WMS", "Order management", "Supplier feeds", "Demand forecasts"],
    insight:
      "Regional demand in the West is tracking above plan, with multiple high-velocity SKUs approaching minimum stock thresholds. Inter-facility transfer of surplus inventory from the East network is projected to mitigate stockout exposure and limit reliance on expedited freight.",
    status: "Watchlist",
  },
  {
    id: "procurement",
    title: "AI Operation Dashboard",
    description: "Spend governance, contract exposure, and vendor reliability mapped to category owners.",
    icon: ShoppingCart,
    accent: "from-sky-500/25 via-blue-500/20 to-transparent",
    metrics: [
      { label: "Maverick spend", value: "4.2%" },
      { label: "Renewals (90d)", value: "8" },
      { label: "On-contract spend", value: "88%" },
      { label: "Supplier risk", value: "Low" },
    ],
    capabilities: [
      "Contract renewal alerts with owner, value, and fallback options",
      "Category benchmarking against historical and market baselines",
      "AI-suggested negotiation levers from prior deal outcomes",
      "Spend anomaly detection with routed workflows to category and procurement owners",
    ],
    workflows: [
      "Renewal reminder: alert owner 60 days before contract expiry and open renewal task.",
      "Off-contract purchase alert: flag non-approved vendor spend for procurement review.",
      "Price change check: when supplier price increases above threshold, request approval before PO release.",
    ],
    actions: ["Open renewal taskflow", "Recommend alternate supplier", "Prepare negotiation brief"],
    dataSources: ["P2P", "Contract repository", "Supplier scorecards", "Invoice stream"],
    insight:
      "Maverick spend is concentrated in recurring, non-catalog purchases within established spend categories. Compliance routing through existing negotiated agreements is recommended as the primary lever prior to initiating new supplier negotiations.",
    status: "Savings opportunity",
  },
  {
    id: "marketing",
    title: "AI Marketing Dashboard",
    description: "Funnel quality, campaign ROI, CAC trend, and budget reallocation signals in real time.",
    icon: Megaphone,
    accent: "from-rose-500/25 via-pink-500/20 to-transparent",
    metrics: [
      { label: "MQL -> SQL", value: "38%" },
      { label: "CAC trend", value: "down 6%" },
      { label: "Pipeline influence", value: "$2.8M" },
      { label: "Spend efficiency", value: "1.31x" },
    ],
    capabilities: [
      "Channel-level incrementality and saturation diagnostics",
      "Creative performance decomposition by persona and region",
      "Budget reshuffle simulation before spend is committed",
      "Funnel-stage diagnostics with cohort benchmarks and lead-quality scoring for sales alignment",
    ],
    workflows: [
      "High CAC trigger: when campaign CAC exceeds target, alert marketer and suggest budget cut.",
      "Low conversion alert: if landing page conversion drops week-over-week, notify growth team.",
      "Lead handoff workflow: when lead reaches score threshold, push to sales and assign owner.",
    ],
    actions: ["Rebalance paid media budget", "Pause low-efficiency campaigns", "Notify growth leads of shifts"],
    dataSources: ["CRM", "Ad platforms", "Web analytics", "Attribution model"],
    insight:
      "Paid search continues to deliver inbound volume; cost per SQL has increased relative to recent periods. Partner-hosted webinar programs exhibit more stable conversion efficiency; incremental reallocation of budget toward that channel is indicated to improve pipeline quality while preserving baseline demand generation.",
    status: "Optimization recommended",
  },
  {
    id: "sales",
    title: "AI Sales Dashboard",
    description: "Forecast confidence, pipeline health, rep productivity, and deal execution risks in one control room.",
    icon: TrendingUp,
    accent: "from-indigo-500/25 via-blue-500/20 to-transparent",
    metrics: [
      { label: "QTD vs quota", value: "106%" },
      { label: "Weighted pipe", value: "$4.2M" },
      { label: "Forecast confidence", value: "91%" },
      { label: "Deal slippage", value: "8%" },
    ],
    capabilities: [
      "Deal risk scoring from activity, stage age, and stakeholder mapping",
      "Rep-level coaching cues based on win/loss patterns",
      "Scenario forecasting by segment, region, and product mix",
      "Pipeline hygiene scoring with stale-stage detection and forecast-committee-ready summaries",
    ],
    workflows: [
      "Stalled deal alert: if no activity on a deal for 7 days, notify rep and manager.",
      "Follow-up reminder: after client meeting, auto-create next-step task with due date.",
      "Forecast cleanup: flag opportunities with outdated close dates for rep update before forecast call.",
    ],
    actions: ["Escalate at-risk enterprise deals", "Generate rep coaching notes", "Push forecast scenario update"],
    dataSources: ["CRM", "Call intelligence", "CPQ", "Pipeline history"],
    insight:
      "Forecast risk is concentrated in enterprise opportunities currently in legal or security review, with no material ownership update recorded within the past seven days. Executive sponsorship and a structured weekly governance checkpoint are recommended to accelerate stage progression and reduce slippage exposure.",
    status: "Needs attention",
  },
] as const;

const hrTrend = [
  { name: "Mon", attendance: 95, absenteeism: 4.2 },
  { name: "Tue", attendance: 96, absenteeism: 3.8 },
  { name: "Wed", attendance: 94, absenteeism: 4.9 },
  { name: "Thu", attendance: 97, absenteeism: 3.3 },
  { name: "Fri", attendance: 93, absenteeism: 5.4 },
];

const financeTrend = [
  { name: "W1", netCash: 210, opex: 172 },
  { name: "W2", netCash: 228, opex: 176 },
  { name: "W3", netCash: 236, opex: 181 },
  { name: "W4", netCash: 249, opex: 184 },
  { name: "W5", netCash: 258, opex: 189 },
];

const inventoryTrend = [
  { name: "SKU-A", coverage: 46, reorderPoint: 32 },
  { name: "SKU-B", coverage: 39, reorderPoint: 30 },
  { name: "SKU-C", coverage: 33, reorderPoint: 28 },
  { name: "SKU-D", coverage: 41, reorderPoint: 31 },
  { name: "SKU-E", coverage: 37, reorderPoint: 29 },
];

const procurementMix = [
  { name: "On-contract", value: 64, fill: "hsl(var(--primary))" },
  { name: "Maverick", value: 14, fill: "hsl(var(--muted-foreground))" },
  { name: "Renewal due", value: 22, fill: "hsl(35 92% 50%)" },
];

const marketingTrend = [
  { name: "Week 1", mql: 162, conversionRate: 6.2 },
  { name: "Week 2", mql: 178, conversionRate: 6.8 },
  { name: "Week 3", mql: 191, conversionRate: 7.1 },
  { name: "Week 4", mql: 207, conversionRate: 7.6 },
];

const salesTrend = [
  { name: "Q1", commit: 3.8, closedWon: 3.9 },
  { name: "Q2", commit: 4.1, closedWon: 4.0 },
  { name: "Q3", commit: 4.3, closedWon: 4.5 },
  { name: "Q4", commit: 4.7, closedWon: 4.9 },
];

function MiniChart({ dashboardId }: { dashboardId: (typeof dashboards)[number]["id"] }) {
  const axis = "hsl(var(--muted-foreground))";
  const grid = "hsl(var(--border))";
  const stroke = "hsl(var(--primary))";

  if (dashboardId === "hr") {
    return (
      <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hrTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis dataKey="name" stroke={axis} tick={{ fontSize: 10 }} />
            <YAxis stroke={axis} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke={stroke} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="absenteeism" stroke="hsl(35 92% 50%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (dashboardId === "finance") {
    return (
      <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={financeTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis dataKey="name" stroke={axis} tick={{ fontSize: 10 }} />
            <YAxis stroke={axis} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area type="monotone" dataKey="netCash" stroke={stroke} fill={stroke} fillOpacity={0.2} />
            <Line type="monotone" dataKey="opex" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (dashboardId === "procurement") {
    return (
      <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={procurementMix} dataKey="value" nameKey="name" innerRadius={44} outerRadius={66} paddingAngle={2} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (dashboardId === "marketing") {
    return (
      <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={marketingTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis dataKey="name" stroke={axis} tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" stroke={axis} tick={{ fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" stroke={axis} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="mql" stroke={stroke} strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (dashboardId === "sales") {
    return (
      <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis dataKey="name" stroke={axis} tick={{ fontSize: 10 }} />
            <YAxis stroke={axis} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="commit" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="closedWon" fill={stroke} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="mt-4 h-44 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-2.5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={inventoryTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} />
          <XAxis dataKey="name" stroke={axis} tick={{ fontSize: 10 }} />
          <YAxis stroke={axis} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area type="monotone" dataKey="coverage" stroke={stroke} fill={stroke} fillOpacity={0.2} />
          <Line type="monotone" dataKey="reorderPoint" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DashboardExamplesSection() {
  return (
    <section id="ai-dashboards" className="section-padding bg-secondary/25 dark:bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-overline mb-4">Role-based intelligence</p>
          <h2 className="text-headline mb-4">
            AI dashboards
            <br />
            <span className="text-muted-foreground">with operational depth for every function</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Each dashboard is built for executives and operators: key metrics, root-cause context, and prioritized
            actions with source-connected evidence.
          </p>
        </div>

        <div className="space-y-6 max-w-6xl mx-auto">
          {dashboards.map((d, i) => (
            <article
              key={d.id}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card dark:bg-[hsl(0,0%,10%)] dark:border-[hsl(0,0%,24%)] shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl dark:hover:border-primary/40 dark:hover:shadow-[0_18px_36px_-24px_hsl(var(--primary)/0.35)] opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "forwards" }}
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${d.accent} transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent dark:from-primary/[0.06]" />
              <div className="p-6 md:p-7">
                <div className="mb-5 flex flex-col items-center text-center">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/30 text-foreground transition-transform duration-300 group-hover:scale-105 dark:border-[hsl(0,0%,28%)] dark:bg-[hsl(0,0%,14%)]">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight leading-tight">{d.title}</h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                </div>

                <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 md:gap-7 items-start">
                  <div>

                    <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
                      {d.capabilities.map((cap) => (
                        <div
                          key={cap}
                          className="rounded-lg border border-border/60 dark:border-[hsl(0,0%,25%)] bg-secondary/25 dark:bg-[hsl(0,0%,13%)] px-3 py-2.5 text-xs text-muted-foreground dark:text-[hsl(0,0%,80%)] leading-relaxed transition-colors duration-200 group-hover:bg-secondary/35 dark:group-hover:bg-[hsl(0,0%,16%)]"
                        >
                          <CheckCircle2 className="inline w-3.5 h-3.5 mr-1.5 text-primary" />
                          {cap}
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5 mb-4 sm:items-stretch">
                      <div className="rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-3.5 transition-colors duration-200 group-hover:bg-card dark:group-hover:bg-[hsl(0,0%,15%)] sm:row-span-2 flex flex-col">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2">Automations</p>
                        <ul className="space-y-1.5 flex-1">
                          {d.actions.map((action) => (
                            <li key={action} className="text-xs text-foreground/85 dark:text-[hsl(0,0%,82%)]">
                              - {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-gradient-to-b from-primary/[0.08] to-card/90 dark:from-primary/[0.12] dark:to-[hsl(0,0%,13%)] p-4 transition-colors duration-200 group-hover:from-primary/[0.1] dark:group-hover:to-[hsl(0,0%,15%)] ring-1 ring-primary/15">
                        <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-2">AI insight</p>
                        <p className="text-xs sm:text-sm text-foreground/95 dark:text-foreground/90 leading-relaxed text-justify">
                          {d.insight}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] p-3.5 transition-colors duration-200 group-hover:bg-card dark:group-hover:bg-[hsl(0,0%,15%)]">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-2">Connected signals</p>
                        <div className="flex flex-wrap gap-1.5">
                          {d.dataSources.map((source) => (
                            <span
                              key={source}
                              className="rounded-md border border-border/60 dark:border-[hsl(0,0%,26%)] bg-secondary/30 dark:bg-[hsl(0,0%,17%)] px-2 py-1 text-[11px] text-muted-foreground dark:text-[hsl(0,0%,78%)]"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="self-start">
                    <div className="grid grid-cols-2 gap-2.5">
                      {d.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-border/70 dark:border-[hsl(0,0%,25%)] bg-secondary/30 dark:bg-[hsl(0,0%,14%)] px-3 py-2.5 transition-colors duration-200 group-hover:bg-secondary/40 dark:group-hover:bg-[hsl(0,0%,16%)]"
                        >
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{m.label}</p>
                          <p className="text-xl font-semibold tabular-nums tracking-tight mt-1">{m.value}</p>
                        </div>
                      ))}
                    </div>

                    <MiniChart dashboardId={d.id} />

                    <div className="mt-4 rounded-xl border border-border/60 dark:border-[hsl(0,0%,25%)] bg-card/80 dark:bg-[hsl(0,0%,13%)] px-3.5 py-2.5 flex items-center gap-2 transition-colors duration-200 group-hover:bg-card dark:group-hover:bg-[hsl(0,0%,15%)]">
                      {d.status === "Needs attention" || d.status === "Watchlist" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                      )}
                      <p className="text-xs text-muted-foreground">
                        Current status: <span className="font-semibold text-foreground">{d.status}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border-2 border-primary/45 bg-primary/[0.06] p-5 shadow-md shadow-primary/10 ring-1 ring-primary/20 transition-colors duration-200 group-hover:border-primary/55 group-hover:bg-primary/[0.08] dark:border-primary/50 dark:bg-primary/[0.1] dark:group-hover:bg-primary/[0.12]">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Workflows</p>
                  <ul className="space-y-3">
                    {d.workflows.map((workflow) => (
                      <li key={workflow} className="text-base leading-relaxed font-medium text-foreground/95 dark:text-[hsl(0,0%,90%)]">
                        - {workflow}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xl font-bold text-foreground max-w-4xl mx-auto pt-10 pb-2 leading-relaxed">
          The moment it&apos;s integrated, O will recommend workflow from your company data and industry norm for you
          to simply select and run them asap from our library of 1000+ workflows.
        </p>

        <div className="flex flex-col items-center gap-4 pb-2 pt-6 -mb-8">
          <div className="w-px h-16 bg-gradient-to-b from-border to-transparent" />
          <p className="text-sm text-muted-foreground font-medium bg-card/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-border/60 shadow-sm">
            Command Center sits on top of this data fabric
          </p>
          <div className="flex flex-col items-center animate-bounce-slow mt-3">
            <ChevronDown className="w-10 h-10 text-muted-foreground" />
            <ChevronDown className="w-10 h-10 text-muted-foreground -mt-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
