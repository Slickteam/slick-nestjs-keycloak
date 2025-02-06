import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  EnforcerOptions,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  Public,
  Resource,
  ResourceGuard,
  RoleGuard,
  Roles,
  Scopes,
  TokenValidation,
} from 'nest-keycloak-connect';

import { KeycloakUser } from './keycloak.interface';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.getOrThrow('KEYCLOAK_URL'),
        realm: configService.getOrThrow('KEYCLOAK_REALM'),
        clientId: configService.getOrThrow('KEYCLOAK_CLIENT_ID'),
        secret: configService.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
        policyEnforcement: configService.get('KEYCLOAK_POLICY_ENFORCEMENT_MODE') ?? PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: configService.get('KEYCLOAK_TOKEN_VALIDATION') ?? TokenValidation.OFFLINE,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
class KeycloakModule {}

export {
  KeycloakModule,
  KeycloakUser,
  // Keycloak lib
  AuthGuard,
  RoleGuard,
  PolicyEnforcementMode,
  TokenValidation,
  ResourceGuard,
  Public,
  Scopes,
  Roles,
  Resource,
  EnforcerOptions,
};
