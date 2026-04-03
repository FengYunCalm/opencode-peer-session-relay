import type { SecurityScheme } from "@opencode-peer-session-relay/a2a-protocol";

export type AuthValidationContext = {
  authorizationHeader?: string;
};

export function validateLocalAuth(securitySchemes: SecurityScheme[], context: AuthValidationContext): boolean {
  if (securitySchemes.some((scheme) => scheme.type === "noauth")) {
    return true;
  }

  const hasBearerRequirement = securitySchemes.some((scheme) => scheme.type === "bearer");
  if (hasBearerRequirement) {
    return typeof context.authorizationHeader === "string" && context.authorizationHeader.startsWith("Bearer ");
  }

  const hasApiKeyRequirement = securitySchemes.some((scheme) => scheme.type === "apiKey");
  if (hasApiKeyRequirement) {
    return typeof context.authorizationHeader === "string" && context.authorizationHeader.length > 0;
  }

  return false;
}
