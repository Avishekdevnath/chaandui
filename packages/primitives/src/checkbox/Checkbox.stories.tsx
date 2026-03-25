import { Checkbox } from "./Checkbox";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  args: {
    label: "Enable email updates",
    description: "Get product announcements and release notes.",
    size: "md",
    invalid: false
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"]
    },
    invalid: {
      control: "boolean"
    }
  }
};

export default meta;

export const Playground = {};

export const States = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "28rem" }}>
      <Checkbox description="Receive release announcements." label="Email updates" />
      <Checkbox defaultChecked description="Shown as active by default." label="Weekly digest" />
      <Checkbox disabled label="Disabled option" />
      <Checkbox invalid label="Needs confirmation" />
    </div>
  )
};
