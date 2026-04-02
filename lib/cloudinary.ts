export function getPdfViewUrl(url: string): string {
  if (!url) return url;
  return url.replace("/fl_attachment/", "/");
}

export function getPdfDownloadUrl(url: string): string {
  if (!url) return url;
  return url.replace("/upload/", "/upload/fl_attachment/");
}
