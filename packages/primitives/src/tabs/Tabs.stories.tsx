import { Badge } from "../badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
  args: {
    defaultValue: "overview"
  }
};

export default meta;

export const Playground = {
  render: () => (
    <div style={{ maxWidth: "36rem" }}>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Overview</CardTitle>
              <CardDescription>Baseline summary for the current component wave.</CardDescription>
            </CardHeader>
            <CardContent>Phase 2 adds choice and navigation primitives on top of Phase 1.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Notes</CardTitle>
            </CardHeader>
            <CardContent>Checkbox, Radio, Select, Tabs, and Badge are grouped as the next slice.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge>Design System</Badge>
            <Badge tone="success">Stable</Badge>
            <Badge tone="warning" variant="outline">
              In Review
            </Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
};
