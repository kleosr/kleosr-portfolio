#!/usr/bin/env node
/**
 * Capture route screenshots at specified viewport widths.
 * Usage: node scripts/capture-screenshots.mjs <outputDir> [baseUrl]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const outputDir = process.argv[2] ?? "artifacts/screenshots";
const baseUrl = process.argv[3] ?? "http://127.0.0.1:4173";
const widths = [390, 1280];
const routes = [
  { name: "home", path: "/" },
  { name: "grok", path: "/grok-bot/" },
];

const browser = await puppeteer.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

await mkdir(outputDir, { recursive: true });

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.evaluate(() => {
      document.body.classList.add("is-ready");
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll("[data-grok-fade]").forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";
      });
    });
    const filename = `${route.name}_${width}.png`;
    await page.screenshot({ path: join(outputDir, filename), fullPage: true });
    await page.close();
    console.log(`saved ${join(outputDir, filename)}`);
  }
}

await browser.close();
await writeFile(join(outputDir, "manifest.json"), JSON.stringify({ baseUrl, widths, routes }, null, 2));
