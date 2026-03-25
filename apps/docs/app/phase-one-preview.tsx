"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@chaandui/react";

function DocsShowcaseContent() {
  return (
    <>
      <div className="docs-badges">
        <Badge>Phase 4</Badge>
        <Badge tone="success">Primitives</Badge>
        <Badge tone="primary" variant="solid">
          Core UI
        </Badge>
      </div>

      <section className="docs-grid">
        <Card>
          <CardHeader>
            <CardTitle>Action Surface</CardTitle>
          </CardHeader>
          <CardContent className="docs-media-stack">
            <div className="docs-badges">
              <Button>Primary Action</Button>
              <Button tone="neutral" variant="outline">
                Secondary
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Badge tone="success">Ready</Badge>
            <Badge tone="primary" variant="outline">
              Media Removed
            </Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Surface</CardTitle>
          </CardHeader>
          <CardContent className="docs-media-stack">
            <div className="docs-badges">
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Badge tone="success">Docs Updated</Badge>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export function PhaseShowcase() {
  return <DocsShowcaseContent />;
}
