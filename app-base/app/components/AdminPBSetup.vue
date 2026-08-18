<template>
  <v-alert
    v-if="needsSetup"
    type="error"
    variant="tonal"
    class="mb-4"
    prominent
    closable
  >
    <template #title>Collections Not Found</template>
    <template #text>
      <p class="mb-2">
        Missing collections: <strong>{{ missingCollections.join(", ") }}</strong>.
        Click below to create them automatically.
      </p>
      <v-btn
        prepend-icon="mdi-database-import"
        color="error"
        variant="flat"
        :loading="loading"
        @click="runSetup"
      >
        Import Collections
      </v-btn>
    </template>
  </v-alert>
</template>

<script setup>
const props = defineProps({
  schema: { type: Array, required: true },
});

const pb = usePocketBase();
const needsSetup = ref(false);
const missingCollections = ref([]);
const loading = ref(false);

onMounted(async () => {
  try {
    const names = props.schema.map((c) => c.name).filter(Boolean);
    for (const name of names) {
      try {
        await pb.collections.getOne(name);
      } catch {
        missingCollections.value.push(name);
      }
    }
    needsSetup.value = missingCollections.value.length > 0;
  } catch {
    needsSetup.value = true;
    missingCollections.value = props.schema.map((c) => c.name);
  }
});

async function runSetup() {
  loading.value = true;
  try {
    const toImport = props.schema.filter((c) =>
      missingCollections.value.includes(c.name),
    );
    for (const collection of toImport) {
      await pb.collections.create(collection);
    }
    needsSetup.value = false;
    missingCollections.value = [];
    AppMessage.success("Collections created successfully!");
  } catch (err) {
    console.error("[AdminPBSetup]", err);
    AppMessage.error("Failed to import collections: " + (err?.message || "unknown error"));
  } finally {
    loading.value = false;
  }
}
</script>
