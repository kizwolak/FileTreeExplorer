export function parseJson(content: string) {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return null;
  }
}
