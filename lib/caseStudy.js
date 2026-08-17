/**
 * `challenge` fields are written as "<intro clause>: <clause>; <clause>; and <clause>."
 * (or, occasionally, with no intro/colon at all - just a semicolon-joined
 * run of clauses). Splitting on the first ": " or "; " - whichever comes
 * first - turns that prose into a real headline + a short list of friction
 * points without hand-authoring per-project copy.
 */
export function parseChallenge(text) {
  const colonIndex = text.indexOf(": ");
  const semiIndex = text.indexOf("; ");
  const useColon = colonIndex !== -1 && (semiIndex === -1 || colonIndex < semiIndex);

  const splitAt = useColon ? colonIndex : semiIndex;
  const headline = splitAt !== -1 ? text.slice(0, splitAt).trim() : text.trim();
  const listText = splitAt !== -1 ? text.slice(splitAt + 2) : "";

  const points = listText
    .split(/;\s*/)
    .map((point) => point.replace(/^and\s+/i, "").replace(/\.$/, "").trim())
    .filter(Boolean)
    .map((point) => point.charAt(0).toUpperCase() + point.slice(1));

  return { headline, points };
}

export function firstSentence(text) {
  const match = text.match(/^.*?\./);
  return match ? match[0] : text;
}
