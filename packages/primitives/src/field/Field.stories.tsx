import { Field } from "./Field";
import { Input } from "../input";
import { Textarea } from "../textarea";

const meta = {
  title: "Primitives/Field",
  component: Field,
  args: {
    label: "Email",
    description: "We only use this for product updates."
  }
};

export default meta;

export const InputField = {
  render: (args: { label: string; description: string }) => (
    <div style={{ maxWidth: "24rem" }}>
      <Field {...args}>
        <Input placeholder="you@example.com" />
      </Field>
    </div>
  )
};

export const ErrorState = {
  render: () => (
    <div style={{ maxWidth: "24rem" }}>
      <Field description="Tell users what this is for." error="Summary is required" label="Summary">
        <Textarea placeholder="Short product summary" rows={5} />
      </Field>
    </div>
  )
};
