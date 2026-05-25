import type { Meta, StoryObj } from "@storybook/vue3";
import LoginForm from "./LoginForm.vue";

const meta: Meta<typeof LoginForm> = {
  title: "Base/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {
    imagePosition: {
      control: "select",
      options: ["left", "right"],
    },
    collection: {
      control: "select",
      options: ["users", "admin"],
    },
  },
  decorators: [
    () => ({
      template:
        '<div style="height: 600px; position: relative;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collection: "users",
  },
};

export const WithImageLeft: Story = {
  args: {
    loginImage: "https://picsum.photos/seed/login/800/1200",
    imagePosition: "left",
    collection: "users",
  },
};

export const WithImageRight: Story = {
  args: {
    loginImage: "https://picsum.photos/seed/login2/800/1200",
    imagePosition: "right",
    collection: "users",
  },
};

export const WithNoImage: Story = {
  args: {
    collection: "admin",
  },
};
