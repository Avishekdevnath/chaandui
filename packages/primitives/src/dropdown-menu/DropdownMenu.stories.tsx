import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";

const meta = {
  title: "Primitives/DropdownMenu",
  component: DropdownMenu
};

export default meta;

export const Playground = {
  render: () => (
    <div style={{ minHeight: "18rem", display: "grid", placeItems: "center" }}>
      <DropdownMenu>
        <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename workspace</DropdownMenuItem>
          <DropdownMenuItem>Duplicate config</DropdownMenuItem>
          <DropdownMenuItem>Archive project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};
