<template>
  <v-textarea
    :model-value="modelValue"
    :label="label"
    variant="outlined"
    rows="6"
    auto-grow
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "Content" },
});

defineEmits(["update:modelValue"]);
</script>
