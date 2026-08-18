<template>
  <v-card
    flat
    max-width="900"
    class="pa-4 mx-auto"
    :loading="uploading"
  >
    <label
      class="drop-container"
      :class="{ 'drag-active': dragging }"
      @dragover.prevent
      @dragenter.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="handleDrop"
      @click="fileInputEl?.click()"
    >
      <input
        ref="fileInputEl"
        type="file"
        :multiple="multiple"
        :accept="accept"
        style="display: none"
        @change="handleFileSelect"
      />

      <v-list
        width="100%"
        bg-color="transparent"
        v-if="files.length"
      >
        <v-list-subheader>
          {{ files.length }} file{{ files.length === 1 ? '' : 's' }} selected
        </v-list-subheader>
        <v-list-item
          v-for="(file, index) in files"
          :key="index"
        >
          <template #prepend>
            <v-icon :icon="fileIcon(file)" />
          </template>
          <template #title>{{ file.name }}</template>
          <template #subtitle>{{ formatSize(file.size) }}</template>
          <template #append>
            <v-icon @click.stop="files.splice(index, 1)">mdi-close</v-icon>
          </template>
        </v-list-item>
      </v-list>

      <div
        v-else
        class="d-flex flex-column align-center"
      >
        <v-icon
          size="80"
          color="primary"
        >mdi-cloud-upload-outline</v-icon>
        <span class="text-h6 mt-2">Drag and drop files</span>
        <span class="text-body-2 text-medium-emphasis">or click to browse</span>
      </div>
    </label>

    <slot
      name="extras"
      :files="files"
    />

    <v-card-actions class="justify-center">
      <v-btn
        v-if="files.length"
        variant="text"
        prepend-icon="mdi-folder"
        @click="fileInputEl?.click()"
      >add more</v-btn>

      <v-btn
        size="large"
        color="primary"
        variant="tonal"
        :disabled="!files.length"
        :loading="uploading"
        @click="upload"
      >
        Upload {{ files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : '' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  uploadPath: { type: String, required: true },
  multiple: { type: Boolean, default: true },
  accept: { type: String, default: "*/*" },
  extraBody: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["uploaded", "error"]);

const fileInputEl = ref(null);
const files = ref([]);
const uploading = ref(false);
const dragging = ref(false);

function handleFileSelect(e) {
  addFiles(e.target.files);
}

function handleDrop(e) {
  dragging.value = false;
  addFiles(e.dataTransfer.files);
}

function addFiles(fileList) {
  for (const f of fileList) {
    files.value.push(f);
  }
}

function fileIcon(file) {
  if (file.type.startsWith("video/")) return "mdi-video-outline";
  if (file.type.startsWith("audio/")) return "mdi-music-circle-outline";
  if (file.type.startsWith("image/")) return "mdi-image-outline";
  if (file.type === "text/vtt") return "mdi-subtitles-outline";
  return "mdi-file-outline";
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function upload() {
  uploading.value = true;
  try {
    const encoded = await Promise.all(
      files.value.map(async (f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
        content: await toBase64(f),
      })),
    );

    const pb = usePocketBase();
    const res = await $fetch(`/api/${props.uploadPath}`, {
      method: "POST",
      headers: { auth: pb.authStore.exportToCookie() },
      body: { files: encoded, ...props.extraBody },
    });

    emit("uploaded", res);
    files.value = [];
  } catch (err) {
    console.error("[AppUpload]", err);
    emit("error", err);
  } finally {
    uploading.value = false;
  }
}
</script>

<style scoped>
.drop-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 20px;
  border-radius: 10px;
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.2);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.drop-container:hover,
.drop-container.drag-active {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}
</style>
