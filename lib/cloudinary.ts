export function getPdfViewUrl(url: string): string {
  if (!url) return url;

  if (url.includes("fl_inline")) return url;

  if (url.includes("fl_attachment")) {
    return url.replace("fl_attachment", "fl_inline");
  }

  return url.replace("/upload/", "/upload/fl_inline/");
}
