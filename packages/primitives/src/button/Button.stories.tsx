import { Button } from "./Button";
import type { Tone, Variant } from "../types/common";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: {
    children: "Launch",
    size: "md",
    tone: "primary",
    variant: "solid"
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"]
    },
    tone: {
      control: "inline-radio",
      options: ["neutral", "primary", "success", "warning", "danger"]
    },
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline", "ghost"]
    },
    fullWidth: {
      control: "boolean"
    }
  }
};

export default meta;

const tones: Tone[] = ["neutral", "primary", "success", "warning", "danger"];
const variants: Variant[] = ["solid", "soft", "outline", "ghost"];

export const Playground = {};

export const ToneMatrix = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      {tones.map((tone) => (
        <Button key={tone} tone={tone}>
          {tone.charAt(0).toUpperCase() + tone.slice(1)}
        </Button>
      ))}
    </div>
  )
};

export const VariantMatrix = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  )
};

export const FullMatrix = {
  name: "Full Tone x Variant Matrix",
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {variants.map((variant) => (
        <div key={variant}>
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.6
            }}
          >
            {variant}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {tones.map((tone) => (
              <Button key={tone} tone={tone} variant={variant}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

export const States = {
  name: "Interactive States",
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.6
          }}
        >
          Default / Hover / Focus / Disabled
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
        </div>
        <p
          style={{
            margin: "0.75rem 0 0",
            fontSize: "0.75rem",
            opacity: 0.5
          }}
        >
          Hover any button to see elevation + color shift. Click to see
          scale(0.97) press. Tab to see focus ring.
        </p>
      </div>

      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.6
          }}
        >
          Disabled across variants
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {variants.map((variant) => (
            <Button key={variant} disabled variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.6
          }}
        >
          Disabled across tones (solid)
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {tones.map((tone) => (
            <Button key={tone} disabled tone={tone}>
              {tone}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

export const FullWidth = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "24rem" }}>
      <Button fullWidth>Full-Width CTA</Button>
      <Button fullWidth variant="outline">
        Full-Width Outline
      </Button>
      <Button fullWidth variant="ghost" tone="danger">
        Full-Width Danger Ghost
      </Button>
    </div>
  )
};

export const DarkMode = {
  name: "Dark Mode Preview",
  parameters: {
    backgrounds: { default: "dark" }
  },
  render: () => (
    <div
      className="chaand-theme-dark"
      style={{
        padding: "2rem",
        borderRadius: "0.75rem",
        background: "var(--chaand-color-bg)"
      }}
    >
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p
              style={{
                margin: "0 0 0.5rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--chaand-color-text-muted)"
              }}
            >
              {variant}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {tones.map((tone) => (
                <Button key={tone} tone={tone} variant={variant}>
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Accessibility = {
  name: "Accessibility: Icon-Only Buttons",
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <p
        style={{
          margin: 0,
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: 0.6
        }}
      >
        Icon-only buttons must have aria-label
      </p>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Button aria-label="Close" size="sm" variant="ghost" tone="neutral">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </Button>
        <Button aria-label="Settings" size="md" variant="outline" tone="neutral">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Button>
        <Button aria-label="Delete item" size="md" variant="soft" tone="danger">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </Button>
      </div>
      <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.5 }}>
        Tab through buttons to verify focus ring visibility and screen reader
        announcements.
      </p>
    </div>
  )
};
