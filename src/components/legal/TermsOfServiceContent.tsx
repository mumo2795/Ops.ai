export function TermsOfServiceContent() {
  return (
    <div className="space-y-8 text-left">
      <header className="space-y-3">
        <p className="text-overline">Legal</p>
        <h1 className="text-headline text-foreground">Terms of Service</h1>
        <p className="text-caption">Last updated: April 15, 2026</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">1. Acceptance of Terms</h2>
        <p className="text-body text-muted-foreground">
          By accessing or using the Ops.AI platform, you agree to be bound by these Terms of Service and any applicable laws
          and regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">2. Use of the Service</h2>
        <p className="text-body text-muted-foreground">
          You agree to use the service only for lawful purposes and in a way that does not violate the rights of others,
          disrupt the service, or attempt unauthorized access to systems or data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">3. Accounts and Billing</h2>
        <p className="text-body text-muted-foreground">
          You are responsible for maintaining account security and providing accurate billing information. Subscription fees,
          if applicable, are billed according to your selected plan.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">4. Intellectual Property</h2>
        <p className="text-body text-muted-foreground">
          All platform software, branding, and related materials are owned by Ops.AI or its licensors. You retain ownership
          of your content, subject to rights needed for us to operate the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">5. Limitation of Liability</h2>
        <p className="text-body text-muted-foreground">
          To the maximum extent permitted by law, Ops.AI is not liable for indirect, incidental, special, consequential, or
          punitive damages arising from use of the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">6. Termination</h2>
        <p className="text-body text-muted-foreground">
          We may suspend or terminate access if these terms are violated. You may stop using the service at any time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-title text-foreground">7. Contact</h2>
        <p className="text-body text-muted-foreground">
          For questions about these terms, contact us at{" "}
          <a className="text-foreground underline underline-offset-2 hover:opacity-80" href="mailto:legal@p-ai.vip">
            legal@p-ai.vip
          </a>
          .
        </p>
      </section>
    </div>
  );
}
