import { ArrowRight } from "lucide-react";

const questionRows = [
  ["What do I need to focus on today?", "Remind me about...", "Catch me up on everything I missed."],
  ["Prepare me for my next meeting.", "Turn this into actionable tasks.", "Show me a summary."],
  ["Plan my ideal week.", "What needs my attention right now?", "Draft the follow-up email."],
  ["Give me good news.", "What are the risks right now?", "Explain this to me simply."],
];

export function DataToWork() {
  return (
    <section className="section-padding overflow-hidden bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-overline mb-4">Intelligence Engine</p>
          <h2 className="text-headline mb-4">
            Put Your Data <span className="text-muted-foreground">to Work</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Ops.AI recommends the best workflow with AI, or builds one for you when you ask. Everything is LLM-driven so you
            can track operations, get insights, and run end-to-end execution in one place.
          </p>
        </div>

        {/* Question pills with staggered animation */}
        <div className="relative max-w-4xl mx-auto mb-14">
          {questionRows.map((row, ri) => (
            <div key={ri} className="flex flex-wrap justify-center gap-2.5 mb-2.5">
              {row.map((q, qi) => (
                <span
                  key={qi}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary/50 transition-all duration-300 cursor-default opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(ri * 3 + qi) * 0.06}s` }}
                >
                  {q}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Ask P.AI in WhatsApp UI */}
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-b from-[#25D366]/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-border overflow-hidden shadow-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-2xl">
              <div className="bg-[#075E54] dark:bg-[#1F2C34] text-white px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <span className="text-[8px] font-semibold tracking-tight leading-none">P.AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Ask P.AI</p>
                  <p className="text-[11px] opacity-80">WhatsApp Command Center</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="bg-[#ECE5DD] dark:bg-[#0B141A] p-4 space-y-3 min-h-[250px]">
                <div className="max-w-[80%] ml-auto bg-[#DCF8C6] dark:bg-[#005C4B] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: "0.08s", animationFillMode: "forwards" }}>
                  <p className="text-xs">What do I need to focus on today?</p>
                  <p className="text-[9px] opacity-60 text-right mt-1">now</p>
                </div>
                <div className="max-w-[90%] bg-white dark:bg-[#202C33] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: "0.16s", animationFillMode: "forwards" }}>
                  <p className="text-xs">You have 3 priorities today 📌 close the renewal call at 11 AM, approve payroll before 2 PM, and review Product A sales spike.</p>
                  <p className="text-[9px] opacity-60 text-right mt-1">now</p>
                </div>
                <div className="max-w-[80%] ml-auto bg-[#DCF8C6] dark:bg-[#005C4B] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: "0.24s", animationFillMode: "forwards" }}>
                  <p className="text-xs">Draft the follow-up email for the renewal.</p>
                  <p className="text-[9px] opacity-60 text-right mt-1">now</p>
                </div>
                <div className="max-w-[90%] bg-white dark:bg-[#202C33] text-[#111B21] dark:text-[#E9EDEF] rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm opacity-0 animate-fade-in-up" style={{ animationDelay: "0.32s", animationFillMode: "forwards" }}>
                  <p className="text-xs">Draft is ready in your tone ✨ Should I send it now?</p>
                  <p className="text-[9px] opacity-60 text-right mt-1">now</p>
                </div>
              </div>

              <div className="bg-card dark:bg-[#111B21] border-t border-border dark:border-[hsl(0,0%,22%)] p-3">
                <div className="rounded-full bg-secondary dark:bg-[#202C33] px-4 py-2.5 flex items-center gap-2 border border-border/50 dark:border-[hsl(0,0%,24%)]">
                  <span className="text-xs text-muted-foreground flex-1 text-left">
                    Type your next question...
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

