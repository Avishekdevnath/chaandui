import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

describe("Accordion", () => {
  it("opens one item at a time in single mode", () => {
    render(
      <Accordion defaultValue="overview">
        <AccordionItem value="overview">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>Overview content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Details content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Overview content")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Details" }));

    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Overview content")).toBeNull();
    expect(screen.getByText("Details content")).toBeVisible();
  });

  it("keeps multiple items open when multiple mode is enabled", () => {
    render(
      <Accordion defaultValue={["overview"]} multiple>
        <AccordionItem value="overview">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>Overview content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Details content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByRole("button", { name: "Details" }));

    expect(screen.getByText("Overview content")).toBeVisible();
    expect(screen.getByText("Details content")).toBeVisible();
  });

  it("moves focus between triggers with keyboard navigation", () => {
    render(
      <Accordion>
        <AccordionItem value="overview">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>Overview content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Details content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>Status content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const overview = screen.getByRole("button", { name: "Overview" });

    overview.focus();
    fireEvent.keyDown(overview, { key: "ArrowDown" });

    expect(screen.getByRole("button", { name: "Details" })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("button", { name: "Details" }), { key: "End" });

    expect(screen.getByRole("button", { name: "Status" })).toHaveFocus();
  });
});
