# @slickteam/nestjs-keycloak

Module NestJS pour intégrer facilement l'authentification Keycloak avec des guards pré-configurés.

[![npm version](https://img.shields.io/npm/v/@slickteam/nestjs-keycloak.svg)](https://www.npmjs.com/package/@slickteam/nestjs-keycloak)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Fonctionnalités

- Configuration simplifiée via variables d'environnement
- Guards d'authentification et de rôles pré-configurés
- Décorateurs pour la gestion des accès (`@Public`, `@Roles`, `@Scopes`, `@Resource`)
- Interface TypeScript pour l'utilisateur Keycloak (`IKeycloakUser`)
- Support du mode de validation online/offline des tokens

## Installation

```bash
npm install @slickteam/nestjs-keycloak
```

## Configuration

### Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
# Obligatoires
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=my-realm
KEYCLOAK_CLIENT_ID=my-client
KEYCLOAK_CLIENT_SECRET=my-secret

# Optionnelles
KEYCLOAK_POLICY_ENFORCEMENT_MODE=permissive  # permissive | enforcing
KEYCLOAK_TOKEN_VALIDATION=offline            # online | offline | none
```

### Import du module

Importez `KeycloakModule` dans le module où vous souhaitez activer l'authentification :

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeycloakModule } from '@slickteam/nestjs-keycloak';

@Module({
  imports: [ConfigModule.forRoot(), KeycloakModule],
})
export class AppModule {}
```

> **Note** : Le `ConfigModule` de NestJS doit être importé pour que les variables d'environnement soient accessibles.

## Utilisation

### Routes publiques

Par défaut, toutes les routes sont protégées. Utilisez le décorateur `@Public()` pour rendre une route accessible sans authentification :

```typescript
import { Controller, Get } from '@nestjs/common';
import { Public } from '@slickteam/nestjs-keycloak';

@Controller('health')
export class HealthController {
  @Get()
  @Public()
  check() {
    return { status: 'ok' };
  }
}
```

### Restriction par rôles

Utilisez le décorateur `@Roles()` pour restreindre l'accès à certains rôles :

```typescript
import { Controller, Get } from '@nestjs/common';
import { Roles } from '@slickteam/nestjs-keycloak';

@Controller('admin')
export class AdminController {
  @Get()
  @Roles({ roles: ['admin'] })
  getAdminData() {
    return { message: 'Admin only' };
  }
}
```

### Récupérer l'utilisateur connecté

Utilisez le décorateur `@KeycloakUser()` pour accéder aux informations de l'utilisateur :

```typescript
import { Controller, Get } from '@nestjs/common';
import { IKeycloakUser, KeycloakUser } from '@slickteam/nestjs-keycloak';

@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@KeycloakUser() user: IKeycloakUser) {
    return {
      id: user.sub,
      email: user.email,
      name: user.name,
      roles: user.realm_access.roles,
    };
  }
}
```

## API

### Exports disponibles

| Export                  | Description                                 |
| ----------------------- | ------------------------------------------- |
| `KeycloakModule`        | Module principal à importer                 |
| `IKeycloakUser`         | Interface TypeScript de l'utilisateur       |
| `KeycloakUser`          | Décorateur pour injecter l'utilisateur      |
| `Public`                | Décorateur pour les routes publiques        |
| `Roles`                 | Décorateur pour restreindre par rôles       |
| `Scopes`                | Décorateur pour restreindre par scopes      |
| `Resource`              | Décorateur pour définir une ressource       |
| `AuthGuard`             | Guard d'authentification                    |
| `RoleGuard`             | Guard de vérification des rôles             |
| `ResourceGuard`         | Guard de vérification des ressources        |
| `PolicyEnforcementMode` | Enum des modes d'application des politiques |
| `TokenValidation`       | Enum des modes de validation des tokens     |
| `EnforcerOptions`       | Options de configuration de l'enforcer      |

### Interface `IKeycloakUser`

```typescript
interface IKeycloakUser {
  exp: number; // Timestamp d'expiration du token
  iat: number; // Timestamp d'émission du token
  auth_time: number; // Timestamp d'authentification de la session
  iss: string; // URL de l'émetteur
  sub: string; // ID utilisateur Keycloak
  aud: string; // Audience
  typ: string; // Type de token
  realm_access: {
    roles: string[]; // Rôles du realm
  };
  sid: string; // ID de session
  scope: string; // Scopes accordés
  email_verified: boolean; // Email vérifié
  email: string; // Adresse email
  name: string; // Nom complet
  given_name: string; // Prénom
  family_name: string; // Nom de famille
  preferred_username: string; // Nom d'utilisateur
}
```

## Dépendances

| Package                 | Version        |
| ----------------------- | -------------- |
| `@nestjs/common`        | ^11.1          |
| `@nestjs/config`        | ^4.0           |
| `@nestjs/core`          | ^11.1          |
| `keycloak-connect`      | ^26.1.1        |
| `nest-keycloak-connect` | ^2.0.0-alpha.2 |

## Licence

[MIT](LICENSE) - Slickteam
