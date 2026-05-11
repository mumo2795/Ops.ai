"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { OpsAiLogo } from "@/components/OpsAiBranding";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const navbar = document.querySelector("header");
      const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 80;
      const scrollPos = window.scrollY + navbarHeight + 40;

      // Resolve active section using actual DOM order, not nav label order.
      const sections = navLinks
        .map((l) => l.href.replace("#", ""))
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter((section): section is { id: string; top: number } => section !== null)
        .sort((a, b) => b.top - a.top);

      for (const section of sections) {
        if (section.top <= scrollPos) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection("");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    const respectsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navbar = document.querySelector("header");
    const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 80;
    const targetTop = window.scrollY + el.getBoundingClientRect().top - navbarHeight - 16;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: respectsReducedMotion ? "auto" : "smooth" });
  };

  const navigateToSection = (href: string, closeMobileMenu = false) => {
    const targetId = href.replace("#", "");
    setActiveSection(targetId);
    if (closeMobileMenu) {
      setIsOpen(false);
      // Wait for the mobile menu collapse to finish, then scroll.
      window.setTimeout(() => scrollTo(href), 260);
      return;
    }
    scrollTo(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-3 border-b border-black/10 dark:border-zinc-800/90" : "bg-transparent py-5"
      )}
    >
      <div className="container-main">
        <nav className="relative flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity z-10 focus-ring rounded-md"
            aria-label="Ops.AI home"
          >
            <OpsAiLogo size="md" showWordmark={false} />
          </Link>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(link.href);
                }}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer rounded-sm select-none active:bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [-webkit-tap-highlight-color:transparent]",
                  activeSection === link.href.replace("#", "")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={activeSection === link.href.replace("#", "") ? "page" : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-all duration-300 bg-black dark:bg-white",
                    activeSection === link.href.replace("#", "") ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  )}
                />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 z-10">
            <ThemeToggle />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm font-medium focus-ring" type="button">
                  Log in
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sign in to your account</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className="text-sm font-medium rounded-full px-6 focus-ring" type="button">
                  Get Started
                </Button>
              </TooltipTrigger>
              <TooltipContent>Start your 7-day free trial</TooltipContent>
            </Tooltip>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors focus-ring"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass border-t border-border overflow-hidden transition-all duration-300",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-main py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                navigateToSection(link.href, true);
              }}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2 rounded-sm select-none active:bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [-webkit-tap-highlight-color:transparent]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <Button variant="outline" className="w-full" type="button">
              Log in
            </Button>
            <Button className="w-full rounded-full" type="button">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
