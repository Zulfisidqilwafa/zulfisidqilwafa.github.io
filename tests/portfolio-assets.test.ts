import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const portfolioDocument = readFileSync(resolve(root, "index.html"), "utf8");
const portfolioStylesheet = readFileSync(resolve(root, "style.css"), "utf8");

describe("portfolio assets", () => {
  it("keeps every locally referenced image in the source tree", () => {
    const imageReferences = [
      ...portfolioDocument.matchAll(/(?:src|href)=["'](?:\.\/)?(images\/[^"']+)["']/g),
    ].map((match) => match[1]);

    expect(imageReferences.length).toBeGreaterThan(0);
    imageReferences.forEach((imagePath) => {
      expect(existsSync(resolve(root, imagePath)), `Missing ${imagePath}`).toBe(true);
    });
  });

  it("uses local runtime scripts instead of the removed animation CDNs", () => {
    expect(portfolioDocument).not.toContain("cdnjs.cloudflare.com");
    expect(portfolioDocument).not.toContain("three.min.js");
    expect(portfolioDocument).not.toContain("vanilla-tilt");
    expect(portfolioDocument).toContain('<script src="script.js"></script>');
  });

  it("keeps every stylesheet icon available to GitHub Pages", () => {
    const iconReferences = [
      ...portfolioStylesheet.matchAll(/url\(["']?(icons\/[^"')]+)["']?\)/g),
    ].map((match) => match[1]);

    expect(iconReferences.length).toBeGreaterThan(0);
    iconReferences.forEach((iconPath) => {
      expect(existsSync(resolve(root, iconPath)), `Missing ${iconPath}`).toBe(true);
    });
  });

  it("contains every portfolio image and infrastructure case study", () => {
    for (let index = 1; index <= 6; index += 1) {
      expect(portfolioDocument).toContain(`images/portfolio${index}.jpg`);
    }

    for (const caseId of ["network", "backup", "maintenance", "recovery"]) {
      expect(portfolioDocument).toContain(`data-case-study="${caseId}"`);
    }
  });
});
