<template>
  <LoginForm
    :login-image="config?.nuxtBase?.loginImage"
    image-position="right"
    collection="admin"
  />
</template>

<script setup>
const config = useAppConfig();

useHead({
  title: "Admin Login",
});

definePageMeta({
  layout: "blank",
});
</script>
