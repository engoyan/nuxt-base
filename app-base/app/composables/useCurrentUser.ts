export const useCurrentUser = () => {
  const pb = usePocketBase();

  const record = computed(() => pb.authStore.record);
  const isLoggedIn = computed(() => pb.authStore.isValid);
  const isAdmin = computed(
    () => pb.authStore.isSuperuser || record.value?.collectionName === "_superusers",
  );

  const displayName = computed(() => {
    const r = record.value;
    if (!r) return "";
    return r.name || r.username || r.email || "";
  });

  const avatarUrl = computed(() => {
    const r = record.value;
    if (!r?.avatar) return null;
    return pb.files.getURL(r, r.avatar, { thumb: "80x80" });
  });

  const initials = computed(() => {
    const name = displayName.value;
    if (!name) return "?";
    const parts = name.split(/[\s@.]+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  });

  function logout() {
    pb.authStore.clear();
    navigateTo("/login");
  }

  return { record, isLoggedIn, isAdmin, displayName, avatarUrl, initials, logout };
};
