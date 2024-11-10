# Slick Nestjs Keycloak

Available on npmjs.org : [@slickteam/nestjs-keycloak](https://www.npmjs.com/package/@slickteam/nestjs-keycloak)

## Usage

- Install dependency

```bash
npm i -S @slickteam/nestjs-keycloak
```

- In your environment file, add these lines :

```conf
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=
KEYCLOAK_CLIENT_ID=
KEYCLOAK_CLIENT_SECRET=5000
# Optionnel
KEYCLOAK_POLICY_ENFORCEMENT_MODE=permissive
KEYCLOAK_TOKEN_VALIDATION=offline
```

- In module where you want use this module, add this :

```ts
import { KeycloakModule } from '@slickteam/nestjs-keycloak';

@Module({
  imports: [KeycloakModule],
  controllers: [],
  providers: [],
  exports: [],
})
class ExempleModule {}
```

## Dependencies version

Nestjs

- `@nestjs/common`: `^10.4.7`
- `@nestjs/config`: `^3.3.0`
- `@nestjs/core`: `^10.4.7`

Keycloak

- `keycloak-connect`: `^26.0.5`
- `nest-keycloak-connect`: `^1.10.1`
