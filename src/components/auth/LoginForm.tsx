"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authInputClass } from "@/components/auth/authFieldStyles";
import { authLegalTriggerClass, useLegalDocumentModals } from "@/components/legal/useLegalDocumentModals";
import { cn } from "@/lib/utils";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-destructive mt-1.5">{message}</p>;
}

function inputErrorClass(show: boolean) {
  return show
    ? "border-destructive ring-2 ring-destructive/25 focus-visible:ring-destructive focus-visible:ring-offset-0"
    : "";
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { openTerms, openPrivacy, modals } = useLegalDocumentModals();

  const emailTrim = email.trim();
  const emailError =
    submitAttempted && !emailTrim
      ? "This field is required."
      : submitAttempted && emailTrim && !isValidEmail(emailTrim)
        ? "Enter a valid email address."
        : undefined;
  const passwordError =
    submitAttempted && !password ? "This field is required." : submitAttempted && password.length < 8 ? "At least 8 characters." : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!emailTrim || !isValidEmail(emailTrim) || !password || password.length < 8) return;
    toast.success("Signed in (demo — no backend yet).");
    router.push("/dashboard");
  }

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(authInputClass, inputErrorClass(!!emailError))}
            aria-invalid={!!emailError}
          />
          <FieldError message={emailError} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="login-password">Password</Label>
            <button
              type="button"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm p-0 h-auto bg-transparent border-0 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(authInputClass, "pr-11", inputErrorClass(!!passwordError))}
              aria-invalid={!!passwordError}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-r-xl text-muted-foreground hover:text-foreground transition-colors focus-ring"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <FieldError message={passwordError} />
        </div>

        <div className="flex items-center gap-2.5 pt-0.5">
          <Checkbox
            id="login-remember"
            checked={remember}
            onCheckedChange={(c) => setRemember(c === true)}
            className="rounded-[4px]"
          />
          <Label htmlFor="login-remember" className="text-sm font-normal text-muted-foreground cursor-pointer leading-snug">
            Keep me signed in on this device
          </Label>
        </div>

        <Button type="submit" size="lg" className="mt-2 h-12 w-full rounded-full text-base font-medium focus-ring">
          Sign in
        </Button>

        <p className="text-center text-xs text-muted-foreground leading-relaxed pt-1">
          By continuing you agree to our{" "}
          <button type="button" className={authLegalTriggerClass} onClick={openTerms}>
            Terms
          </button>{" "}
          and{" "}
          <button type="button" className={authLegalTriggerClass} onClick={openPrivacy}>
            Privacy Policy
          </button>
          .
        </p>
      </form>
      {modals}
    </>
  );
}
