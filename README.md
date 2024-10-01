# Slick Nestjs Keycloak

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

- `@nestjs/common`: `^10.4.4`
- `@nestjs/config`: `^3.2.3`
- `@nestjs/core`: `^10.4.4`

Keycloak

- `keycloak-connect`: `^25.0.6`
- `nest-keycloak-connect`: `^1.10.1`
