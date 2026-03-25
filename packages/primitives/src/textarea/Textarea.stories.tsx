import { Textarea } from "./Textarea";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  args: {
    "aria-label": "Project notes",
    placeholder: "Write your notes",
    rows: 5,
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
      <Textarea aria-label="Default textarea" placeholder="Default textarea" />
      <Textarea aria-label="Large textarea" placeholder="Large textarea" rows={7} size="lg" />
      <Textarea
        aria-label="Invalid textarea"
        invalid
        placeholder="Textarea with an error"
        defaultValue="Missing more detail"
      />
    </div>
  )
};
