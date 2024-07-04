export function getFavicon(url: string, size: number = 32) {
  try {
    const baseUrl = new URL(url).origin;
    return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=${size}`;
  } catch (error) {
    console.error("Error constructing favicon URL:", error);
    return "";
  }
}
