import { Slider } from "./Slider";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  args: {
    "aria-label": "Volume",
    defaultValue: 35,
    min: 0,
    max: 100,
    step: 1,
    size: "md"
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"]
    },
    invalid: {
      control: "boolean"
    },
    disabled: {
      control: "boolean"
    }
  }
};

export default meta;

export const Playground = {};

export const SizeMatrix = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
      <Slider aria-label="Small slider" size="sm" defaultValue={20} />
      <Slider aria-label="Medium slider" size="md" defaultValue={50} />
      <Slider aria-label="Large slider" size="lg" defaultValue={80} />
    </div>
  )
};

export const InvalidAndDisabled = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
      <Slider aria-label="Invalid slider" defaultValue={65} invalid />
      <Slider aria-label="Disabled slider" defaultValue={40} disabled />
    </div>
  )
};
