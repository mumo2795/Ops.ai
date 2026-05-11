import { LegalPageClose } from "@/components/legal/LegalPageClose";
import { TermsOfServiceContent } from "@/components/legal/TermsOfServiceContent";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-padding-sm">
        <div className="container-narrow">
          <div className="mb-8 flex items-center justify-between gap-4">
            <LegalPageClose />
          </div>

          <div className="card-premium space-y-8 dark:border-zinc-800">
            <TermsOfServiceContent />
          </div>
        </div>
      </section>
    </main>
  );
}
