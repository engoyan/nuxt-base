<template>
  <v-app>
    <AppLayout
      :title="config.nuxtBase?.title || 'App'"
      :menu="config.nuxtBase?.menu || []"
    />
    <SnackbarProvider />
  </v-app>
</template>

<script setup>
const config = useAppConfig();
</script>
