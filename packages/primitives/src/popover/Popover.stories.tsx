import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Primitives/Popover",
  component: Popover,
  args: {
    placement: "bottom"
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
  render: (args: { placement: "top" | "right" | "bottom" | "left" }) => (
    <div style={{ minHeight: "18rem", display: "grid", placeItems: "center" }}>
      <Popover {...args}>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <strong style={{ fontSize: "0.95rem" }}>Release Notes</strong>
            <p style={{ margin: 0, color: "inherit" }}>
              Phase 3 starts with lightweight overlays before heavier app feedback components.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
};
