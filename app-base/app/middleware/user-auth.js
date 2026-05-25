export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const pb = usePocketBase();
  const config = useAppConfig();

  if (config.nuxtBase?.ananymus && !pb.authStore.isValid) {
    localStorage.setItem("ananymusRedirect", to.fullPath);
    return navigateTo("/ananymus");
  }
  const record = pb.authStore.record || pb.authStore.model;
  if (
    pb.authStore.isValid &&
    !record?.verified &&
    config.nuxtBase?.required?.verify
  ) {
    return navigateTo("/activate");
  }
  if (!pb.authStore.isValid || record?.isAdmin) {
    localStorage.setItem("authRedirect", to.fullPath);
    return navigateTo("/login");
  }
});
