import { Badge } from "./Badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: {
    children: "Stable",
    size: "md",
    tone: "primary",
    variant: "soft"
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"]
    },
    tone: {
      control: "inline-radio",
      options: ["neutral", "primary", "success", "warning", "danger"]
    },
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline", "ghost"]
    }
  }
};

export default meta;

export const Playground = {};
