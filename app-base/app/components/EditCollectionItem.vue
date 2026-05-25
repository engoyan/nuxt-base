<template>
  <v-dialog
    :model-value="!!item"
    fullscreen
    transition="dialog-bottom-transition"
    @update:model-value="!$event && close()"
  >
    <v-card>
      <v-toolbar color="primary">
        <v-btn icon="mdi-close" @click="close" />

        <v-toolbar-title>{{ title || `Edit ${model.entity}` }}</v-toolbar-title>

        <v-toolbar-items>
          <v-btn text="Save" variant="text" :loading="saving" @click="save" />
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-container>
          <v-row>
            <v-col
              v-for="field in editableFields"
              :key="field.key"
              cols="12"
              :md="field.type === 'editor' ? 12 : 6"
            >
              <slot
                :name="`field.${field.key}`"
                :model-value="formData[field.key]"
                :update="(val) => (formData[field.key] = val)"
              >
                <CollectionField
                  :type="field.type"
                  :model-value="formData[field.key]"
                  :label="field.title"
                  :field-meta="field.meta"
                  :current-url="field.currentUrl"
                  @update:model-value="formData[field.key] = $event"
                />
              </slot>
            </v-col>
          </v-row>
        </v-container>

        <v-snackbar v-model="errorSnackbar" color="error" :timeout="4000">
          {{ errorMessage }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import CollectionField from "./CollectionField.vue";

const props = defineProps({
  model: { type: Function, required: true },
  item: { type: Object, default: null },
  title: { type: String, default: "" },
});

const emit = defineEmits(["update:item"]);

const saving = ref(false);
const errorSnackbar = ref(false);
const errorMessage = ref("");

const formData = ref({});

const hiddenFields = new Set(["id", "created", "updated"]);

function normalizeFieldType(raw) {
  if (!raw) return { type: "text" };
  if (typeof raw === "string") return { type: raw };
  return raw;
}

const editableFields = computed(() => {
  const fieldDefs = props.model.fields();
  const pbTypes = props.model.pbFieldTypes || {};
  const fileFieldKeys = new Set(Object.keys(props.model.fileFields || {}));

  return Object.keys(fieldDefs)
    .filter((key) => {
      if (hiddenFields.has(key)) return false;
      if (key.endsWith("Url")) return false;
      return true;
    })
    .map((key) => {
      const normalized = normalizeFieldType(pbTypes[key]);
      const isFile = fileFieldKeys.has(key);
      return {
        title: camelToTitle(key),
        key,
        type: isFile ? "file" : normalized.type,
        meta: normalized,
        currentUrl: isFile && props.item ? props.item[`${key}Url`] || "" : "",
      };
    });
});

watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      const data = {};
      const fileFieldKeys = new Set(Object.keys(props.model.fileFields || {}));
      for (const field of editableFields.value) {
        data[field.key] = fileFieldKeys.has(field.key) ? null : (newItem[field.key] ?? "");
      }
      formData.value = data;
    }
  },
  { immediate: true },
);

function close() {
  emit("update:item", null);
}

async function save() {
  saving.value = true;
  try {
    const payload = {};
    for (const [key, value] of Object.entries(formData.value)) {
      if (value === null) continue;
      payload[key] = value;
    }
    await props.model.update(props.item.id, payload);
    close();
  } catch (err) {
    errorMessage.value = err?.message || "Failed to save";
    errorSnackbar.value = true;
  } finally {
    saving.value = false;
  }
}

function camelToTitle(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
</script>
