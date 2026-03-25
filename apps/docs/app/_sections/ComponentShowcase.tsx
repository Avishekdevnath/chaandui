"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@chaandui/react";

function ShowcaseCard({
  label,
  accent,
  children
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            background: accent,
            flexShrink: 0
          }}
        />
        <span className="docs-label">{label}</span>
      </div>
      {children}
    </article>
  );
}

export function ComponentShowcase() {
  return (
    <section>
      <div className="docs-container">
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          Components
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem"
          }}
        >
          Production-ready out of the box.
        </h2>
        <p
          style={{
            color: "rgba(250,250,250,0.5)",
            fontSize: "1rem",
            marginBottom: "3rem",
            maxWidth: "38rem"
          }}
        >
          From polished primitives to app-level composition patterns, ChaandUI is
          designed for velocity without giving up accessibility or visual quality.
        </p>

        <div className="docs-showcase-grid">
          <ShowcaseCard label="Buttons + Badges" accent="#f43f5e">
            <Card>
              <CardHeader>
                <CardTitle>Action Surface</CardTitle>
                <CardDescription>Clear primary/secondary actions.</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Button>Primary Action</Button>
                <Button tone="neutral" variant="outline">
                  Secondary
                </Button>
                <Badge tone="success">Stable</Badge>
              </CardContent>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard label="Form primitives" accent="#0ea5e9">
            <Card>
              <CardHeader>
                <CardTitle>Form Flow</CardTitle>
                <CardDescription>Composable form foundation.</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "grid", gap: "0.75rem" }}>
                <Input aria-label="Project name" placeholder="Project name" />
                <Button variant="soft">Create Workspace</Button>
              </CardContent>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard label="Navigation + state" accent="#8b5cf6">
            <Card>
              <CardHeader>
                <CardTitle>Tab Composition</CardTitle>
                <CardDescription>Predictable keyboard-accessible tabs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">Fast to integrate and theme.</TabsContent>
                  <TabsContent value="usage">Works great with app shell layouts.</TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </ShowcaseCard>
        </div>
      </div>
    </section>
  );
}
