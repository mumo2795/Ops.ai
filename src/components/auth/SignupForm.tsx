"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AE, AU, GB, ID, IN, MY, SG, TH, US, VN } from "country-flag-icons/react/3x2";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authFormPanelClass, authInputClass, authSelectTriggerClass } from "@/components/auth/authFieldStyles";
import { authLegalTriggerClass, useLegalDocumentModals } from "@/components/legal/useLegalDocumentModals";
import { passwordMeetsRules, passwordRuleHints, passwordStrengthScore } from "@/components/auth/passwordStrength";
import { cn } from "@/lib/utils";

const dialCodes = [
  { value: "+60", label: "MY +60", iso: "my", country: "Malaysia" },
  { value: "+65", label: "SG +65", iso: "sg", country: "Singapore" },
  { value: "+62", label: "ID +62", iso: "id", country: "Indonesia" },
  { value: "+66", label: "TH +66", iso: "th", country: "Thailand" },
  { value: "+84", label: "VN +84", iso: "vn", country: "Vietnam" },
  { value: "+1", label: "US +1", iso: "us", country: "United States" },
  { value: "+44", label: "UK +44", iso: "gb", country: "United Kingdom" },
  { value: "+61", label: "AU +61", iso: "au", country: "Australia" },
  { value: "+91", label: "IN +91", iso: "in", country: "India" },
  { value: "+971", label: "AE +971", iso: "ae", country: "United Arab Emirates" },
] as const;

/** MIT `country-flag-icons` — vector SVGs (crisp at any size). */
const FLAG_SVG_BY_ISO: Record<(typeof dialCodes)[number]["iso"], typeof MY> = {
  my: MY,
  sg: SG,
  id: ID,
  th: TH,
  vn: VN,
  us: US,
  gb: GB,
  au: AU,
  in: IN,
  ae: AE,
};

function DialCodeFlag({ iso, title }: { iso: (typeof dialCodes)[number]["iso"]; title: string }) {
  const Flag = FLAG_SVG_BY_ISO[iso];
  return (
    <span className="inline-flex shrink-0 items-center self-center leading-none" title={title} aria-hidden>
      <Flag
        title=""
        aria-hidden
        className="block h-[0.95rem] w-auto sm:h-[1.1rem] [&>svg]:block [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-[1.65rem] sm:[&>svg]:max-w-[1.85rem]"
      />
    </span>
  );
}

type AccountType = "individual" | "company";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-destructive mt-1">{message}</p>;
}

function inputErrorClass(show: boolean) {
  return show
    ? "border-destructive ring-2 ring-destructive/25 focus-visible:ring-destructive focus-visible:ring-offset-0"
    : "";
}

export function SignupForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [dial, setDial] = useState("+60");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { openTerms, openPrivacy, modals } = useLegalDocumentModals();

  const strength = useMemo(() => passwordStrengthScore(password), [password]);

  const isCompany = accountType === "company";

  const nameError =
    submitAttempted && !name.trim()
      ? isCompany
        ? "Primary contact name is required."
        : "This field is required."
      : undefined;

  const emailTrim = email.trim();
  const emailError =
    submitAttempted && !isCompany && !emailTrim
      ? "This field is required."
      : submitAttempted && !isCompany && emailTrim && !isValidEmail(emailTrim)
        ? "Enter a valid email address."
        : undefined;

  const companyNameError =
    submitAttempted && isCompany && !companyName.trim() ? "Company name is required." : undefined;

  const businessEmailTrim = businessEmail.trim();
  const businessEmailError =
    submitAttempted && isCompany && !businessEmailTrim
      ? "Business email is required."
      : submitAttempted && isCompany && businessEmailTrim && !isValidEmail(businessEmailTrim)
        ? "Enter a valid business email address."
        : undefined;

  const phoneError = submitAttempted && !phone.trim() ? "Enter your phone number." : undefined;

  const passwordError = submitAttempted && !password ? "This field is required." : undefined;
  const passwordFieldInvalid = submitAttempted && (!password || !passwordMeetsRules(password));
  const confirmError =
    submitAttempted && !confirm
      ? "This field is required."
      : submitAttempted && confirm && password !== confirm
        ? "Passwords do not match."
        : undefined;
  const termsError = submitAttempted && !agreed ? "Please accept the terms to continue." : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    const emailOk = isCompany ? isValidEmail(businessEmail.trim()) : isValidEmail(email.trim());
    const baseOk =
      name.trim() &&
      emailOk &&
      phone.trim() &&
      passwordMeetsRules(password) &&
      password === confirm &&
      agreed;
    const companyOk = !isCompany || (companyName.trim() && isValidEmail(businessEmail.trim()));
    if (!baseOk || !companyOk) return;
    toast.success("Account created (demo — no backend yet). Continue setup.");
    router.push("/onboarding");
  }

  const accountToggleActive =
    "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/25 ring-offset-1 ring-offset-background dark:ring-offset-zinc-950";
  const accountToggleInactive =
    "text-muted-foreground hover:text-foreground hover:bg-muted/70 dark:text-zinc-400 dark:hover:bg-zinc-800/90 dark:hover:text-zinc-100 flex-1";

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="accountType" value={accountType} readOnly />
        <input type="hidden" name="phoneDialCode" value={dial} readOnly aria-hidden />

        <div className="space-y-2">
          <Label className="text-foreground text-sm">Account type</Label>
          <div
            className="flex w-full rounded-full border border-border bg-muted/40 p-0.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/90"
            role="group"
            aria-label="Account type"
          >
            <button
              type="button"
              onClick={() => setAccountType("individual")}
              aria-pressed={accountType === "individual"}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 flex-1",
                accountType === "individual" ? accountToggleActive : accountToggleInactive,
              )}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setAccountType("company")}
              aria-pressed={accountType === "company"}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 flex-1",
                accountType === "company" ? accountToggleActive : accountToggleInactive,
              )}
            >
              Company
            </button>
          </div>
        </div>

        {isCompany ? (
          <div className={cn("space-y-3", authFormPanelClass)}>
            <h2 className="sr-only">Organization</h2>
            <div className="space-y-1.5">
              <Label htmlFor="signup-company-name">Company name</Label>
              <Input
                id="signup-company-name"
                name="companyName"
                type="text"
                autoComplete="organization"
                placeholder="Acme Sdn Bhd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={cn(authInputClass, inputErrorClass(!!companyNameError))}
                aria-invalid={!!companyNameError}
              />
              <FieldError message={companyNameError} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-business-email">Business email</Label>
              <Input
                id="signup-business-email"
                name="businessEmail"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="hello@yourcompany.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className={cn(authInputClass, inputErrorClass(!!businessEmailError))}
                aria-invalid={!!businessEmailError}
              />
              <FieldError message={businessEmailError} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-name">Primary contact</Label>
              <Input
                id="signup-name"
                name="contactName"
                type="text"
                autoComplete="name"
                placeholder="Primary contact full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(authInputClass, inputErrorClass(!!nameError))}
                aria-invalid={!!nameError}
              />
              <FieldError message={nameError} />
            </div>
          </div>
        ) : (
          <div className={cn("space-y-3", authFormPanelClass)}>
            <h2 className="sr-only">Your details</h2>
            <div className="space-y-1.5">
              <Label htmlFor="signup-name">Full name</Label>
              <Input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Tan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(authInputClass, inputErrorClass(!!nameError))}
                aria-invalid={!!nameError}
              />
              <FieldError message={nameError} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
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
          </div>
        )}

        <div
          className={cn(
            authFormPanelClass,
            "space-y-2 py-2.5",
            phoneError && "ring-2 ring-destructive/30 border-destructive dark:ring-destructive/40",
          )}
        >
          <div className="space-y-0.5">
            <Label className="text-foreground text-sm">Phone number</Label>
            <p className="text-[11px] text-muted-foreground leading-snug">
              {isCompany ? "For onboarding, verification, and priority support." : "For verification and account security."}
            </p>
          </div>
          <div className="grid grid-cols-1 min-[400px]:grid-cols-[minmax(10.25rem,11.5rem)_1fr] gap-2">
            <Select value={dial} onValueChange={setDial}>
              <SelectTrigger
                className={cn(
                  authSelectTriggerClass,
                  phoneError && "border-destructive",
                  "min-w-0 min-[400px]:min-w-[10.25rem]",
                  "[&>span]:line-clamp-none",
                  "[&>span]:flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:justify-start [&>span]:gap-1.5",
                )}
              >
                <SelectValue
                  placeholder="Code"
                  className="flex min-w-0 flex-1 items-center justify-start gap-1.5 whitespace-nowrap text-left text-sm data-[placeholder]:text-muted-foreground"
                />
              </SelectTrigger>
              <SelectContent className="max-h-72 min-w-[var(--radix-select-trigger-width)] sm:min-w-56">
                {dialCodes.map((d) => (
                  <SelectItem key={d.value} value={d.value} textValue={`${d.country} ${d.label}`}>
                    <span className="flex items-center gap-1.5 pr-0.5 whitespace-nowrap">
                      <DialCodeFlag iso={d.iso} title={d.country} />
                      <span className="text-sm font-medium tabular-nums leading-none">{d.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="signup-phone"
              name="phoneNational"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="12 345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn(authInputClass, "min-w-0", inputErrorClass(!!phoneError))}
              aria-invalid={!!phoneError}
              aria-label="Phone number without country code"
            />
          </div>
          <FieldError message={phoneError} />
        </div>

        <div className={cn("space-y-3", authFormPanelClass)}>
          <h2 className="sr-only">Security</h2>
          <div className="space-y-1.5">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(authInputClass, "pr-11", inputErrorClass(passwordFieldInvalid))}
                aria-invalid={passwordFieldInvalid}
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

            {password.length > 0 ? (
              <div className="space-y-1.5 pt-0.5" aria-live="polite">
                <div className="flex gap-1.5" aria-hidden>
                  {[1, 2, 3, 4].map((seg) => {
                    const meets = passwordMeetsRules(password);
                    const active = meets && seg <= strength.score;
                    const tier = strength.score <= 1 ? "fair" : strength.score === 2 ? "good" : ("strong" as const);
                    return (
                      <div
                        key={seg}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-colors",
                          !meets && "bg-muted",
                          meets && !active && "bg-muted",
                          active && tier === "fair" && "bg-amber-500 dark:bg-amber-400",
                          active && tier === "good" && "bg-foreground/45 dark:bg-foreground/50",
                          active && tier === "strong" && "bg-emerald-600 dark:bg-emerald-500",
                        )}
                      />
                    );
                  })}
                </div>
                {passwordMeetsRules(password) ? (
                  <p className="text-xs font-medium text-foreground">
                    Strength: <span className="text-muted-foreground">{strength.label}</span>
                  </p>
                ) : passwordRuleHints(password).length > 0 ? (
                  <ul
                    className={cn(
                      "text-xs space-y-0.5 list-disc pl-4",
                      submitAttempted ? "text-destructive font-medium" : "text-muted-foreground",
                    )}
                  >
                    {passwordRuleHints(password).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {password.length === 0 ? (
              <p className="text-[11px] text-muted-foreground leading-snug">
                At least 8 characters; mix letters, numbers, and symbols.
              </p>
            ) : null}
            <FieldError message={passwordError} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="signup-confirm">Confirm password</Label>
            <div className="relative">
              <Input
                id="signup-confirm"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={cn(authInputClass, "pr-11", inputErrorClass(!!confirmError))}
                aria-invalid={!!confirmError}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-r-xl text-muted-foreground hover:text-foreground transition-colors focus-ring"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <FieldError message={confirmError} />
          </div>
        </div>

        <div className="space-y-3 pt-0.5">
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="signup-terms"
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c === true)}
              className={cn("mt-0.5 rounded-[4px]", termsError && "border-destructive data-[state=unchecked]:border-destructive")}
              aria-required
              aria-labelledby="signup-terms-label"
              aria-invalid={!!termsError}
            />
            <div className="space-y-1.5 min-w-0 flex-1">
              <div id="signup-terms-label" className="text-sm font-normal text-muted-foreground leading-snug">
                I agree to the{" "}
                <button type="button" className={authLegalTriggerClass} onClick={openTerms}>
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className={authLegalTriggerClass} onClick={openPrivacy}>
                  Privacy Policy
                </button>
                .
              </div>
              <FieldError message={termsError} />
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="signup-updates"
              checked={updates}
              onCheckedChange={(c) => setUpdates(c === true)}
              className="mt-0.5 rounded-[4px]"
            />
            <Label htmlFor="signup-updates" className="text-sm font-normal text-muted-foreground cursor-pointer leading-snug">
              Email me product updates and tips (optional).
            </Label>
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-1 h-11 w-full rounded-full text-sm font-medium focus-ring sm:h-12 sm:text-base">
          Create account
        </Button>

        <p className="text-center text-[10px] text-muted-foreground leading-snug">
          You will verify your email before full access is turned on. No charges during your trial.
        </p>
      </form>
      {modals}
    </>
  );
}
