<template>
  <LoginForm
    _login-image="config?.nuxtBase?.loginImage"
    login-image="https://images.unsplash.com/photo-1766059965596-e69f99a7095f?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    image-position="right"
  />
</template>

<script setup>
// const { t } = useI18n();
const t = (key) => key;

const config = useAppConfig();

useHead({
  title: t("Login"),
});

definePageMeta({
  layout: "blank",
});
</script>
