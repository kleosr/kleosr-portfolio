import { describe, expect, it } from "vitest";
import {
  asJson,
  featuredStarTotal,
  githubRepo,
  githubSnapshot,
  readSnapshot,
  snapshotDay,
  type Json,
} from "./github";

const repo = {
  fullName: "kleosr/example",
  description: "desc",
  htmlUrl: "https://github.com/kleosr/example",
  stargazersCount: 2,
  forksCount: 1,
  language: "TypeScript",
  license: "MIT",
  pushedAt: "2026-01-01T00:00:00Z",
  topics: ["a", "b"],
};

function snapshotOf(overrides: object = {}): Json {
  return asJson({ fetchedAt: "2026-09-03T04:04:56.214Z", repos: [repo], ...overrides });
}

describe("github snapshot", () => {
  it("loads committed product stats", () => {
    expect(githubSnapshot.fetchedAt.startsWith("2026-")).toBe(true);
    expect(githubSnapshot.repos.length).toBeGreaterThan(0);
    const doctrine = githubRepo("kleosr/cursordoctrine")?.stargazersCount;
    const kleosr = githubRepo("kleosr/cursorkleosr")?.stargazersCount;
    expect(doctrine).toBeGreaterThan(0);
    expect(kleosr).toBeGreaterThan(0);
    expect(githubRepo("missing/repo")).toBeUndefined();
    expect(snapshotDay()).toBe(githubSnapshot.fetchedAt.slice(0, 10));
    expect(snapshotDay("1999-12-31T23:59:59Z")).toBe("1999-12-31");
    expect(featuredStarTotal(["kleosr/cursordoctrine"])).toBe(doctrine);
    expect(featuredStarTotal(["kleosr/cursordoctrine", "kleosr/cursorkleosr"])).toBe(
      (doctrine ?? 0) + (kleosr ?? 0),
    );
    expect(featuredStarTotal([])).toBe(0);
    expect(featuredStarTotal(["kleosr/missing"])).toBeNull();
  });

  it("rejects snapshots that are not objects", () => {
    expect(() => readSnapshot("nope")).toThrow("not an object");
    expect(() => readSnapshot([])).toThrow("not an object");
    expect(() => readSnapshot(null)).toThrow("not an object");
    expect(() => readSnapshot(1)).toThrow("not an object");
    expect(() => readSnapshot(true)).toThrow("not an object");
  });

  it("rejects incomplete snapshots", () => {
    expect(() => readSnapshot(asJson({ repos: [] }))).toThrow("incomplete");
    expect(() => readSnapshot(asJson({ fetchedAt: 1, repos: [] }))).toThrow("incomplete");
    expect(() => readSnapshot(asJson({ fetchedAt: "", repos: [] }))).toThrow("incomplete");
    expect(() => readSnapshot(asJson({ fetchedAt: "2026-01-01", repos: "no" }))).toThrow(
      "incomplete",
    );
    expect(() =>
      readSnapshot(asJson({ fetchedAt: "2026-01-01", repos: { fullName: "x" } })),
    ).toThrow("incomplete");
  });

  it("rejects malformed repos", () => {
    expect(() => readSnapshot(snapshotOf({ repos: ["bad"] }))).toThrow("bad repo");
    expect(() => readSnapshot(snapshotOf({ repos: [null] }))).toThrow("bad repo");
    expect(() => readSnapshot(snapshotOf({ repos: [0] }))).toThrow("bad repo");
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, fullName: 1 }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, fullName: "" }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, htmlUrl: null }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, pushedAt: false }] }))).toThrow(
      "bad repo",
    );
    expect(() =>
      readSnapshot(snapshotOf({ repos: [{ ...repo, stargazersCount: Number.NaN }] })),
    ).toThrow("bad repo");
    expect(() =>
      readSnapshot(snapshotOf({ repos: [{ ...repo, stargazersCount: "2" }] })),
    ).toThrow("bad repo");
    expect(() =>
      readSnapshot(snapshotOf({ repos: [{ ...repo, forksCount: Number.POSITIVE_INFINITY }] })),
    ).toThrow("bad repo");
    expect(() =>
      readSnapshot(snapshotOf({ repos: [{ ...repo, forksCount: true }] })),
    ).toThrow("bad repo");
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, description: 1 }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, language: 1 }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, license: 1 }] }))).toThrow(
      "bad repo",
    );
    expect(() => readSnapshot(snapshotOf({ repos: [{ ...repo, topics: "no" }] }))).toThrow(
      "bad repo",
    );
    const { description: _d, ...noDescription } = repo;
    expect(() => readSnapshot(snapshotOf({ repos: [noDescription] }))).toThrow("bad repo");
    const { topics: _t, ...noTopics } = repo;
    expect(() => readSnapshot(snapshotOf({ repos: [noTopics] }))).toThrow("bad repo");
  });

  it("keeps null strings, zero counts, and string-only topics", () => {
    const parsed = readSnapshot(
      snapshotOf({
        repos: [
          {
            ...repo,
            description: null,
            language: null,
            license: null,
            stargazersCount: 0,
            forksCount: 0,
            topics: ["keep", 1, null],
          },
        ],
      }),
    );
    expect(parsed.fetchedAt).toBe("2026-09-03T04:04:56.214Z");
    expect(parsed.repos[0]).toMatchObject({
      description: null,
      language: null,
      license: null,
      stargazersCount: 0,
      forksCount: 0,
      topics: ["keep"],
    });
  });
});
