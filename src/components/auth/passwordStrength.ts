/** Password policy: ≥8 chars, at least one letter, at least one digit. Symbols optional. */
export function passwordMeetsRules(password: string): boolean {
  if (password.length < 8) return false;
  if (!/[a-zA-Z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
}

export function passwordRuleHints(password: string): string[] {
  const hints: string[] = [];
  if (password.length > 0 && password.length < 8) hints.push("Use at least 8 characters");
  if (password.length > 0 && !/[a-zA-Z]/.test(password)) hints.push("Include letters");
  if (password.length > 0 && !/\d/.test(password)) hints.push("Include a number");
  return hints;
}

export type StrengthLabel = "Too weak" | "Fair" | "Good" | "Strong";

/**
 * Strength when rules are met (e.g. "Aimankhair1234" → Good or Strong).
 * Score 1–4 maps to segmented meter; 0 = rules not met.
 */
export function passwordStrengthScore(password: string): { score: number; label: StrengthLabel } {
  if (!passwordMeetsRules(password)) {
    return { score: 0, label: "Too weak" };
  }

  const len = password.length;
  const mixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  let score = 1;
  if (len >= 10) score++;
  if (len >= 12 || mixedCase) score++;
  if (len >= 14 || hasSymbol || (mixedCase && len >= 10)) score++;
  score = Math.min(4, score);

  const label: StrengthLabel =
    score === 1 ? "Fair" : score === 2 ? "Good" : "Strong";

  return { score, label };
}
