import { cn } from "@/lib/utils";

type IconModule = { svg: string; title?: string };

/** Renders official brand SVG from `thesvg` with consistent sizing inside hub tiles. */
export function ThesvgBrandLogo({
  icon,
  label,
  className,
}: {
  icon: IconModule;
  /** Accessible name (tooltip also uses integration name). */
  label: string;
  className?: string;
}) {
  const cleaned = icon.svg
    .replace(/\swidth="[^"]*"/gi, "")
    .replace(/\sheight="[^"]*"/gi, "")
    .replace(/\sheight='[^']*'/gi, "")
    .replace(/\swidth='[^']*'/gi, "");

  return (
    <span
      className={cn(
        "inline-flex h-full w-full items-center justify-center pointer-events-none",
        "[&>svg]:max-h-[88%] [&>svg]:max-w-[88%] [&>svg]:object-contain",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: cleaned }}
      aria-hidden
      title={label}
    />
  );
}
