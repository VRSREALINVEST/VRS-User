// Article bylines. Blog.author is free text, so this is the one place that
// interprets it, following the client's rule: "By Sudhesh K Valappil" only
// where the author field names him, otherwise "By the VRS Realinvest team".
// Nothing stores a reviewer yet, so no page shows "Reviewed by".
export const SUDHESH = "Sudhesh K Valappil";
export const TEAM = "the VRS Realinvest team";

export const isBySudhesh = (author?: string | null) =>
  /\bsudhesh\b/i.test(author ?? "");
