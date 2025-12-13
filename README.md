# Nuxt Layers

A collection of reusable Nuxt layers for building modern web applications.

## Layers

This monorepo contains the following Nuxt layers:

- **`app-base`** - Base application layer that extends `vuetify` and `orm` layers
- **`pb`** - PocketBase integration layer for backend services
- **`vuetify`** - Vuetify UI component library layer
- **`orm`** - Pinia ORM layer for state management

## Installation

### Using Git References

You can extend these layers directly from GitHub in your Nuxt project's `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ["github:engoyan/nuxt-base/app-base", "github:engoyan/nuxt-base/pb"],
});
```

### Using Individual Layers

You can extend individual layers as needed:

```typescript
// Only use Vuetify layer
extends: [
  "github:engoyan/nuxt-base/vuetify"
]

// Only use PocketBase layer
extends: [
  "github:engoyan/nuxt-base/pb"
]

// Use ORM layer
extends: [
  "github:engoyan/nuxt-base/orm"
]
```

## Layer Dependencies

- `app-base` depends on `vuetify` and `orm` (configured internally)
- Other layers are independent and can be used standalone

## Development

This is a monorepo managed with pnpm workspaces. Each layer is a separate Nuxt layer with its own `package.json` and `nuxt.config.ts`.

### Structure

```

├── app-base/     # Base app layer
├── pb/           # PocketBase layer
├── vuetify/      # Vuetify UI layer
└── orm/          # Pinia ORM layer
```

## License

MIT
