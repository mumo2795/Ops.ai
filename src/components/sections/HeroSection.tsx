import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-secondary/30 dark:bg-none dark:bg-transparent" />

      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="text-lg font-semibold tracking-wide">Enterprise • Operations • Intelligence</span>
          </div>

          <h1 className="text-display mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">Ops.AI</span>
            <br />
            The operating layer for modern companies
          </h1>

          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Ops.AI brings 1000+ ready workflows across HR, finance, inventory, procurement, marketing, and sales into one
            LLM-powered operating layer. Keep track of every moving part, get real-time insights, and execute end-to-end from
            your Command Center without changing how teams work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="https://calendar.app.google/jE68kqsgzNXXH3UY8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full px-8 text-base h-12 gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-lg hover:shadow-xl focus-ring">
                Schedule a Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
