import { Button } from "../button";
import { ToastProvider, useToast } from "./Toast";

const meta = {
  title: "Primitives/Toast",
  component: ToastProvider
};

export default meta;

function ToastStoryHarness() {
  const { pushToast } = useToast();

  return (
    <Button
      onClick={() =>
        pushToast({
          description: "Overlay and feedback primitives are now available in the workspace.",
          title: "Phase 3 update",
          tone: "success"
        })
      }
    >
      Push toast
    </Button>
  );
}

export const Playground = {
  render: () => (
    <div style={{ minHeight: "18rem" }}>
      <ToastProvider>
        <ToastStoryHarness />
      </ToastProvider>
    </div>
  )
};
