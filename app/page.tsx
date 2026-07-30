import Script from "next/script";
import portfolioDocument from "../index.html?raw";

const bodyMatch = portfolioDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const portfolioMarkup = (bodyMatch?.[1] ?? "")
  .replace(/<script\s+src=["']script\.js["']\s*><\/script>/i, "")
  .trim();

export default function PortfolioPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
