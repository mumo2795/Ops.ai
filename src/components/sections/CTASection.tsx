import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-headline text-primary-foreground mb-4">
              Ready to run a sharper operation?
            </h2>
            <p className="text-body-lg text-primary-foreground/80 mb-8">
              Join leadership teams who use Ops.AI for cross-functional visibility and faster decisions — without another
              siloed dashboard project. Start with a free trial; no credit card required.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full px-8 text-base h-12 gap-2 bg-background text-foreground hover:bg-background/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-ring"
              asChild
            >
              <Link href="/signup">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
