import snapshotJson from "./github.snapshot.json";

export type GithubRepoRecord = {
  readonly fullName: string;
  readonly description: string | null;
  readonly htmlUrl: string;
  readonly stargazersCount: number;
  readonly forksCount: number;
  readonly language: string | null;
  readonly license: string | null;
  readonly pushedAt: string;
  readonly topics: readonly string[];
};

export type GithubSnapshot = {
  readonly fetchedAt: string;
  readonly repos: readonly GithubRepoRecord[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asFinite(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function nullableString(value: unknown): string | null | undefined {
  if (value === null) return null;
  if (typeof value === "string") return value;
  return undefined;
}

function readTopics(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) return null;
  return value.filter((item): item is string => typeof item === "string");
}

function readCore(value: Record<string, unknown>): Omit<
  GithubRepoRecord,
  "description" | "language" | "license" | "topics"
> | null {
  const fullName = asString(value.fullName);
  const htmlUrl = asString(value.htmlUrl);
  const pushedAt = asString(value.pushedAt);
  const stargazersCount = asFinite(value.stargazersCount);
  const forksCount = asFinite(value.forksCount);
  if (!fullName || !htmlUrl || !pushedAt || stargazersCount === null || forksCount === null) return null;
  return { fullName, htmlUrl, pushedAt, stargazersCount, forksCount };
}

function readRepo(value: unknown): GithubRepoRecord | null {
  if (!isRecord(value)) return null;
  const core = readCore(value);
  const description = nullableString(value.description);
  const language = nullableString(value.language);
  const license = nullableString(value.license);
  const topics = readTopics(value.topics);
  if (!core || description === undefined || language === undefined || license === undefined || !topics) {
    return null;
  }
  return { ...core, description, language, license, topics };
}

function readSnapshot(value: unknown): GithubSnapshot {
  if (!isRecord(value)) throw new Error("github.snapshot.json is not an object");
  const fetchedAt = asString(value.fetchedAt);
  if (!fetchedAt || !Array.isArray(value.repos)) throw new Error("github.snapshot.json is incomplete");
  const repos: GithubRepoRecord[] = [];
  for (const item of value.repos) {
    const repo = readRepo(item);
    if (!repo) throw new Error("github.snapshot.json has a bad repo");
    repos.push(repo);
  }
  return { fetchedAt, repos };
}

export const githubSnapshot = readSnapshot(snapshotJson);

export function githubRepo(fullName: string): GithubRepoRecord | undefined {
  return githubSnapshot.repos.find((repo) => repo.fullName === fullName);
}

export function snapshotDay(fetchedAt = githubSnapshot.fetchedAt): string {
  return fetchedAt.slice(0, 10);
}

export function featuredStarTotal(fullNames: readonly string[]): number | null {
  let total = 0;
  for (const name of fullNames) {
    const repo = githubRepo(name);
    if (!repo) return null;
    total += repo.stargazersCount;
  }
  return total;
}
