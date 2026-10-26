// Campaign attribution (utm_* tags) for the enquiry form. UtmCapture saves the
// most recent tagged landing for the browser session, so the CRM still records
// the source when a visitor reaches /strategy-session through untagged pages.
// Only these five tag values are ever stored, never anything a visitor types.
export const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "vrs_utm";
// The API caps each value at 200 characters too; this keeps storage small.
const MAX_LENGTH = 200;

const pick = (get: (key: string) => unknown): Utm => {
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = get(key);
    const trimmed = typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
    if (trimmed) utm[key] = trimmed;
  }
  return utm;
};

// The tags on a query string such as window.location.search.
export const utmFromQuery = (search: string): Utm => {
  const params = new URLSearchParams(search);
  return pick((key) => params.get(`utm_${key}`));
};

// sessionStorage can be missing or throw (private modes, blocked site data),
// and what it holds can be anything, so reads are guarded and only known
// string values survive.
export const loadUtm = (): Utm => {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return pick((key) => (saved as Record<string, unknown>)[key]);
  } catch {
    return {};
  }
};

// A tagged URL replaces the saved campaign as a whole, so a new campaign never
// inherits an older term or content; an untagged page leaves it alone.
export const captureUtm = () => {
  const utm = utmFromQuery(window.location.search);
  if (Object.keys(utm).length === 0) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // Storage blocked: the page's own URL still supplies its tags.
  }
};
