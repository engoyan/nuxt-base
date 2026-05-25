<template>
  <template v-if="mounted && isLoggedIn">
    <v-menu location="bottom end" :close-on-content-click="false">
      <template #activator="{ props: menuProps }">
        <v-btn icon variant="text" v-bind="menuProps">
          <v-avatar size="32" :color="avatarUrl ? undefined : 'primary'">
            <v-img v-if="avatarUrl" :src="avatarUrl" />
            <span v-else class="text-body-2 font-weight-medium">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-card min-width="240" rounded="lg">
        <v-card-text class="pb-0">
          <div class="d-flex align-center mb-2">
            <v-avatar size="40" :color="avatarUrl ? undefined : 'primary'" class="me-3">
              <v-img v-if="avatarUrl" :src="avatarUrl" />
              <span v-else class="text-body-1 font-weight-medium">{{ initials }}</span>
            </v-avatar>
            <div>
              <div class="text-body-2 font-weight-medium">{{ displayName }}</div>
              <div v-if="record?.email && displayName !== record.email" class="text-caption text-medium-emphasis">
                {{ record.email }}
              </div>
            </div>
          </div>
        </v-card-text>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item
            :to="profileUrl"
            prepend-icon="mdi-account-outline"
            title="Profile"
          />

          <v-list-item prepend-icon="mdi-theme-light-dark" @click="toggleTheme">
            <v-list-item-title>
              {{ isDark ? "Light mode" : "Dark mode" }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout"
          />
        </v-list>
      </v-card>
    </v-menu>
  </template>

  <v-btn v-else variant="text" to="/login" prepend-icon="mdi-login">
    Login
  </v-btn>
</template>

<script setup>
import { useTheme } from "vuetify";

const config = useAppConfig();
const theme = useTheme();
const { record, isLoggedIn, displayName, avatarUrl, initials, logout } = useCurrentUser();

const mounted = ref(false);
onMounted(() => { mounted.value = true; });

const profileUrl = computed(() => config.nuxtBase?.profileUrl || "/profile");
const isDark = computed(() => theme.global.current.value.dark);

function toggleTheme() {
  const newTheme = isDark.value ? "light" : "dark";
  theme.global.name.value = newTheme;
  localStorage.setItem("userTheme", newTheme);
}
</script>
