<template>
  <span class="docs-hover">
    <slot>{{ doc?.title }}</slot>
    <v-menu
      v-if="doc"
      activator="parent"
      open-on-hover
      :close-on-content-click="false"
      :open-delay="120"
      :close-delay="80"
      location="bottom"
      max-width="380"
    >
      <v-card variant="elevated">
        <v-card-title>
          <v-icon
            start
            :color="doc.color"
          >{{ doc.icon }}</v-icon>
          {{ doc.title }}
        </v-card-title>
        <v-card-subtitle>{{ doc.tagline }}</v-card-subtitle>

        <v-card-text>
          <p class="text-body-2 mb-3">{{ doc.description }}</p>

          <template
            v-for="(snippet, i) in doc.snippets"
            :key="i"
          >
            <div class="text-caption text-medium-emphasis mb-1 mt-3">
              {{ snippet.label }}
            </div>
            <pre class="docs-code docs-code--sm">{{ snippet.code }}</pre>
          </template>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :href="doc.href"
            target="_blank"
            rel="noopener"
            variant="text"
            color="primary"
            append-icon="mdi-open-in-new"
          >
            Docs
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </span>
</template>

<script setup>
const props = defineProps({
  layer: {
    type: String,
    required: true,
    validator: (v) => ["pb", "orm", "vuetify"].includes(v),
  },
});

const docs = {
  pb: {
    title: "PocketBase",
    tagline: "Backend & auth",
    icon: "mdi-database",
    color: "blue",
    description:
      "Single-file backend with realtime, auth and file storage. Connected via the pb layer's usePocketBase() composable.",
    snippets: [
      {
        label: "Fetch a collection",
        code: `const pb = usePocketBase();
const posts = await pb
  .collection("posts")
  .getFullList({ sort: "-created" });`,
      },
      {
        label: "Realtime subscribe",
        code: `const pb = usePocketBase();
pb.collection("posts").subscribe("*", (e) => {
  console.log(e.action, e.record);
});`,
      },
    ],
    href: "https://pocketbase.io/docs/",
  },
  orm: {
    title: "Pinia ORM",
    tagline: "Client-side models",
    icon: "mdi-database-cog",
    color: "amber",
    description:
      "Define models in any layer's models/ folder; the orm layer auto-imports them and exposes typed repositories.",
    snippets: [
      {
        label: "Define a model (models/Post.js)",
        code: `import { Model } from "pinia-orm";

export default class Post extends Model {
  static entity = "posts";
  static fields() {
    return {
      id: this.uid(),
      title: this.string(""),
      published: this.boolean(false),
    };
  }
}`,
      },
      {
        label: "Use it from a Vue component",
        code: [
          "<script setup>",
          "const repo = useRepo(Post);",
          "const published = computed(() =>",
          '  repo.where("published", true).get(),',
          ");",
          "",
          "function publish(id) {",
          '  repo.where("id", id).update({ published: true });',
          "}",
          "<\/script>",
        ].join("\n"),
      },
    ],
    href: "https://pinia-orm.codedredd.de/",
  },
  vuetify: {
    title: "Vuetify",
    tagline: "UI components",
    icon: "mdi-vuetify",
    color: "deep-purple",
    description:
      "Vuetify 3 with Material Design Icons and a dark theme preset. Just drop v-* components into your templates.",
    snippets: [
      {
        label: "Composed card with list",
        code: `<v-card title="Inbox" prepend-icon="mdi-email">
  <v-list lines="two">
    <v-list-item
      v-for="m in messages"
      :key="m.id"
      :title="m.from"
      :subtitle="m.preview"
    />
  </v-list>
  <v-card-actions>
    <v-btn color="primary" append-icon="mdi-send">
      Reply
    </v-btn>
  </v-card-actions>
</v-card>`,
      },
    ],
    href: "https://vuetifyjs.com/en/components/all/",
  },
};

const doc = computed(() => docs[props.layer]);
</script>

<style scoped>
.docs-hover {
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  cursor: help;
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

.docs-code--sm {
  font-size: 0.78rem;
  padding: 0.5rem 0.75rem;
}
</style>
