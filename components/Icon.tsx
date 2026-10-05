export type IconName =
  | "arrow" | "inbox" | "user" | "chart" | "keyboard" | "unlink" | "clock" | "eye" | "legacy"
  | "rocket" | "code" | "spark" | "globe" | "phone" | "flow" | "plug" | "cloud" | "grid" | "chat"
  | "scan" | "check" | "bell" | "pulse" | "doc" | "play" | "target" | "loop" | "team" | "shield"
  | "mail" | "call";

export function Icon({ name, className = "i" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Aurevixa home">
      <svg className="brand__mark" aria-hidden="true"><use href="#mark" /></svg>
      <span className="brand__word">Aurevixa</span>
    </a>
  );
}
