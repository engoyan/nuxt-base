import type { Meta, StoryObj } from "@storybook-vue/nuxt";
import AppLayout from "./AppLayout.vue";

const meta: Meta<typeof AppLayout> = {
  component: AppLayout,
  args: {
    title: "My App",
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
      { text: "People", to: "/people", icon: "mdi-account-group" },
      { text: "Settings", to: "/settings", icon: "mdi-cog" },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof AppLayout>;

export const Default: Story = {};

export const WithManyMenuItems: Story = {
  args: {
    menu: [
      { text: "Home", to: "/", icon: "mdi-home" },
      { text: "People", to: "/people", icon: "mdi-account-group" },
      { text: "Vehicles", to: "/vehicles", icon: "mdi-car" },
      { text: "Issues", to: "/issues", icon: "mdi-alert" },
      { text: "Reports", to: "/reports", icon: "mdi-chart-bar" },
      { text: "Settings", to: "/settings", icon: "mdi-cog" },
    ],
  },
};

export const NoMenu: Story = {
  args: {
    title: "Simple App",
    menu: [],
  },
};

export const CustomColor: Story = {
  args: {
    color: "primary",
  },
};

export const RailDisabled: Story = {
  args: {
    rail: false,
  },
};
