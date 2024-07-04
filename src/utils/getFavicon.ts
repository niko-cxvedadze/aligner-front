export function getFavicon(url: string) {
  try {
    const baseUrl = new URL(url).origin;
    const faviconUrl = `${baseUrl}/favicon.ico`;
    return faviconUrl;
  } catch (error) {
    console.error("Error constructing favicon URL:", error);
    return null;
  }
}
