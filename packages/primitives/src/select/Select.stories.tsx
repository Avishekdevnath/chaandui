import { Select } from "./Select";

const meta = {
  title: "Primitives/Select",
  component: Select,
  args: {
    "aria-label": "Framework",
    placeholder: "Choose framework",
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" }
    ],
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
