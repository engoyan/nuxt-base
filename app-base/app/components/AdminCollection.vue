<template>
  <v-card
    :rounded="rounded"
    :flat="flat"
    :color="color"
  >
    <v-toolbar :color="toolbarColor || 'primary'">
      <v-icon
        v-if="icon"
        class="ml-4"
      >{{ icon }}</v-icon>
      <v-toolbar-title>{{ title || model?.entity || 'Collection' }}</v-toolbar-title>
      <v-spacer />

      <v-text-field
        v-if="view !== 'slot' && !noSearch"
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        class="me-4"
        style="max-width: 240px"
      />

      <slot name="toolbar.actions">
        <v-btn
          v-if="allowAddItem"
          icon
          v-tooltip="'Add item'"
          @click="editingItem = {}"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </slot>
    </v-toolbar>

    <template v-if="view === 'slot'">
      <slot />
    </template>

    <template v-else>
      <ClientOnly>
        <v-data-table
          v-if="currentView === 'table'"
          :search="search"
          :headers="computedHeaders"
          :items="items"
          :loading="loading"
          :sort-by="[{ key: 'created', order: 'desc' }]"
          :items-per-page="itemsPerPage"
          @click:row="onRowClick"
        >
          <template
            v-for="(_, name) in $slots"
            #[name]="slotData"
          >
            <slot
              :name="name"
              v-bind="slotData ?? {}"
            />
          </template>
        </v-data-table>

        <template v-else>
          <v-row class="pa-4">
            <v-col
              v-for="item in items"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <slot
                name="card"
                :item="item"
              >
                <v-card
                  rounded="lg"
                  class="card-item"
                  :loading="isLoading?.(item)"
                  @click="onCardClick(item)"
                >
                  <v-img
                    v-if="item[itemImageKey]"
                    :src="item[itemImageKey]"
                    height="160"
                    cover
                  />
                  <v-card-title class="text-subtitle-2">
                    {{ item[itemTitleKey] || item.id }}
                  </v-card-title>
                </v-card>
              </slot>
            </v-col>
          </v-row>
        </template>
      </ClientOnly>
    </template>
  </v-card>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  model: { type: Function, default: null },
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
  rounded: { type: String, default: undefined },
  flat: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  toolbarColor: { type: String, default: "" },
  view: { type: String, default: "table" },
  viewPath: { type: String, default: "" },
  cardViewPath: { type: String, default: "" },
  allowAddItem: { type: Boolean, default: true },
  noActions: { type: [Boolean, String], default: false },
  noSearch: { type: Boolean, default: false },
  itemTitleKey: { type: String, default: "title" },
  itemImageKey: { type: String, default: "image" },
  isLoading: { type: Function, default: null },
  tableAppendHeaders: { type: Array, default: () => [] },
  editFields: { type: Array, default: () => [] },
  itemsPerPage: { type: Number, default: 15 },
});

const emit = defineEmits(["select"]);

const search = ref("");
const editingItem = ref(null);
const currentView = ref(props.view === "grid" ? "grid" : "table");

const repo = props.model ? useRepo(props.model) : null;
const items = computed(() => (repo ? repo.all() : []));
const loading = computed(() => repo && items.value.length === 0);

const baseHeaders = computed(() => {
  if (!props.model) return [];
  const hidden = new Set(["id", "created", "updated", "meta", "image", "src", "src_type", "favorite"]);
  const fileFields = new Set(Object.keys(props.model.fileFields || {}));
  const fieldDefs = props.model.fields();
  return Object.keys(fieldDefs)
    .filter((key) => !hidden.has(key) && !key.endsWith("Url") && !fileFields.has(key))
    .map((key) => ({
      title: key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim(),
      key,
      align: "start",
    }));
});

const computedHeaders = computed(() => {
  if (props.tableAppendHeaders.length) {
    const appendKeys = new Set(props.tableAppendHeaders.map((h) => h.key));
    const base = baseHeaders.value.filter((h) => !appendKeys.has(h.key));
    return [...base, ...props.tableAppendHeaders];
  }
  return baseHeaders.value;
});

function onRowClick(_, { item }) {
  if (props.cardViewPath) {
    router.push(`${props.cardViewPath}/${item.id}`);
  } else {
    emit("select", item);
  }
}

function onCardClick(item) {
  if (props.cardViewPath) {
    router.push(`${props.cardViewPath}/${item.id}`);
  } else {
    emit("select", item);
  }
}
</script>

<style scoped>
.card-item {
  cursor: pointer;
  transition: transform 0.15s ease;
}
.card-item:hover {
  transform: translateY(-2px);
}
</style>
