import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

const meta = {
  title: "Primitives/Accordion",
  component: Accordion
};

export default meta;

export const Playground = {
  render: () => (
    <div style={{ width: "min(32rem, 100%)" }}>
      <Accordion defaultValue="overview">
        <AccordionItem value="overview">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>
            Phase 3 adds layered interactions, feedback surfaces, and disclosure patterns.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="overlays">
          <AccordionTrigger>Overlay stack</AccordionTrigger>
          <AccordionContent>Popover, DropdownMenu, Tooltip, and Toast now share the same design language.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="next">
          <AccordionTrigger>Next step</AccordionTrigger>
          <AccordionContent>Wire the new primitives into playground and docs so they stop living only in Storybook.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
