# My App

Nuxt 4 + Vuetify 4 + PocketBase + Pinia ORM — via [nuxt-base](https://github.com/engoyan/nuxt-base) layers.

## Quick Start

```bash
# 1. Install dependencies
pnpm install
cp .env.example .env

# 2. Start PocketBase (data stored in pb_data/)
pocketbase serve --http="127.0.0.1:8090" --dir=./pb_data

# 3. Start Nuxt dev server
pnpm dev
```

Create a superuser on first run: open `http://127.0.0.1:8090/_/` and follow the setup wizard, then add the credentials to `.env`:

```env
NUXT_POCKETBASE_ADMIN_EMAIL=you@example.com
NUXT_POCKETBASE_ADMIN_PASSWORD=your-password
```

## Example: Tasks Collection

### 1. Create a PocketBase collection

Open `http://127.0.0.1:8090/_/` → **New collection** → name it `tasks`, add fields:

| Field    | Type    |
|----------|---------|
| `title`  | Text    |
| `done`   | Boolean |

### 2. Create a model

```javascript
// app/models/Task.js
export default class Task extends BaseModel {
  static entity = "tasks";

  static fields() {
    return {
      id: this.string(""),
      title: this.string(""),
      done: this.boolean(false),
    };
  }
}
```

### 3. Sync on load

Add `Task` to the sync plugin:

```javascript
// app/plugins/sync-collections.client.js
import Task from "@/models/Task";

const SYNC_MODELS = [Task];

export default defineNuxtPlugin(async () => {
  await Promise.all(
    SYNC_MODELS.map((M) =>
      M.sync().catch((err) =>
        console.warn(`[sync] ${M.entity}:`, err?.message),
      ),
    ),
  );
});
```

### 4. Display on a page

```vue
<!-- app/pages/index.vue -->
<template>
  <v-container max-width="600">
    <v-card>
      <v-card-title>Tasks</v-card-title>
      <v-list>
        <v-list-item
          v-for="task in tasks"
          :key="task.id"
          :title="task.title"
        >
          <template #prepend>
            <v-icon :color="task.done ? 'success' : undefined">
              {{ task.done ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
            </v-icon>
          </template>
        </v-list-item>
        <v-list-item v-if="!tasks.length" title="No tasks yet" />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import Task from "@/models/Task";
const tasks = computed(() => useRepo(Task).all());
</script>
```

## Configuration

Edit `app/app.config.ts` to customize title, menu, and auth settings:

```typescript
export default defineAppConfig({
  nuxtBase: {
    title: "My App",
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
      { text: "Tasks", to: "/tasks", icon: "mdi-checkbox-marked-outline" },
    ],
  },
});
```

## What's Included

| Layer | What you get |
|-------|-------------|
| **app-base** | `AppLayout`, `UserMenu`, `LoginForm`, `CollectionView`, auth middleware |
| **vuetify** | Vuetify 4, MDI icons, dark theme, `sass-embedded` |
| **orm** | Pinia ORM with auto-imported models |
| **pb** | `usePocketBase()`, `BaseModel` (sync, subscribe, CRUD, file URLs) |

## Production

```bash
pnpm build
pnpm preview
```
