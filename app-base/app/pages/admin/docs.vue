<template>
  <v-container
    v-if="authorized"
    max-width="860"
    class="py-8"
  >
    <!-- Hero header -->
    <div class="docs-header mb-8">
      <div class="docs-header-icon">
        <v-icon
          size="48"
          color="primary"
          >mdi-book-open-variant</v-icon
        >
      </div>
      <h1 class="text-h4 font-weight-bold mt-4">nuxt-base</h1>
      <p class="text-body-1 text-medium-emphasis mt-1">
        Developer guide for building apps with the layer system.
      </p>
    </div>

    <!-- Step 1: Architecture -->
    <v-card
      class="docs-card mb-5"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">1</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Layer Architecture</v-card-title>
      </v-card-item>
      <v-card-text class="pt-0">
        <p class="text-body-2 mb-4">
          <code>app-base</code> is the single entry point. It extends three
          foundation layers:
        </p>

        <div class="layer-diagram mb-5">
          <div class="layer-item">
            <v-avatar
              size="40"
              color="deep-purple"
              variant="tonal"
            >
              <v-icon>mdi-vuetify</v-icon>
            </v-avatar>
            <span class="text-caption font-weight-medium mt-1">vuetify</span>
          </div>
          <v-icon
            color="medium-emphasis"
            size="20"
            >mdi-plus</v-icon
          >
          <div class="layer-item">
            <v-avatar
              size="40"
              color="amber"
              variant="tonal"
            >
              <v-icon>mdi-database-cog</v-icon>
            </v-avatar>
            <span class="text-caption font-weight-medium mt-1">orm</span>
          </div>
          <v-icon
            color="medium-emphasis"
            size="20"
            >mdi-plus</v-icon
          >
          <div class="layer-item">
            <v-avatar
              size="40"
              color="blue"
              variant="tonal"
            >
              <v-icon>mdi-database</v-icon>
            </v-avatar>
            <span class="text-caption font-weight-medium mt-1">pb</span>
          </div>
          <v-icon
            color="medium-emphasis"
            size="20"
            >mdi-arrow-right</v-icon
          >
          <div class="layer-item">
            <v-avatar
              size="40"
              color="success"
              variant="tonal"
            >
              <v-icon>mdi-apps</v-icon>
            </v-avatar>
            <span class="text-caption font-weight-bold mt-1">app-base</span>
          </div>
        </div>

        <pre class="docs-code">
// nuxt.config.ts — one line gives you everything
export default defineNuxtConfig({
  extends: [
    ["github:engoyan/nuxt-base/app-base", { install: true }],
  ],
})</pre
        >
      </v-card-text>
    </v-card>

    <!-- Step 2: Individual layers -->
    <v-card
      class="docs-card mb-5"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">2</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Individual Layers</v-card-title>
        <v-card-subtitle>For fine-grained control</v-card-subtitle>
      </v-card-item>
      <v-card-text class="pt-0">
        <pre class="docs-code mb-4">
extends: [
  ["github:engoyan/nuxt-base/vuetify", { install: true }], // UI only
  ["github:engoyan/nuxt-base/orm", { install: true }],     // state only
  ["github:engoyan/nuxt-base/pb", { install: true }],      // PB client only
]</pre
        >

        <v-list
          lines="two"
          density="compact"
          class="rounded-lg"
          bg-color="transparent"
        >
          <v-list-item
            prepend-icon="mdi-vuetify"
            title="vuetify"
            subtitle="Vuetify 4, MDI icons, dark theme, sass-embedded"
          />
          <v-list-item
            prepend-icon="mdi-database-cog"
            title="orm"
            subtitle="Pinia + Pinia ORM modules, auto-import from models/"
          />
          <v-list-item
            prepend-icon="mdi-database"
            title="pb"
            subtitle="usePocketBase() composable, BaseModel class"
          />
          <v-list-item
            prepend-icon="mdi-apps"
            title="app-base"
            subtitle="All above + AppLayout, LoginForm, UserMenu, middleware, CRUD views"
          />
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Step 3: Data flow -->
    <v-card
      class="docs-card mb-5"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">3</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Data Flow</v-card-title>
        <v-card-subtitle>PocketBase → ORM → UI</v-card-subtitle>
      </v-card-item>
      <v-card-text class="pt-0">
        <v-timeline
          side="end"
          density="compact"
          line-color="primary"
        >
          <v-timeline-item
            dot-color="primary"
            size="x-small"
          >
            <div class="text-body-2 font-weight-medium">
              Define a PocketBase collection
            </div>
            <div class="text-caption text-medium-emphasis">
              Create in PocketBase Admin UI or via migrations.
            </div>
          </v-timeline-item>

          <v-timeline-item
            dot-color="primary"
            size="x-small"
          >
            <div class="text-body-2 font-weight-medium mb-2">
              Create a model
            </div>
            <pre class="docs-code docs-code--sm">
// app/models/Post.js
export default class Post extends BaseModel {
  static entity = "posts";
  static fields() {
    return {
      id: this.string(""),
      title: this.string(""),
      created: this.string(""),
    };
  }
}</pre
            >
          </v-timeline-item>

          <v-timeline-item
            dot-color="primary"
            size="x-small"
          >
            <div class="text-body-2 font-weight-medium mb-2">Sync on load</div>
            <pre class="docs-code docs-code--sm">
// app/plugins/sync.client.js
import Post from "@/models/Post";

export default defineNuxtPlugin(async () =&gt; {
  await Post.sync();
});</pre
            >
          </v-timeline-item>

          <v-timeline-item
            dot-color="success"
            size="x-small"
          >
            <div class="text-body-2 font-weight-medium mb-2">Use in pages</div>
            <pre class="docs-code docs-code--sm">
&lt;script setup&gt;
const repo = useRepo(Post);
const posts = computed(() =&gt; repo.all());
&lt;/script&gt;

&lt;template&gt;
  &lt;CollectionView :model="Post" title="Posts" /&gt;
&lt;/template&gt;</pre
            >
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Step 4: Component showcase -->
    <v-card
      class="docs-card mb-5"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">4</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Components</v-card-title>
        <v-card-subtitle>Ready to use from app-base</v-card-subtitle>
      </v-card-item>
      <v-card-text class="pt-0">
        <v-expansion-panels variant="popout">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-page-layout-sidebar-left</v-icon
              >
              AppLayout
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                Adaptive shell: side drawer on desktop, bottom nav on mobile.
              </p>
              <pre class="docs-code docs-code--sm">
&lt;AppLayout
  title="My App"
  :menu="[
    { text: 'Home', to: '/', icon: 'mdi-home' },
    { text: 'Settings', to: '/settings', icon: 'mdi-cog' },
  ]"
/&gt;</pre
              >
              <v-chip-group class="mt-3">
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >title</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >menu</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >color</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >rail</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >#app-bar-prepend</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >#app-bar-append</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >#drawer-prepend</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >#drawer-append</v-chip
                >
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-account-circle</v-icon
              >
              UserMenu
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                Avatar dropdown with profile link, theme toggle, and logout.
                Auto-rendered in AppLayout.
              </p>
              <pre class="docs-code docs-code--sm">&lt;UserMenu /&gt;</pre>
              <v-alert
                type="info"
                variant="tonal"
                density="compact"
                class="mt-3"
              >
                Uses <code>useCurrentUser()</code> composable. Shows a login
                button when unauthenticated.
              </v-alert>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-theme-light-dark</v-icon
              >
              ThemeSwitcher
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                Visual light/dark/system theme picker for settings pages.
              </p>
              <ThemeSwitcher />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-login</v-icon
              >
              LoginForm
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                PocketBase login/signup form with validation.
              </p>
              <pre class="docs-code docs-code--sm">
&lt;LoginForm
  login-image="https://..."
  image-position="right"
  collection="users"
/&gt;</pre
              >
              <v-chip-group class="mt-3">
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >login-image</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >image-position</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >collection</v-chip
                >
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-table</v-icon
              >
              CollectionView
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                Generic PB-backed data browser with table/cards toggle and edit
                dialog.
              </p>
              <pre class="docs-code docs-code--sm">
&lt;CollectionView
  :model="Person"
  title="People"
  icon="mdi-account-group"
/&gt;</pre
              >
              <v-chip-group class="mt-3">
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >model</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >title</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >icon</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >headers</v-chip
                >
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label
                  >sortBy</v-chip
                >
              </v-chip-group>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon
                start
                color="primary"
                >mdi-bell-ring</v-icon
              >
              SnackbarProvider + useSnackbar()
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-body-2 mb-3">
                Global toast notifications. Mounted in default layout.
              </p>
              <pre class="docs-code docs-code--sm">
const { success, error, info } = useSnackbar();
success("Saved!");</pre
              >
              <div class="mt-4 d-flex ga-2 flex-wrap">
                <v-btn
                  size="small"
                  color="success"
                  variant="tonal"
                  @click="snackbar.success('Action completed!')"
                >
                  <v-icon start>mdi-check-circle</v-icon> Success
                </v-btn>
                <v-btn
                  size="small"
                  color="error"
                  variant="tonal"
                  @click="snackbar.error('Something failed!')"
                >
                  <v-icon start>mdi-alert-circle</v-icon> Error
                </v-btn>
                <v-btn
                  size="small"
                  color="info"
                  variant="tonal"
                  @click="snackbar.info('Here is some info.')"
                >
                  <v-icon start>mdi-information</v-icon> Info
                </v-btn>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <!-- Step 5: Configuration -->
    <v-card
      class="docs-card mb-5"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">5</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Configuration</v-card-title>
        <v-card-subtitle>app.config.ts</v-card-subtitle>
      </v-card-item>
      <v-card-text class="pt-0">
        <pre class="docs-code">
export default defineAppConfig({
  nuxtBase: {
    title: "My App",
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
      { text: "People", to: "/people", icon: "mdi-account-group" },
    ],
    signup: true,
    profileUrl: "/profile",
    afterLoginURL: "/",
    afterSignupURL: "/",
  },
});</pre
        >
      </v-card-text>
    </v-card>

    <!-- Step 6: Environment -->
    <v-card
      class="docs-card"
      variant="flat"
    >
      <v-card-item>
        <template #prepend>
          <v-avatar
            color="primary"
            size="32"
            class="elevation-2"
          >
            <span class="text-body-2 font-weight-bold">6</span>
          </v-avatar>
        </template>
        <v-card-title class="text-h6">Environment</v-card-title>
        <v-card-subtitle>.env variables</v-card-subtitle>
      </v-card-item>
      <v-card-text class="pt-0">
        <v-list
          density="compact"
          bg-color="transparent"
          class="rounded-lg"
        >
          <v-list-item>
            <template #prepend
              ><v-icon
                color="blue"
                size="small"
                >mdi-server</v-icon
              ></template
            >
            <v-list-item-title
              ><code>NUXT_PUBLIC_POCKETBASE_HOST</code></v-list-item-title
            >
            <v-list-item-subtitle>PocketBase server URL</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <template #prepend
              ><v-icon
                color="blue"
                size="small"
                >mdi-ethernet</v-icon
              ></template
            >
            <v-list-item-title
              ><code>NUXT_PUBLIC_POCKETBASE_PORT</code></v-list-item-title
            >
            <v-list-item-subtitle
              >PocketBase port (skipped for https)</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <template #prepend
              ><v-icon
                color="amber"
                size="small"
                >mdi-shield-key</v-icon
              ></template
            >
            <v-list-item-title
              ><code>NUXT_POCKETBASE_ADMIN_EMAIL</code></v-list-item-title
            >
            <v-list-item-subtitle
              >Admin email for server-side auth</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <template #prepend
              ><v-icon
                color="amber"
                size="small"
                >mdi-lock</v-icon
              ></template
            >
            <v-list-item-title
              ><code>NUXT_POCKETBASE_ADMIN_PASSWORD</code></v-list-item-title
            >
            <v-list-item-subtitle
              >Admin password for server-side auth</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
definePageMeta({
  middleware: ["admin-auth"],
});

const { isAdmin } = useCurrentUser();
const snackbar = useSnackbar();

const mounted = ref(false);
onMounted(() => { mounted.value = true; });
const authorized = computed(() => mounted.value && isAdmin.value);
</script>

<style scoped>
.docs-header {
  text-align: center;
  padding: 2rem 0 1rem;
}

.docs-header-icon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.1);
  border: 2px solid rgba(var(--v-theme-primary), 0.2);
}

.docs-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  transition: border-color 0.2s;
}

.docs-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
}

.layer-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.layer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.docs-code {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  padding: 0.85rem 1.1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  white-space: pre;
  overflow-x: auto;
  color: rgba(var(--v-theme-on-surface), 0.9);
}

.docs-code--sm {
  font-size: 0.76rem;
  padding: 0.6rem 0.85rem;
}

code {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.82em;
  font-weight: 500;
}
</style>
