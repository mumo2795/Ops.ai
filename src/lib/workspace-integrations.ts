export type WorkspaceIntegrationId = "gmail" | "calendar" | "meet" | "slack" | "teams" | "outlook";

/** Same image sources as the marketing `IntegrationsHub` seamless ring (PNG + inline Slack). */
export const WORKSPACE_INTEGRATIONS: {
  id: WorkspaceIntegrationId;
  name: string;
  blurb: string;
  logo: string | null;
  /** When true, render the same inline Slack SVG as the hub (not a file path). */
  hubSlackSvg?: boolean;
}[] = [
  {
    id: "gmail",
    name: "Gmail",
    blurb: "Inbox intelligence, prioritization, and reply drafts",
    logo: "/logo/gmail.svg",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    blurb: "Scheduling, conflicts, and meeting prep",
    logo: "/logo/google-calendar.png",
  },
  {
    id: "meet",
    name: "Google Meet",
    blurb: "Meeting context and follow-up summaries",
    logo: "/logo/google-meet.png",
  },
  {
    id: "slack",
    name: "Slack",
    blurb: "Workspace messages and threads",
    logo: null,
    hubSlackSvg: true,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    blurb: "Chat, channels, and meeting notes",
    logo: "/logo/teams.png",
  },
  {
    id: "outlook",
    name: "Outlook",
    blurb: "Mail and Microsoft 365 calendar",
    logo: "/logo/outlook.png",
  },
];
