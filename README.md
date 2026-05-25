# nuxt-base

Reusable Nuxt layers for building web apps with **Vuetify**, **PocketBase**, and **Pinia ORM**.

## Quick Start

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    ["github:engoyan/nuxt-base/app-base", { install: true }],
  ],
})
```

This single line gives you:

- **Vuetify 4** — Material Design components, MDI icons, dark theme
- **Pinia ORM** — Reactive data models with `useRepo()`
- **PocketBase** — `usePocketBase()` client, `BaseModel` with sync/subscribe/CRUD
- **App shell** — `AppLayout`, `LoginForm`, auth middleware, collection CRUD views

## Layers

```
app-base ──► vuetify
         ──► orm
         ──► pb
```

### app-base

The main entry point. Extends all three foundation layers.

| What | Description |
|------|-------------|
| `AppLayout` | Top bar + responsive side/bottom nav |
| `LoginForm` | PocketBase login/signup form |
| `CollectionView` | Generic PB-backed data table/cards with edit dialog |
| `user-auth` middleware | Redirect unauthenticated users to `/login` |
| `admin-auth` middleware | Require superuser for admin routes |

### vuetify

Vuetify 4 setup with MDI icons, sass-embedded (modern compiler API), and a dark-theme-ready plugin.

Customize the theme via `app.config.ts`:

```typescript
export default defineAppConfig({
  vuetify: {
    themes: {
      dark: { colors: { primary: "#BB86FC" } },
    },
  },
})
```

### orm

Registers `@pinia/nuxt` and `@pinia-orm/nuxt` modules. Auto-imports from `models/` directories across all layers.

### pb

PocketBase client layer.

**Composable:** `usePocketBase()` — singleton PocketBase client.

**BaseModel** — Pinia ORM base class for PocketBase-backed models:

```javascript
// app/models/Person.js
export default class Person extends BaseModel {
  static entity = "people";

  static fieldMapping = {
    first_name: "firstName",
  };

  static fileFields = {
    avatar: "300x300",
  };

  static fields() {
    return {
      id: this.string(""),
      firstName: this.string(""),
      avatar: this.string(""),
      avatarUrl: this.string(""),
    };
  }
}
```

BaseModel provides: `load()`, `sync()`, `subscribe()`, `update()`, `create()`, `mapRecord()`, `unmapRecord()`, file URL generation.

**Environment variables:**

| Variable | Purpose |
|----------|---------|
| `NUXT_PUBLIC_POCKETBASE_HOST` | PocketBase server host |
| `NUXT_PUBLIC_POCKETBASE_PORT` | PocketBase server port |
| `NUXT_POCKETBASE_ADMIN_EMAIL` | Admin email (server-side) |
| `NUXT_POCKETBASE_ADMIN_PASSWORD` | Admin password (server-side) |

## Typical Data Flow

1. Define a PocketBase collection (Admin UI or migrations)
2. Create a model extending `BaseModel` in `app/models/`
3. Call `Model.sync()` in a client plugin to load + subscribe
4. Use `useRepo(Model).all()` in pages — data is reactive

## Individual Layer Usage

For advanced cases, consume layers separately:

```typescript
extends: [
  ["github:engoyan/nuxt-base/vuetify", { install: true }],
  ["github:engoyan/nuxt-base/orm", { install: true }],
  ["github:engoyan/nuxt-base/pb", { install: true }],
]
```

## License

MIT
