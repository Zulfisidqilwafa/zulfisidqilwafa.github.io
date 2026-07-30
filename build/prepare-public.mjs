import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDirectory = resolve(root, "public");

await mkdir(publicDirectory, { recursive: true });
await cp(resolve(root, "style.css"), resolve(publicDirectory, "style.css"), { force: true });
await cp(resolve(root, "script.js"), resolve(publicDirectory, "script.js"), { force: true });
await cp(resolve(root, "images"), resolve(publicDirectory, "images"), {
  force: true,
  recursive: true,
});
await cp(
  resolve(root, "images", "og-portfolio-v5.png"),
  resolve(publicDirectory, "og.png"),
  { force: true },
);
await cp(resolve(root, "cv"), resolve(publicDirectory, "cv"), {
  force: true,
  recursive: true,
});
