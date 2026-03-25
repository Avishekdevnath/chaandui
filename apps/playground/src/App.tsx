import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@chaandui/react";

export function App() {
  return (
    <main className="playground-shell">
      <section className="playground-hero">
        <p className="playground-kicker">Phase 4 Preview</p>
        <h1>ChaandUI Playground</h1>
        <p className="playground-copy">
          Media package has been removed from this workspace preview. This playground now focuses
          on core primitives and app surfaces.
        </p>
        <div className="playground-badges">
          <Badge>Phase 4</Badge>
          <Badge tone="success">Primitives</Badge>
          <Badge tone="primary" variant="solid">
            Core UI
          </Badge>
        </div>
      </section>

      <section className="playground-grid">
        <Card>
          <CardHeader>
            <CardTitle>Button and Badge Surface</CardTitle>
          </CardHeader>
          <CardContent className="playground-media-stack">
            <div className="playground-badges">
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger">Danger</Badge>
            </div>
            <div className="playground-badges">
              <Button>Primary Action</Button>
              <Button tone="neutral" variant="outline">
                Secondary
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Badge tone="success">Core Ready</Badge>
            <Badge tone="primary" variant="outline">
              Media Removed
            </Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Layout</CardTitle>
          </CardHeader>
          <CardContent className="playground-media-stack">
            <p className="playground-copy">Build polished product cards using composition-friendly primitives.</p>
          </CardContent>
          <CardFooter>
            <Badge tone="success">Layout Ready</Badge>
            <Badge tone="primary" variant="outline">
              Responsive
            </Badge>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
