"use client";

/**
 * Viewport-fixed atmosphere (dot grid + soft primary glows) so it stays visible while scrolling.
 * Used on onboarding and the marketing home page.
 */
export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-background" aria-hidden>
      {/* Fine grid — reads as texture at rest and while scrolling */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:hidden"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Upper-right wash — frames hero / top of viewport */}
      <div className="absolute -top-24 right-[-10%] h-[min(28rem,52vh)] w-[min(28rem,85vw)] rounded-full bg-primary/[0.085] blur-3xl dark:hidden" />
      {/* Lower-left wash — anchors every scroll position */}
      <div className="absolute bottom-[-12%] left-[-12%] h-[min(22rem,42vh)] w-[min(22rem,75vw)] rounded-full bg-primary/[0.045] blur-3xl dark:hidden" />
      {/* Mid-viewport bloom — keeps ambient visible between sections */}
      <div className="absolute left-1/2 top-[42%] h-[min(36rem,78vh)] w-[min(42rem,120vw)] max-w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.028] blur-[4.5rem] dark:hidden" />
      {/* Trailing edge — subtle lift near bottom of viewport */}
      <div className="absolute bottom-[-5%] right-[-5%] h-[min(18rem,35vh)] w-[min(18rem,55vw)] rounded-full bg-primary/[0.038] blur-3xl dark:hidden" />
    </div>
  );
}
