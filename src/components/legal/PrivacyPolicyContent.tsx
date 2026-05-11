export function PrivacyPolicyContent() {
  return (
    <div className="space-y-8 text-left">
      <header className="space-y-3">
        <p className="text-overline">Legal</p>
        <h1 className="text-headline text-foreground">Privacy Policy</h1>
        <p className="text-caption">Last updated: April 15, 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">1. Information We Collect</h2>
        <p className="text-body text-muted-foreground">
          We collect account information you provide directly (such as name, email, and billing details), usage data
          needed to operate the service, and technical diagnostics used to improve reliability and security.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">2. How We Use Information</h2>
        <p className="text-body text-muted-foreground">
          We use your data to deliver and maintain the service, personalize product features, process payments, communicate
          important updates, and comply with legal obligations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">3. Data Sharing</h2>
        <p className="text-body text-muted-foreground">
          We do not sell your personal data. We only share data with trusted service providers necessary to run our
          platform (for example hosting, analytics, and payment processors), and only under contractual safeguards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">4. Data Retention and Security</h2>
        <p className="text-body text-muted-foreground">
          We retain data for as long as needed to provide services and meet legal requirements. We use reasonable technical
          and organizational measures to protect your information against unauthorized access, disclosure, and loss.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">5. Your Rights</h2>
        <p className="text-body text-muted-foreground">
          Depending on your location, you may have rights to access, correct, delete, or export your personal data. You
          may also object to or restrict certain processing activities.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">6. Contact</h2>
        <p className="text-body text-muted-foreground">
          For privacy-related requests, contact us at{" "}
          <a className="text-foreground underline underline-offset-2 hover:opacity-80" href="mailto:privacy@p-ai.vip">
            privacy@p-ai.vip
          </a>
          .
        </p>
      </section>
    </div>
  );
}
