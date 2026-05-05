export const basePath =
  process.env.NODE_ENV === "production" ? "/project-lunar-lab" : "";

export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
