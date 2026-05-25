<template>
  <div class="snackbar-provider">
    <v-snackbar
      v-for="msg in queue"
      :key="msg.id"
      :model-value="true"
      :color="msg.color"
      :timeout="msg.timeout"
      location="bottom end"
      @update:model-value="dismiss(msg.id)"
    >
      <div class="d-flex align-center">
        <v-icon v-if="msg.icon" :icon="msg.icon" class="me-2" />
        {{ msg.text }}
      </div>

      <template #actions>
        <v-btn variant="text" icon="mdi-close" size="small" @click="dismiss(msg.id)" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
const { queue, dismiss } = useSnackbar();
</script>
