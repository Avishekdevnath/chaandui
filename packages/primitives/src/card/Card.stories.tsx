import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta = {
  title: "Primitives/Card",
  component: Card
};

export default meta;

export const Default = {
  render: () => (
    <div style={{ maxWidth: "24rem" }}>
      <Card>
        <CardHeader>
          <CardTitle>Starter Workspace</CardTitle>
          <CardDescription>Everything needed to preview the first ChaandUI phase.</CardDescription>
        </CardHeader>
        <CardContent>
          Ship a cohesive baseline with Button, Input, Textarea, Field, and Modal examples.
        </CardContent>
        <CardFooter>
          <Button size="sm">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  )
};
