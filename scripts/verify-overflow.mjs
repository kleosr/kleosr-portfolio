#!/usr/bin/env node
/** Verify no horizontal overflow at representative widths. */
import puppeteer from "puppeteer-core";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:4173";
const widths = [390, 430, 768, 1280];
const routes = ["/", "/grok-bot/"];

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let failed = false;

for (const path of routes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      document.body.classList.add("is-ready");
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    const ok = overflow.scrollWidth <= overflow.clientWidth + 1;
    console.log(`${ok ? "OK" : "FAIL"} ${path} @ ${width}px (${overflow.scrollWidth}/${overflow.clientWidth})`);
    if (!ok) failed = true;
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
