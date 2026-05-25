import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import UserMenu from "./UserMenu.vue";

const meta: Meta<typeof UserMenu> = {
  component: UserMenu,
  decorators: [
    () => ({
      template: '<v-app><v-app-bar><v-spacer /><story /></v-app-bar></v-app>',
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof UserMenu>;

export const LoggedIn: Story = {
  parameters: {
    docs: {
      description: {
        story: "User is authenticated — shows avatar with initials and dropdown menu.",
      },
    },
  },
};

export const LoggedOut: Story = {
  parameters: {
    docs: {
      description: {
        story: "User is not authenticated — shows Login button.",
      },
    },
  },
};
