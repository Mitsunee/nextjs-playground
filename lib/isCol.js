export function isCol(color) {
  return /^#[\da-f]{6}$/.test(color);
}
