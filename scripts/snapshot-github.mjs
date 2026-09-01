import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PRODUCT_REPOS = [
  "kleosr/cursordoctrine",
  "kleosr/cursorkleosr",
  "kleosr/veredicto",
  "kleosr/kleosrules",
  "kleosr/orangesor-cursortheme",
  "kleosr/PE2-CLI",
];

const outFile = join(dirname(fileURLToPath(import.meta.url)), "../src/data/github.snapshot.json");

function licenseOf(repo) {
  if (!repo.license) return null;
  if (repo.license.spdx_id === "NOASSERTION") return repo.license.name ?? null;
  return repo.license.spdx_id ?? null;
}

function recordOf(repo) {
  return {
    fullName: repo.full_name,
    description: repo.description ?? null,
    htmlUrl: repo.html_url,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    language: repo.language ?? null,
    license: licenseOf(repo),
    pushedAt: repo.pushed_at,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
  };
}

function requestHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kleosr-portfolio-snapshot",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function fetchRepo(fullName) {
  const response = await fetch(`https://api.github.com/repos/${fullName}`, { headers: requestHeaders() });
  if (!response.ok) throw new Error(`${fullName} ${response.status}`);
  return recordOf(await response.json());
}

try {
  const repos = [];
  for (const fullName of PRODUCT_REPOS) repos.push(await fetchRepo(fullName));
  writeFileSync(outFile, `${JSON.stringify({ fetchedAt: new Date().toISOString(), repos }, null, 2)}\n`);
} catch (error) {
  const reason = error instanceof Error ? error.message : "fetch failed";
  if (!existsSync(outFile)) {
    console.error(`snapshot failed and no prior file: ${reason}`);
    process.exit(1);
  }
  console.warn(`snapshot failed, keeping last file: ${reason}`);
}
