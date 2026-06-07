export default defineAppConfig({
  nuxtBase: {
    title: "My App",
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
    ],
    signup: true,
    profileUrl: "/profile",
    afterLoginURL: "/",
    afterSignupURL: "/",
  },
});
