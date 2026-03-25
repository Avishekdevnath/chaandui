import * as React from "react";
import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";
import { Modal } from "./Modal";

const meta = {
  title: "Primitives/Modal",
  component: Modal,
  args: {
    title: "Invite collaborator",
    description: "Share access to your ChaandUI workspace."
  }
};

export default meta;

export const Playground = {
  render: (args: { title: string; description: string }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          {...args}
          footer={
            <>
              <Button tone="neutral" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Send invite</Button>
            </>
          }
          onOpenChange={setOpen}
          open={open}
        >
          <Field description="This invite will be emailed immediately." label="Email address">
            <Input placeholder="teammate@example.com" />
          </Field>
        </Modal>
      </>
    );
  }
};
