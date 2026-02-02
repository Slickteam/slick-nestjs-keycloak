import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  EnforcerOptions,
  KeycloakConnectModule,
  KeycloakUser,
  PolicyEnforcementMode,
  Public,
  Resource,
  ResourceGuard,
  RoleGuard,
  Roles,
  Scopes,
  TokenValidation,
} from 'nest-keycloak-connect';

import { IKeycloakUser } from './keycloak.interface';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const policyEnforcement = configService.get('KEYCLOAK_POLICY_ENFORCEMENT_MODE') ?? PolicyEnforcementMode.PERMISSIVE;
        const tokenValidation = configService.get('KEYCLOAK_TOKEN_VALIDATION') ?? TokenValidation.OFFLINE;

        return {
          authServerUrl: configService.getOrThrow('KEYCLOAK_URL'),
          realm: configService.getOrThrow('KEYCLOAK_REALM'),
          clientId: configService.getOrThrow('KEYCLOAK_CLIENT_ID'),
          secret: configService.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
          policyEnforcement,
          tokenValidation,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
class KeycloakModule {}

export {
  AuthGuard,
  EnforcerOptions,
  IKeycloakUser,
  KeycloakModule,
  KeycloakUser,
  PolicyEnforcementMode,
  Public,
  Resource,
  ResourceGuard,
  RoleGuard,
  Roles,
  Scopes,
  TokenValidation,
};
