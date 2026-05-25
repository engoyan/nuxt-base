import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  decorators: [
    () => ({
      template: '<v-app><v-container max-width="400"><story /></v-container></v-app>',
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};
