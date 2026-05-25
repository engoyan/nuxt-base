<template>
  <div>
    <div class="text-subtitle-2 mb-3">Theme</div>
    <v-item-group v-model="selected" mandatory @update:model-value="onSelect">
      <v-row dense>
        <v-col v-for="option in options" :key="option.value" cols="4">
          <v-item v-slot="{ isSelected, toggle }" :value="option.value">
            <v-card
              :variant="isSelected ? 'outlined' : 'flat'"
              :color="isSelected ? 'primary' : undefined"
              rounded="lg"
              class="theme-preview-card"
              @click="toggle"
            >
              <div class="theme-preview" :class="option.previewClass">
                <div class="preview-bar" />
                <div class="preview-content">
                  <div class="preview-line short" />
                  <div class="preview-line" />
                </div>
              </div>
              <v-card-text class="text-center text-caption pa-2">
                <v-icon :icon="option.icon" size="small" class="me-1" />
                {{ option.label }}
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

const options = [
  { value: "light", label: "Light", icon: "mdi-white-balance-sunny", previewClass: "preview-light" },
  { value: "dark", label: "Dark", icon: "mdi-moon-waning-crescent", previewClass: "preview-dark" },
  { value: "system", label: "System", icon: "mdi-laptop", previewClass: "preview-system" },
];

const selected = ref("dark");

onMounted(() => {
  selected.value = localStorage.getItem("userTheme") || "system";
});

function onSelect(value) {
  localStorage.setItem("userTheme", value);

  if (value === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme.global.name.value = prefersDark ? "dark" : "light";
  } else {
    theme.global.name.value = value;
  }
}
</script>

<style scoped>
.theme-preview-card {
  cursor: pointer;
  transition: border-color 0.2s;
}

.theme-preview {
  height: 60px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.preview-bar {
  height: 10px;
}

.preview-content {
  flex: 1;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-line {
  height: 4px;
  border-radius: 2px;
  width: 80%;
}

.preview-line.short {
  width: 50%;
}

.preview-light .preview-bar {
  background: #e0e0e0;
}
.preview-light {
  background: #fafafa;
}
.preview-light .preview-line {
  background: #bdbdbd;
}

.preview-dark .preview-bar {
  background: #333;
}
.preview-dark {
  background: #1e1e1e;
}
.preview-dark .preview-line {
  background: #555;
}

.preview-system .preview-bar {
  background: linear-gradient(to right, #e0e0e0 50%, #333 50%);
}
.preview-system {
  background: linear-gradient(to right, #fafafa 50%, #1e1e1e 50%);
}
.preview-system .preview-line {
  background: linear-gradient(to right, #bdbdbd 50%, #555 50%);
}
</style>
