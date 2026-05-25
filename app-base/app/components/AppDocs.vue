<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>
        <v-icon
          start
          color="primary"
        >mdi-rocket-launch</v-icon>
        Getting started
      </v-card-title>

      <v-card-text>
        <ol class="docs-steps">
          <li>
            <strong>Install dependencies</strong>
            <p class="text-body-2 text-medium-emphasis mb-2">
              Uses a pnpm workspace so each layer can be developed in isolation.
            </p>
            <pre class="docs-code">pnpm install</pre>
          </li>

          <li>
            <strong>Extend the layers in <code>nuxt.config.ts</code></strong>
            <p class="text-body-2 text-medium-emphasis mb-2">
              Pull in only the layers you need. <code>app-base</code> already
              extends <code>vuetify</code> and <code>orm</code> internally.
            </p>
            <pre class="docs-code">export default defineNuxtConfig({
  extends: [
    "./nuxt-base/app-base", // <AppDocsLayerHover layer="vuetify">Vuetify</AppDocsLayerHover> + <AppDocsLayerHover layer="orm">Pinia ORM</AppDocsLayerHover> + app shell
    "./nuxt-base/pb",       // <AppDocsLayerHover layer="pb">PocketBase</AppDocsLayerHover> client
  ],
});</pre>
          </li>

          <li>
            <strong>Run the stack</strong>
            <p class="text-body-2 text-medium-emphasis mb-2">
              <AppDocsLayerHover layer="pb">PocketBase</AppDocsLayerHover>
              serves the data,
              <AppDocsLayerHover layer="orm">Pinia ORM</AppDocsLayerHover>
              caches it on the client,
              <AppDocsLayerHover layer="vuetify">Vuetify</AppDocsLayerHover>
              renders the UI.
            </p>
            <pre class="docs-code">pnpm pb     # <AppDocsLayerHover layer="pb">PocketBase</AppDocsLayerHover> backend
pnpm dev    # Nuxt app (<AppDocsLayerHover layer="vuetify">Vuetify</AppDocsLayerHover> + <AppDocsLayerHover layer="orm">Pinia ORM</AppDocsLayerHover> included)</pre>
          </li>
        </ol>

        <v-alert
          class="mt-6"
          type="info"
          variant="tonal"
          density="comfortable"
          icon="mdi-lightbulb-on-outline"
        >
          <strong>Override this page</strong> by creating
          <code>app/pages/index.vue</code> in your own app — Nuxt's page
          resolution prefers your app over the layer.
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.docs-steps {
  list-style: decimal inside;
  padding-left: 0;
}

.docs-steps > li {
  margin-bottom: 1.25rem;
}

.docs-steps > li:last-child {
  margin-bottom: 0;
}

.docs-code {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  white-space: pre;
  overflow-x: auto;
}

code {
  background: rgba(255, 255, 255, 0.06);
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  font-size: 0.85em;
}
</style>
