export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const pb = usePocketBase();

  const record = pb.authStore.record || pb.authStore.model;
  const isAdmin = pb.authStore.isSuperuser || record?.collectionName === "_superusers";
  if (!pb.authStore.isValid || !isAdmin) {
    if (localStorage.getItem("pocketbase_auth_impersonate")) {
      return navigateTo("/");
    }
    localStorage.setItem("authRedirect", to.fullPath);
    return navigateTo("/admin/login");
  }
});
