/**
 * Represents a decoded Keycloak JWT token payload.
 * Contains standard OIDC claims and Keycloak-specific fields.
 */
export interface IKeycloakUser {
  /** Token expiration timestamp (Unix epoch) */
  exp: number;
  /** Token issued at timestamp (Unix epoch) */
  iat: number;
  /** Session authentication timestamp (Unix epoch) */
  auth_time: number;
  /** Issuer URL (Keycloak realm URL) */
  iss: string;
  /** Subject - Keycloak user unique identifier */
  sub: string;
  /** Audience - intended recipient of the token */
  aud: string;
  /** Token type (e.g., "Bearer") */
  typ: string;
  /** Realm-level role assignments */
  realm_access: { roles: string[] };
  /** Session identifier */
  sid: string;
  /** OAuth scopes granted to this token */
  scope: string;
  /** Whether the user's email has been verified */
  email_verified: boolean;
  /** User's email address */
  email: string;
  /** User's full name (given_name + family_name) */
  name: string;
  /** User's first name */
  given_name: string;
  /** User's last name */
  family_name: string;
  /** User's preferred username for display */
  preferred_username: string;
}
