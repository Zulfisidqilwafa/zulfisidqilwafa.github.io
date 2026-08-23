import parse from "html-react-parser";
import Script from "next/script";
import portfolioDocument from "../index.html?raw";

const bodyMatch = portfolioDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const portfolioMarkup = (bodyMatch?.[1] ?? "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .trim();

export default function PortfolioPage() {
  return (
    <>
      {parse(portfolioMarkup)}
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
