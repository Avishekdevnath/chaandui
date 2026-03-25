import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
  args: {
    label: "Theme",
    description: "Choose the workspace presentation mode.",
    name: "theme",
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

export const Playground = {
  render: (args: {
    label: string;
    description: string;
    name: string;
    size: "sm" | "md" | "lg";
    invalid: boolean;
  }) => (
    <RadioGroup {...args}>
      <Radio defaultChecked label="Light" value="light" />
      <Radio description="Good for low-light environments." label="Dark" value="dark" />
      <Radio label="System" value="system" />
    </RadioGroup>
  )
};
