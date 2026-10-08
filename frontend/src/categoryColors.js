// Keep this in sync with the CATEGORIES list on the backend (server.js).
export const CATEGORY_COLORS = {
  Food: "#C08A2E",
  Transport: "#4A5C73",
  Shopping: "#7A4A66",
  Bills: "#A6503A",
  Entertainment: "#2F6F4F",
  Health: "#6B7A3A",
  Other: "#847C6C",
};

export function colorFor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
}
