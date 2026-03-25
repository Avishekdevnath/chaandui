import { Button } from "../button/Button";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  args: {
    content: "Helpful UI hint",
    placement: "top"
  },
  argTypes: {
    placement: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"]
    }
  }
};

export default meta;

export const Playground = {
  render: (args: { content: string; placement: "top" | "right" | "bottom" | "left" }) => (
    <div style={{ minHeight: "18rem", display: "grid", placeItems: "center" }}>
      <Tooltip {...args}>
        <Button variant="outline" tone="neutral">Hover or focus me</Button>
      </Tooltip>
    </div>
  )
};
