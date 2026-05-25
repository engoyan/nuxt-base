<template>
  <FieldFile
    v-if="type === 'file'"
    :model-value="modelValue"
    :current-url="currentUrl"
    :label="label"
    :accept="acceptString"
    @update:model-value="$emit('update:modelValue', $event)"
  />

  <FieldEditor
    v-else-if="type === 'editor'"
    :model-value="modelValue"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
  />

  <v-select
    v-else-if="type === 'select'"
    :model-value="modelValue"
    :items="fieldMeta?.values || []"
    :label="label"
    variant="outlined"
    @update:model-value="$emit('update:modelValue', $event)"
  />

  <v-switch
    v-else-if="type === 'bool'"
    :model-value="modelValue"
    :label="label"
    color="primary"
    @update:model-value="$emit('update:modelValue', $event)"
  />

  <v-text-field
    v-else
    :model-value="modelValue"
    :label="label"
    :type="inputType"
    variant="outlined"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
import FieldFile from "./FieldFile.vue";
import FieldEditor from "./FieldEditor.vue";

const props = defineProps({
  type: { type: String, default: "text" },
  modelValue: { type: [String, Number, Boolean, File, null], default: "" },
  label: { type: String, default: "" },
  fieldMeta: { type: Object, default: null },
  currentUrl: { type: String, default: "" },
});

defineEmits(["update:modelValue"]);

const inputTypeMap = {
  email: "email",
  url: "url",
  date: "date",
  number: "number",
};

const inputType = computed(() => inputTypeMap[props.type] || "text");

const acceptString = computed(() => {
  const mimes = props.fieldMeta?.mimeTypes;
  return Array.isArray(mimes) ? mimes.join(",") : "image/*";
});
</script>
