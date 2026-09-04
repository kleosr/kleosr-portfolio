export type MatchMediaFlags = {
  reduced?: boolean;
  mobile?: boolean;
};

function matchesQuery(query: string, flags: MatchMediaFlags): boolean {
  if (query.includes("prefers-reduced-motion: reduce")) return Boolean(flags.reduced);
  if (query.includes("prefers-reduced-motion: no-preference")) return !flags.reduced;
  if (query.includes("max-width: 39.99rem")) return Boolean(flags.mobile);
  return false;
}

export function setMatchMedia(flags: MatchMediaFlags = {}): void {
  window.matchMedia = ((query: string): MediaQueryList => ({
    matches: matchesQuery(query, flags),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}
