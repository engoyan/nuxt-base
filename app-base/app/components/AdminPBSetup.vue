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
        Required PocketBase collections are missing.
        Click below to import the schema and create them automatically.
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
const loading = ref(false);

onMounted(async () => {
  try {
    const names = props.schema.map((c) => c.name).filter(Boolean);
    for (const name of names) {
      try {
        await pb.collections.getOne(name);
      } catch {
        needsSetup.value = true;
        return;
      }
    }
  } catch {
    needsSetup.value = true;
  }
});

async function runSetup() {
  loading.value = true;
  try {
    await pb.collections.import(props.schema, false);
    needsSetup.value = false;
    AppMessage.success("Collections created successfully!");
  } catch (err) {
    console.error("[AdminPBSetup]", err);
    AppMessage.error("Failed to import collections");
  } finally {
    loading.value = false;
  }
}
</script>
