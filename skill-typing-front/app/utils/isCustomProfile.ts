export default function isCustomProfile(
  profile: unknown,
): profile is { "cognito:username": string; email: string } {
  return (
    typeof profile === "object" &&
    profile !== null &&
    "cognito:username" in profile &&
    typeof (profile as Record<string, unknown>)["cognito:username"] ===
      "string" &&
    typeof (profile as Record<string, unknown>).email === "string"
  );
}
