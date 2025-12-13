import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VPie } from "vuetify/labs/VPie";
import { VFileUpload, VFileUploadItem } from "vuetify/labs/VFileUpload";
import {
  VStepperVertical,
  VStepperVerticalItem,
} from "vuetify/labs/VStepperVertical";
import { VDateInput } from "vuetify/labs/VDateInput";
// import { VCalendar } from "vuetify/labs/VCalendar";

function getTheme() {
  // Always return "light" on server to ensure consistent SSR
  if (import.meta.server) {
    return "dark";
  }

  // On client, check localStorage and system preferences
  // Use try-catch to handle cases where localStorage might not be available
  try {
    const userTheme = localStorage.getItem("userTheme") || "system";

    switch (userTheme) {
      case "dark":
      case "light":
        return userTheme;
      default:
      case "system":
        return window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
  } catch (e) {
    // Fallback to light if localStorage access fails
    return "light";
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig();
  const { themes, variables } = config.vuetify || {};

  // Always use "light" theme initially for consistent SSR/client hydration
  // Theme will be updated on client after hydration if needed
  const initialTheme = getTheme() || "dark";

  const vuetify = createVuetify({
    defaults: {
      global: {
        ripple: false, // Disable ripple to reduce non-passive touch event listeners
      },
      VBtn: {
        // elevation: 4,
        // prependIcon: "$vuetify",
      },
    },
    ssr: true,
    components: {
      ...components,
      VPie,
      VFileUpload,
      VFileUploadItem,
      VStepperVertical,
      VStepperVerticalItem,
      // VCalendar,
      VDateInput,
    },
    directives,
    theme: {
      defaultTheme: initialTheme,
      themes: {
        dark: {
          // variables,
          // colors,
          // {
          // primary: colors.lime.accent4,
          // background: "#FFFFFF",
          // surface: "#FFFFFF",
          // "surface-bright": "#FFFFFF",
          // "surface-light": "#EEEEEE",
          // "surface-variant": "#424242",
          // "on-surface-variant": "#EEEEEE",
          // "primary-darken-1": "#1F5592",
          // secondary: "#48A9A6",
          // "secondary-darken-1": "#018786",
          // error: "#B00020",
          // info: "#2196F3",
          // success: "#4CAF50",
          // warning: "#FB8C00",
          // },
        },
        ...(themes || {}),
      },
    },
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: "#ff595e",
    //       secondary: "#ffca3a",
    //       accent: "#8ac926",
    //       error: "#B00020",
    //       info: "#2196F3",
    //       success: "#4CAF50",
    //       warning: "#FB8C00",
    //     },
    //   },
    // },
  });

  nuxtApp.vueApp.use(vuetify);

  // Store vuetify instance for theme plugin
  nuxtApp.vueApp.config.globalProperties.$vuetify = vuetify;
});
