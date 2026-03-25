import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

describe("Card", () => {
  it("renders card sections with semantic defaults and shared classes", () => {
    render(
      <Card data-testid="pricing-card">
        <CardHeader>
          <CardTitle>Starter</CardTitle>
          <CardDescription>Ship your first workspace faster.</CardDescription>
        </CardHeader>
        <CardContent>Includes Button, Input, and Field.</CardContent>
        <CardFooter>Ready for the next primitive set.</CardFooter>
      </Card>
    );

    const card = screen.getByTestId("pricing-card");
    const title = screen.getByRole("heading", { level: 3, name: "Starter" });

    expect(card).toHaveClass("chaand-card");
    expect(title).toHaveClass("chaand-card-title");
    expect(screen.getByText("Ship your first workspace faster.")).toHaveClass(
      "chaand-card-description"
    );
    expect(screen.getByText("Includes Button, Input, and Field.")).toHaveClass(
      "chaand-card-content"
    );
    expect(screen.getByText("Ready for the next primitive set.")).toHaveClass(
      "chaand-card-footer"
    );
  });
});
