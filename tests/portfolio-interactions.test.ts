import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, it, vi } from "vitest";

const root = resolve(import.meta.dirname, "..");
const portfolioDocument = readFileSync(resolve(root, "index.html"), "utf8");
const portfolioScript = readFileSync(resolve(root, "script.js"), "utf8");
const bodyMarkup = portfolioDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

beforeAll(async () => {
  document.body.innerHTML = bodyMarkup.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
  vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response(null, { status: 204 }))));

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
  Object.defineProperty(window, "requestAnimationFrame", {
    configurable: true,
    value: vi.fn(() => 1),
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    configurable: true,
    value: vi.fn(),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value: vi.fn(() => ({
      arc: vi.fn(),
      beginPath: vi.fn(),
      clearRect: vi.fn(),
      fill: vi.fn(),
      fillStyle: "",
      setTransform: vi.fn(),
    })),
  });
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value() {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value() {
      this.removeAttribute("open");
    },
  });
  Object.defineProperty(window, "open", {
    configurable: true,
    value: vi.fn(),
  });

  Function(portfolioScript)();
});

describe("portfolio interactions", () => {
  it("switches the page language to English", () => {
    document.getElementById("language-toggle")?.click();

    expect(document.documentElement.lang).toBe("en");
    expect(document.querySelector('[data-i18n="exploreWork"]')?.textContent).toBe("Explore my work");
    expect(document.getElementById("language-toggle")?.dataset.language).toBe("en");
    expect(document.getElementById("language-toggle")?.getAttribute("aria-pressed")).toBe("true");
  });

  it("filters the project grid to infrastructure work", () => {
    const infrastructureFilter = document.querySelector<HTMLButtonElement>(
      '[data-filter="infrastructure"]',
    );
    infrastructureFilter?.click();

    expect(infrastructureFilter?.getAttribute("aria-pressed")).toBe("true");
    document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
      expect(card.classList.contains("is-hidden")).toBe(card.dataset.category !== "infrastructure");
    });
  });

  it("opens an infrastructure case study", () => {
    document.querySelector<HTMLButtonElement>('[data-case-study="network"]')?.click();

    expect(document.getElementById("case-dialog")?.hasAttribute("open")).toBe(true);
    expect(document.getElementById("case-title")?.textContent).toBe("Network Infrastructure");
  });

  it("builds a WhatsApp contact intent from a valid form", () => {
    const form = document.getElementById("contact-form") as HTMLFormElement;
    (form.elements.namedItem("name") as HTMLInputElement).value = "Test User";
    (form.elements.namedItem("email") as HTMLInputElement).value = "test@example.com";
    (form.elements.namedItem("subject") as HTMLInputElement).value = "Portfolio";
    (form.elements.namedItem("message") as HTMLTextAreaElement).value = "Hello";

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining("https://wa.me/6282115834047"),
      "_blank",
      "noopener,noreferrer",
    );
  });
});
