import { Shield } from "lucide-react";
import { OpsAiLogo } from "@/components/OpsAiBranding";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "AI Dashboards", href: "#ai-dashboards" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-border bg-background">
      <div className="container-main section-padding-sm">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="sm:col-span-2">
            <a href="/" className="inline-block mb-4">
              <OpsAiLogo size="md" />
            </a>
            <p className="text-body text-muted-foreground max-w-sm mb-6">
              Operations intelligence for the enterprise — dashboards, command channels, and governed integrations in
              one platform.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Enterprise-grade security • Data stays under your policies</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ops.AI. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">a product by <span className="font-medium">Sync AI Sdn. Bhd.</span></p>
        </div>
      </div>
    </footer>
  );
}
