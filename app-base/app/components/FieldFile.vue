<template>
  <div>
    <div v-if="label" class="text-body-2 text-medium-emphasis mb-2">{{ label }}</div>

    <v-img
      v-if="previewSrc"
      :src="previewSrc"
      max-height="200"
      max-width="200"
      rounded="lg"
      cover
      class="mb-3 bg-grey-darken-3"
    />

    <v-file-upload
      :model-value="fileModel"
      :accept="accept"
      density="comfortable"
      clearable
      @update:model-value="onFileChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [File, null], default: null },
  currentUrl: { type: String, default: "" },
  label: { type: String, default: "File" },
  accept: { type: String, default: "image/*" },
});

const emit = defineEmits(["update:modelValue"]);

const localPreview = ref(null);
const fileModel = ref(null);

const previewSrc = computed(() => {
  if (localPreview.value) return localPreview.value;
  return props.currentUrl || null;
});

function onFileChange(files) {
  const file = Array.isArray(files) ? files[0] : files;
  if (localPreview.value) URL.revokeObjectURL(localPreview.value);

  if (file) {
    localPreview.value = URL.createObjectURL(file);
    fileModel.value = file;
  } else {
    localPreview.value = null;
    fileModel.value = null;
  }
  emit("update:modelValue", file || null);
}

onBeforeUnmount(() => {
  if (localPreview.value) URL.revokeObjectURL(localPreview.value);
});
</script>
