import { Input } from "./Input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  args: {
    "aria-label": "Component name",
    placeholder: "Search components",
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
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}>
      <Input aria-label="Default input" placeholder="Default input" />
      <Input aria-label="Large input" placeholder="Large input" size="lg" />
      <Input
        aria-label="Invalid input"
        invalid
        placeholder="This field has an error"
        defaultValue="broken@example.com"
      />
      <Input aria-label="Disabled input" disabled defaultValue="Disabled" />
    </div>
  )
};
