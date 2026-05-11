import { Calendar, Mail, Users, FileText, Bell, BarChart3 } from "lucide-react";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

function WhatsAppPreview({ title, messages }: { title: string; messages: ChatMessage[] }) {
  return (
    <div className="rounded-xl overflow-hidden mt-4 border border-border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="bg-[#075E54] dark:bg-[#1F2C34] text-white px-3 py-2 flex items-center gap-2 border-b border-black/10">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-[10px] font-semibold">P.AI</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-semibold leading-tight">{title}</p>
          <p className="text-[9px] opacity-80">WhatsApp Command Center</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] opacity-80">online</span>
        </div>
      </div>
      <div className="bg-[#ECE5DD] dark:bg-[#0B141A] p-3 space-y-2 min-h-[210px]">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div
              key={index}
              className="max-w-[82%] ml-auto bg-[#DCF8C6] dark:bg-[#005C4B] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08 + 0.08}s`, animationFillMode: "forwards" }}
            >
              <p className="text-xs leading-relaxed">{message.text}</p>
              <p className="text-[9px] opacity-60 text-right mt-1">now</p>
            </div>
          ) : (
            <div
              key={index}
              className="max-w-[88%] bg-white dark:bg-[#202C33] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08 + 0.12}s`, animationFillMode: "forwards" }}
            >
              <p className="text-xs leading-relaxed whitespace-pre-line">{message.text}</p>
              <p className="text-[9px] opacity-60 text-right mt-1">now</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const features = [
  {
    icon: Calendar,
    title: "Smart Calendar",
    illustration: (
      <WhatsAppPreview
        title="Smart Calendar"
        messages={[
          { role: "user", text: "Schedule lunch with Amir tomorrow at 12:30." },
          { role: "ai", text: "Done ✅ Lunch with Amir is booked tomorrow at 12:30 PM and invite sent." },
          { role: "user", text: "I have a conflict at 12:30 now." },
          { role: "ai", text: "No worries 👍 I shifted lunch to 1:15 PM and updated Amir automatically." },
        ]}
      />
    ),
  },
  {
    icon: Mail,
    title: "Inbox Intelligence",
    illustration: (
      <WhatsAppPreview
        title="Inbox Intelligence"
        messages={[
          { role: "user", text: "Clear my inbox and keep only urgent emails." },
          { role: "ai", text: "Done ✨ 19 archived, 4 urgent kept, and 2 replies drafted in your tone." },
          { role: "user", text: "Show me the top urgent one." },
          { role: "ai", text: "Client renewal expires tonight ⚠️ I already prepared a reply for your approval." },
        ]}
      />
    ),
  },
  {
    icon: Users,
    title: "Meeting Summaries",
    illustration: (
      <WhatsAppPreview
        title="Meeting Summaries"
        messages={[
          {
            role: "ai",
            text: "Here you go 📝\nSummary for Q3 Strategy Call:\n- Budget approved: RM2.5M\n- 3 action items assigned\n- Follow-up this Friday",
          },
          {
            role: "ai",
            text: "Should I email the minutes and summary to everyone in the meeting as well? 📧",
          },
          { role: "user", text: "Yes" },
          { role: "ai", text: "Perfect — sent to everyone in the meeting ✅" },
        ]}
      />
    ),
  },
  {
    icon: FileText,
    title: "Document Drafts",
    illustration: (
      <WhatsAppPreview
        title="Document Drafts"
        messages={[
          { role: "user", text: "Draft a proposal for Project Alpha in my style." },
          { role: "ai", text: "Draft created ✍️ Executive summary, scope, timeline, and pricing included." },
          { role: "user", text: "Shorten it to 1 page and make it more direct." },
          { role: "ai", text: "Updated ✅ 1-page version is ready to send." },
        ]}
      />
    ),
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    illustration: (
      <WhatsAppPreview
        title="Smart Alerts"
        messages={[
          { role: "ai", text: "Heads up ⚠️ Contract with Orion expires in 2 hours." },
          { role: "ai", text: "John has not replied for 3 days. Want me to follow up now? 👀" },
          { role: "user", text: "Yes, follow up and cc me." },
          { role: "ai", text: "Done ✅ Follow-up sent and you are cc'ed." },
        ]}
      />
    ),
  },
  {
    icon: BarChart3,
    title: "Instant Business Insights",
    illustration: (
      <WhatsAppPreview
        title="Instant Business Insights"
        messages={[
          {
            role: "ai",
            text: "Quick update 📊\nBased on Shopify + Accounting + POS today:\n- Daily sales: RM48,320\n- Average CAC: RM37\n- Vs yesterday: +12%",
          },
          {
            role: "ai",
            text: "Today performed better because Product A is riding the current viral trend 🚀",
          },
          { role: "user", text: "Nice. Send this report to my leadership group at 6 PM daily." },
          { role: "ai", text: "Scheduled ✅ Daily business insight report will be sent at 6 PM." },
        ]}
      />
    ),
  },
];

export function ProfessionalFeatures() {
  return (
    <section id="features" className="section-padding bg-secondary/30 dark:bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-overline mb-4">Professional Power</p>
          <h2 className="text-headline mb-4">
            See the Magic
            <br />
            in Action
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Your calendar, inbox, meetings, documents, and business numbers managed in one WhatsApp flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="card-premium group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </div>
              {feature.illustration}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div className="w-full max-w-2xl text-center">
            <p className="text-base sm:text-lg font-semibold tracking-wide opacity-0 animate-fade-in-up" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
              More Features Coming
            </p>
            <p className="text-sm text-muted-foreground mt-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.22s", animationFillMode: "forwards" }}>
              We are adding more business workflows so your Command Center keeps getting smarter.
            </p>
            <div className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <span>Team performance snapshots</span>
              <span className="mx-2 text-muted-foreground/50">•</span>
              <span>Multi-location ops alerts</span>
              <span className="mx-2 text-muted-foreground/50">•</span>
              <span>Custom KPI watchlists</span>
              <span className="mx-2 text-muted-foreground/50">•</span>
              <span>Cash flow anomaly warnings</span>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-primary text-sm font-medium opacity-0 animate-fade-in-up" style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              New automations rolling out soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
