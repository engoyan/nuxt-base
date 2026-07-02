export default defineAppConfig({
  nuxtBase: {
    title: "NuxtBase",
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
      { text: "Status", to: "/status", icon: "mdi-list-status" },
      {
        text: "Docs",
        to: "/admin/docs",
        icon: "mdi-book-open-variant",
        admin: true,
      },
    ],
    signup: true,
    profileUrl: "/profile",
    afterLoginURL: "/",
    afterSignupURL: "/",
    loginImage:
      "https://images.unsplash.com/photo-1766221072212-cf2f9383221c?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
});
