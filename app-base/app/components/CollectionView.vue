<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon :icon="icon" /> &nbsp; {{ title || model.entity }}

      <v-spacer />

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        class="me-4"
        style="max-width: 300px"
      />

      <v-btn-toggle v-model="viewMode" mandatory density="compact" variant="outlined">
        <v-btn value="table" icon="mdi-table" />
        <v-btn value="cards" icon="mdi-view-grid" />
      </v-btn-toggle>
    </v-card-title>

    <v-divider />

    <ClientOnly>
      <v-data-table
        v-if="viewMode === 'table'"
        :search="search"
        :headers="tableHeaders"
        :items="items"
        :loading="!items.length"
        :sort-by="sortBy"
        :items-per-page="itemsPerPage"
        :filter-keys="filterKeys"
        @click:row="(_, { item }) => (editingItem = item)"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData ?? {}" />
        </template>
      </v-data-table>

      <v-data-iterator
        v-else
        :items="items"
        :search="search"
        :items-per-page="cardItemsPerPage"
        :sort-by="sortBy"
        :filter-keys="filterKeys"
      >
        <template #default="{ items: pageItems }">
          <v-row class="pa-4">
            <v-col
              v-for="item in pageItems"
              :key="item.raw.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              style="cursor: pointer"
              @click="editingItem = item.raw"
            >
              <slot name="card" :item="item.raw">
                <v-card rounded="lg">
                  <v-card-text>
                    <div
                      v-for="field in displayFields"
                      :key="field.key"
                      class="mb-1"
                    >
                      <span class="text-medium-emphasis text-caption">
                        {{ field.title }}
                      </span>
                      <div>{{ item.raw[field.key] }}</div>
                    </div>
                  </v-card-text>
                </v-card>
              </slot>
            </v-col>
          </v-row>
        </template>

        <template #footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              density="comfortable"
              icon="mdi-arrow-left"
              variant="tonal"
              rounded
              @click="prevPage"
            />

            <div class="mx-2 text-body-small">
              Page {{ page }} of {{ pageCount }}
            </div>

            <v-btn
              :disabled="page >= pageCount"
              density="comfortable"
              icon="mdi-arrow-right"
              variant="tonal"
              rounded
              @click="nextPage"
            />
          </div>
        </template>
      </v-data-iterator>

      <EditCollectionItem
        v-model:item="editingItem"
        :model="model"
      >
        <template v-for="(_, name) in fieldSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData ?? {}" />
        </template>
      </EditCollectionItem>
    </ClientOnly>
  </v-card>
</template>

<script setup>
const slots = useSlots();
const fieldSlots = computed(() => {
  const result = {};
  for (const name of Object.keys(slots)) {
    if (name.startsWith("field.")) result[name] = slots[name];
  }
  return result;
});

const props = defineProps({
  model: { type: Function, required: true },
  title: { type: String, default: "" },
  icon: { type: String, default: "mdi-database" },
  headers: { type: Array, default: null },
  filterKeys: { type: Array, default: undefined },
  sortBy: { type: Array, default: () => [{ key: "created", order: "desc" }] },
  itemsPerPage: { type: Number, default: 10 },
  cardItemsPerPage: { type: Number, default: 12 },
});

const search = ref("");
const editingItem = ref(null);

const storageKey = `collectionView:${props.model.entity}:viewMode`;
const viewMode = ref("table");

onMounted(() => {
  const saved = localStorage.getItem(storageKey);
  if (saved) viewMode.value = saved;
});
watch(viewMode, (val) => localStorage.setItem(storageKey, val));

const repo = useRepo(props.model);
const items = computed(() => repo.all());

const hiddenFields = new Set(["id", "created", "updated"]);

const displayFields = computed(() => {
  const fieldDefs = props.model.fields();
  const fileFieldKeys = new Set(Object.keys(props.model.fileFields || {}));

  return Object.keys(fieldDefs)
    .filter((key) => {
      if (hiddenFields.has(key)) return false;
      if (fileFieldKeys.has(key)) return false;
      if (key.endsWith("Url")) return false;
      return true;
    })
    .map((key) => ({
      title: camelToTitle(key),
      key,
    }));
});

const tableHeaders = computed(() => props.headers || displayFields.value);

function camelToTitle(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
</script>
