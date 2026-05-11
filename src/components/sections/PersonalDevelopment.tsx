import { BookOpen, Sun, Newspaper, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learn New Skills",
    description: "Continuous learning with industry insights and best practices tailored to your role.",
    example: "📚 Today's insight: Advanced inventory optimization techniques used by top retailers.",
  },
  {
    icon: Sun,
    title: "Daily Business Briefing",
    description: "Start your day with personalized insights that match your business priorities.",
    example: '"Your Q3 targets are on track. Focus areas: reduce procurement costs by 8% and automate 3 manual workflows."',
  },
  {
    icon: Newspaper,
    title: "Industry Intelligence",
    description: "Stay ahead with curated news and trends relevant to your industry and company size.",
    example: "📈 Market: Your sector up 2.3% • 🏢 Competitor: Company X launched new product • 💡 Innovation: AI adoption in ops +15%",
  },
  {
    icon: Sparkles,
    title: "Custom Workflows",
    description: "We're always building new features. Tell us what operations you want to automate next.",
    example: "Advanced forecasting, team performance analytics, custom reporting - request what you need.",
  },
];

export function PersonalDevelopment() {
  return (
    <section className="section-padding bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-overline mb-4">Continuous Improvement</p>
          <h2 className="text-headline mb-4">
            Grow Every Day
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Ops.AI helps you and your team become more efficient and effective—one operation at a time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {features.map((feature, i) => (
            <div key={feature.title} className="card-premium group opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <div className="bg-secondary/60 rounded-lg px-3 py-2">
                <p className="text-xs text-muted-foreground">{feature.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}