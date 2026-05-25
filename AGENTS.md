# nuxt-base

Reusable Nuxt layers monorepo. Each subdirectory is an independent Nuxt layer consumed via `extends` in `nuxt.config.ts`.

## Layer dependency graph

```
app-base ──► vuetify
         ──► orm
         ──► pb
```

Consumers extend `app-base` to get everything, or individual layers for advanced use.

## Conventions

- Each layer has its own `package.json`, `nuxt.config.ts`, and optional `app.config.ts`.
- Components live in `<layer>/app/components/`, composables in `<layer>/app/composables/`.
- Models (Pinia ORM) go in `<layer>/app/models/` and are auto-imported via the `orm` layer.
- Layers are consumed with `extends` in nuxt.config — either local (`../vuetify`) or remote (`github:engoyan/nuxt-base/vuetify`).

## Key patterns

- **PocketBase**: `usePocketBase()` returns a configured client. Env vars: `NUXT_PUBLIC_POCKETBASE_HOST`, `NUXT_PUBLIC_POCKETBASE_PORT`.
- **BaseModel**: Extend `BaseModel` (from pb layer) for PB-backed ORM models. Provides `load()`, `sync()`, `subscribe()`, `update()`, field mapping, file URLs.
- **ORM**: Place models in `models/` dir — they are auto-imported. Use `useRepo(Model)` for reactive queries.
- **Vuetify**: Configured with dark theme, MDI icons, sass-embedded modern compiler API.
- **App shell**: `AppLayout` provides top bar + responsive bottom/side navigation. `LoginForm` handles PocketBase auth.

## When modifying layers

- Don't add cross-layer imports — layers should stay independent.
- If adding a new layer, register it in `pnpm-workspace.yaml` and `package.json` workspaces.
- Test layers in isolation via the consumer app's `nuxt.config.ts` extends array.
