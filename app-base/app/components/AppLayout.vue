<template>
  <v-layout>
    <v-navigation-drawer
      v-if="navigation === 'side'"
      v-model="drawer"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(link, index) in menu"
          :key="index"
          :to="link.to"
          :href="link.href"
          :value="index"
        >
          <template v-slot:prepend>
            <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :color="color"
      _scroll-behavior="hide"
      _image="https://picsum.photos/1920/1080?random"
    >
      <!-- <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template> -->

      <template v-slot:prepend>
        <v-app-bar-nav-icon
          v-if="navigation === 'side' && !showBottomNav"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ title }}</v-app-bar-title>

      <v-toolbar-items class="d-none d-md-flex">
        <template v-if="menu && menu.length > 0">
          <v-btn
            v-for="(link, index) in menu"
            :key="index"
            :to="link.to"
            :href="link.href"
            variant="text"
          >
            <v-icon
              v-if="link.icon"
              start
              >{{ link.icon }}</v-icon
            >
            {{ link.text }}
          </v-btn>
        </template>
      </v-toolbar-items>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>

    <v-bottom-navigation
      v-if="showBottomNav"
      :model-value="activeMenuIndex"
      class="d-flex d-md-none w-100"
      grow
    >
      <v-btn
        v-for="(link, index) in menu"
        :key="index"
        :to="link.to"
        :href="link.href"
        :value="index"
      >
        <v-icon>{{ link.icon || "mdi-circle" }}</v-icon>
        <span>{{ link.text }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
const route = useRoute();

const props = defineProps({
  color: {
    type: String,
    default: "amber-darken-4",
  },
  title: {
    type: String,
    default: "Title",
  },
  menu: {
    type: Array,
    default: () => [],
  },
  navigation: {
    type: String,
    default: "bottom",
    validator: (value) => ["side", "bottom"].includes(value),
  },
});

const drawer = ref(false);

// Determine if bottom navigation should be shown
const showBottomNav = computed(() => {
  return props.navigation === "bottom" && props.menu && props.menu.length > 0;
});

// Track active menu item based on current route
const activeMenuIndex = computed(() => {
  if (!props.menu || props.menu.length === 0) return 0;
  const currentPath = route.path;
  const index = props.menu.findIndex(
    (link) => link.to === currentPath || link.href === currentPath
  );
  return index >= 0 ? index : 0;
});
</script>
