import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { sampleUsers } from "../../stories/fixtures";
import { UserMenu } from "../UserMenu";
import { Header } from "./Header";

const meta = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { brand: "Acme" },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "16rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = { args: { actions: <Button>Log in</Button> } };

export const LoggedIn: Story = {
  args: {
    actions: (
      <UserMenu
        user={sampleUsers[0]}
        items={[
          { key: "profile", label: "Profile" },
          {
            key: "logout",
            label: "Log out",
            tone: "danger",
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
};

/** The navigation collapses behind a menu button on narrow screens */
export const Mobile: Story = {
  args: LoggedIn.args,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
