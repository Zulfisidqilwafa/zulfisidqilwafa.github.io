import { cp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const publicDirectory = resolve(root, "public");
const stagingDirectory = resolve(root, "tmp", "public");
const iconDirectory = resolve(stagingDirectory, "icons");

const lucideIcons = [
  "arrow-down",
  "arrow-up-right",
  "chevron-up",
  "code-2",
  "database",
  "download",
  "external-link",
  "mail",
  "message-circle",
  "shield-check",
  "workflow",
  "x",
];

const brandIcons = [
  "facebook",
  "github",
  "instagram",
  "tiktok",
  "whatsapp",
  "youtube",
];

await rm(stagingDirectory, { force: true, recursive: true });
await mkdir(stagingDirectory, { recursive: true });
await mkdir(iconDirectory, { recursive: true });
await Promise.all([
  ...lucideIcons.map((icon) => cp(
    resolve(root, "node_modules", "lucide-static", "icons", `${icon}.svg`),
    resolve(iconDirectory, `${icon}.svg`),
    { force: true },
  )),
  ...brandIcons.map((icon) => cp(
    resolve(root, "node_modules", "simple-icons", "icons", `${icon}.svg`),
    resolve(iconDirectory, `${icon}.svg`),
    { force: true },
  )),
]);
await cp(resolve(root, "style.css"), resolve(stagingDirectory, "style.css"), { force: true });

const stagedStylesheet = resolve(stagingDirectory, "style.css");
let stylesheet = await readFile(stagedStylesheet, "utf8");
for (const icon of lucideIcons) {
  const svg = await readFile(
    resolve(root, "node_modules", "lucide-static", "icons", `${icon}.svg`),
  );
  stylesheet = stylesheet.replaceAll(
    `url("icons/${icon}.svg")`,
    `url("data:image/svg+xml;base64,${svg.toString("base64")}")`,
  );
}
for (const icon of brandIcons) {
  const svg = await readFile(
    resolve(root, "node_modules", "simple-icons", "icons", `${icon}.svg`),
  );
  stylesheet = stylesheet.replaceAll(
    `url("icons/${icon}.svg")`,
    `url("data:image/svg+xml;base64,${svg.toString("base64")}")`,
  );
}
await writeFile(stagedStylesheet, stylesheet);

await cp(resolve(root, "script.js"), resolve(stagingDirectory, "script.js"), { force: true });
await cp(resolve(root, "images"), resolve(stagingDirectory, "images"), {
  force: true,
  recursive: true,
});
const ogImage = resolve(root, "images", "og-portfolio-v4.png");
await cp(
  ogImage,
  resolve(stagingDirectory, "og.png"),
  { force: true },
);
await cp(resolve(root, "cv"), resolve(stagingDirectory, "cv"), {
  force: true,
  recursive: true,
});

await rm(publicDirectory, { force: true, recursive: true });
await rename(stagingDirectory, publicDirectory);
