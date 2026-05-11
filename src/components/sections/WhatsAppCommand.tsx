"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

type Command = {
  user: string;
  response: string;
  delay: number;
};

type CommandChannel = {
  id: "whatsapp" | "slack" | "telegram";
  label: string;
  badge: string;
  badgeClass: string;
  headerClass: string;
  chatClass: string;
  userBubbleClass: string;
  userTextClass: string;
  aiBubbleClass: string;
  aiTextClass: string;
  assistantName: string;
  commands: Command[];
};

const commandChannels: CommandChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    badge: "WhatsApp Command Center",
    badgeClass: "bg-[#25D366]/10 text-[#25D366]",
    headerClass: "bg-[#075E54] dark:bg-[#1F2C34] text-white",
    chatClass: "bg-[#ECE5DD] dark:bg-[#0B141A]",
    userBubbleClass: "bg-[#DCF8C6] dark:bg-[#005C4B]",
    userTextClass: "text-[#111B21] dark:text-[#E9EDEF]",
    aiBubbleClass: "bg-white dark:bg-[#202C33]",
    aiTextClass: "text-[#111B21] dark:text-[#E9EDEF]",
    assistantName: "P.AI Assistant",
    commands: [
      { user: "Please clear my inbox.", response: "Done ✅ I archived 12 emails and flagged 3 urgent ones for you.", delay: 0 },
      { user: "Schedule lunch with John tomorrow.", response: "Done 🍽️ Lunch is booked for 12:30 PM at your usual spot. John is notified.", delay: 0.4 },
      { user: "Can you summarize today's meetings?", response: "Of course 😊 You had 3 meetings today. Key win: Client X approved the Q3 budget. I also sent your action items to email.", delay: 0.8 },
    ],
  },
  {
    id: "slack",
    label: "Slack",
    badge: "Slack Command Center",
    badgeClass: "bg-[#611F69]/10 text-[#611F69] dark:text-[#E38CE9]",
    headerClass: "bg-[#2A0A2E] dark:bg-[#3B0D44] text-white",
    chatClass: "bg-[#F8F8FA] dark:bg-[#1A1A20]",
    userBubbleClass: "bg-[#EDE6FF] dark:bg-[#4B2D72]",
    userTextClass: "text-[#2F1736] dark:text-[#F6EEFF]",
    aiBubbleClass: "bg-white dark:bg-[#252533]",
    aiTextClass: "text-[#2F1736] dark:text-[#F1E9FF]",
    assistantName: "P.AI in #command-center",
    commands: [
      { user: "Clean up my inbox and keep urgent only.", response: "Done ✅ 21 archived, 5 urgent threads pinned, and two replies drafted for approval.", delay: 0 },
      { user: "Set a catch-up with Maybank team tomorrow.", response: "Booked 📅 Tomorrow 11:30 AM. Calendar invite and Slack reminder already scheduled.", delay: 0.4 },
      { user: "Post today's leadership summary.", response: "Posted to #leadership-update: 3 wins, 2 risks, and action owners assigned.", delay: 0.8 },
    ],
  },
  {
    id: "telegram",
    label: "Telegram",
    badge: "Telegram Command Center",
    badgeClass: "bg-[#229ED9]/10 text-[#229ED9]",
    headerClass: "bg-[#1E7FB1] dark:bg-[#255C7A] text-white",
    chatClass: "bg-[#EAF4FB] dark:bg-[#101B24]",
    userBubbleClass: "bg-[#CDEBFF] dark:bg-[#1F5C80]",
    userTextClass: "text-[#123548] dark:text-[#E5F6FF]",
    aiBubbleClass: "bg-white dark:bg-[#1D2A34]",
    aiTextClass: "text-[#123548] dark:text-[#E5F6FF]",
    assistantName: "P.AI Concierge",
    commands: [
      { user: "What should I focus on this afternoon?", response: "Top priorities 🎯 finalize the renewal deal, approve payroll, and review Product A sales spike.", delay: 0 },
      { user: "Draft a concise follow-up for the renewal.", response: "Draft ready ✍️ Professional tone, 5 lines, CTA included. Send now?", delay: 0.4 },
      { user: "Send me a quick day-end briefing at 6 PM.", response: "Scheduled ✅ You will receive a day-end brief daily at 6 PM with key metrics and blockers.", delay: 0.8 },
    ],
  },
];

export function WhatsAppCommand() {
  const [activeChannelId, setActiveChannelId] = useState<CommandChannel["id"]>("whatsapp");
  const activeChannel = useMemo(
    () => commandChannels.find((channel) => channel.id === activeChannelId) ?? commandChannels[0],
    [activeChannelId]
  );

  return (
    <section id="how-it-works" className="section-padding bg-transparent">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${activeChannel.badgeClass}`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{activeChannel.badge}</span>
          </div>
          <h2 className="text-headline mb-4">
            One Command Center.
            <br />
            Every Channel Handled.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Switch between WhatsApp, Slack, and Telegram. Voice or text—P.AI executes with your governance rules.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="mb-5 rounded-full border border-border bg-secondary/30 p-1.5 flex items-center justify-center gap-1.5">
            {commandChannels.map((channel) => {
              const isActive = channel.id === activeChannel.id;
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setActiveChannelId(channel.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-ring ${
                    isActive
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/70"
                  }`}
                  aria-pressed={isActive}
                >
                  {channel.label}
                </button>
              );
            })}
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_24px_64px_-24px_hsl(var(--foreground)/0.35)]">
            {/* Channel Header */}
            <div className={`px-4 py-3 flex items-center gap-3 ${activeChannel.headerClass}`}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <span className="text-[9px] font-semibold tracking-tight">P.AI</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{activeChannel.assistantName}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div key={activeChannel.id} className={`p-4 space-y-3 min-h-[360px] ${activeChannel.chatClass}`}>
              {activeChannel.commands.map((cmd, i) => (
                <div key={i}>
                  {/* User message */}
                  <div
                    className={`max-w-[70%] ml-auto rounded-2xl rounded-tr-sm p-3 shadow-sm mb-3 opacity-0 animate-chat-appear ${activeChannel.userBubbleClass} ${activeChannel.userTextClass}`}
                    style={{ animationDelay: `${cmd.delay + 0.3}s` }}
                  >
                    <p className="text-sm">{cmd.user}</p>
                  </div>
                  {/* AI response */}
                  <div
                    className={`max-w-[85%] rounded-2xl rounded-tl-sm p-3 shadow-sm opacity-0 animate-chat-appear ${activeChannel.aiBubbleClass}`}
                    style={{ animationDelay: `${cmd.delay + 0.6}s` }}
                  >
                    <p className={`text-sm ${activeChannel.aiTextClass}`}>{cmd.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

