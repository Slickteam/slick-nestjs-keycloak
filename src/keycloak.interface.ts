export interface KeycloakUser {
  exp: number; // Timestamp token expiration
  iat: number; // Timestamp token issued at
  auth_time: number; // Timestamp session authentification
  iss: string; // Issuer url
  sub: string; // Keycloak user ID
  aud: string; // Audience
  typ: string; // Type of token
  realm_access: { roles: string[] };
  sid: string; // Session id
  scope: string;
  email_verified: boolean;
  email: string;
  name: string; // Full name
  given_name: string;
  family_name: string;
  preferred_username: string;
}
