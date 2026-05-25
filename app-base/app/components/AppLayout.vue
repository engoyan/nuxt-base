<template>
  <v-navigation-drawer
    v-if="drawerVisible"
    v-model="drawerOpen"
    class="app-layout-drawer"
    temporary
    width="256"
  >
    <slot name="drawer-prepend" />

    <v-list
      nav
      density="compact"
    >
      <v-list-item
        v-for="(link, index) in visibleMenu"
        :key="index"
        :to="link.to"
        :href="link.href"
        :prepend-icon="link.icon"
        :title="link.text"
        color="primary"
      />
    </v-list>

    <template #append>
      <slot name="drawer-append" />
    </template>
  </v-navigation-drawer>

  <v-app-bar
    :color="color"
    density="compact"
    flat
  >
    <template #prepend>
      <slot name="app-bar-prepend">
        <v-app-bar-nav-icon
          v-if="visibleMenu.length > 0"
          @click="drawerOpen = !drawerOpen"
        />
      </slot>
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template #append>
      <slot name="app-bar-append" />
      <UserMenu />
    </template>
  </v-app-bar>

  <v-main scrollable>
    <NuxtPage />
  </v-main>

  <v-bottom-navigation
    v-if="showBottomNav"
    :model-value="activeMenuIndex"
    grow
  >
    <v-btn
      v-for="(link, index) in visibleMenu"
      :key="index"
      :to="link.to"
      :href="link.href"
      :value="index"
    >
      <v-icon>{{ link.icon || "mdi-circle" }}</v-icon>
      <span>{{ link.text }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const route = useRoute();
const { isAdmin } = useCurrentUser();

const props = defineProps({
  title: { type: String, default: "App" },
  menu: { type: Array, default: () => [] },
  color: { type: String, default: undefined },
});

const drawerOpen = ref(false);
const mounted = ref(false);
onMounted(() => { mounted.value = true; });

const visibleMenu = computed(() =>
  props.menu.filter((link) => !link.admin || isAdmin.value),
);

const drawerVisible = computed(
  () => drawerOpen.value && visibleMenu.value.length > 0,
);

const showBottomNav = computed(
  () => mounted.value && !mdAndUp.value && visibleMenu.value.length > 0,
);

const activeMenuIndex = computed(() => {
  if (!visibleMenu.value.length) return 0;
  const idx = visibleMenu.value.findIndex(
    (link) => link.to === route.path || link.href === route.path,
  );
  return idx >= 0 ? idx : 0;
});
</script>

<style scoped>
.app-layout-drawer {
  width: 256px;
}
</style>
