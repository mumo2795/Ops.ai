import { LegalPageClose } from "@/components/legal/LegalPageClose";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-padding-sm">
        <div className="container-narrow">
          <div className="mb-8 flex items-center justify-between gap-4">
            <LegalPageClose />
          </div>

          <div className="card-premium space-y-8 dark:border-zinc-800">
            <PrivacyPolicyContent />
          </div>
        </div>
      </section>
    </main>
  );
}
