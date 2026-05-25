import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import SnackbarProvider from "./SnackbarProvider.vue";

const meta: Meta<typeof SnackbarProvider> = {
  component: SnackbarProvider,
  decorators: [
    () => ({
      template: `
        <v-app>
          <v-container>
            <v-btn color="success" class="me-2" @click="success">Success</v-btn>
            <v-btn color="error" class="me-2" @click="error">Error</v-btn>
            <v-btn color="info" class="me-2" @click="info">Info</v-btn>
            <v-btn color="warning" @click="warning">Warning</v-btn>
          </v-container>
          <story />
        </v-app>
      `,
      setup() {
        const { success, error, info, warning } = useSnackbar();
        return {
          success: () => success("Action completed successfully!"),
          error: () => error("Something went wrong."),
          info: () => info("Here is some information."),
          warning: () => warning("Please be careful."),
        };
      },
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof SnackbarProvider>;

export const Interactive: Story = {};
