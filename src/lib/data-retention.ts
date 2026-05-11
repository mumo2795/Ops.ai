/** Mirrors the marketing “Data ownership” control on the landing page (`VoiceSecuritySection`). */
export const AUTO_DELETE_INTERVALS = ["7 days", "15 days", "30 days"] as const;
export type AutoDeleteInterval = (typeof AUTO_DELETE_INTERVALS)[number];

export const DATA_RETENTION_DISCLAIMER =
  "Choosing auto-deletion does not reduce what the AI can do for you—it only controls how long copies of your data are retained, on your schedule.";

export const PRIVACY_PROMISES = [
  "We do not sell or share your data.",
  "Connections run through secured integrations with controlled permissions.",
  "Your context and workflows stay private and account-scoped.",
  "Monitoring and safeguards are in place for sensitive actions.",
] as const;

export const LOCAL_AI_POINTS = [
  {
    lead: "Data stays local, sovereign, and protected.",
    detail:
      "Your information is securely kept in-country within your controlled environment, with no external leakage by default.",
  },
  {
    lead: "Inference stays private-first.",
    detail: "AI workloads are not routed to the public cloud unless you explicitly enable it.",
  },
  {
    lead: "You have clear ownership end-to-end.",
    detail: "You decide retention policies and can export, retrieve, and take your data back whenever you choose.",
  },
] as const;
