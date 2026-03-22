export function cleanString(str) {
  return str
    .split("\n")
    .map((line) => line.trim())
    .join("");
}
