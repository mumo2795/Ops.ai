import { HUB_SLACK_LOGO_SVG } from "@/lib/hub-slack-logo-svg";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  logo: string | null;
  hubSlackSvg?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function WorkspaceIntegrationLogo({ name, logo, hubSlackSvg, className, size = "md" }: Props) {
  const box = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const img = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-8 w-8" : "h-7 w-7";
  const wrap = cn(
    "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background shadow-sm",
    "dark:border-zinc-700 dark:bg-zinc-950/60 dark:shadow-none",
    box,
    className,
  );

  if (hubSlackSvg) {
    return (
      <div className={wrap}>
        <div
          className={cn("flex items-center justify-center [&>svg]:h-full [&>svg]:w-full", img)}
          dangerouslySetInnerHTML={{ __html: HUB_SLACK_LOGO_SVG }}
        />
        <span className="sr-only">{name}</span>
      </div>
    );
  }

  if (!logo) {
    return null;
  }

  return (
    <div className={wrap}>
      <img src={logo} alt="" className={cn("object-contain", img)} loading="lazy" />
      <span className="sr-only">{name}</span>
    </div>
  );
}
