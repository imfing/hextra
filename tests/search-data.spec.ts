import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("production search data is fingerprinted and referenced by the search script", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-search-data-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(contentDir);
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
theme: hextra
`
  );
  writeFileSync(
    join(contentDir, "_index.md"),
    `---
title: Home
---

Searchable content.
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir, "--environment", "production"], { cwd: process.cwd(), stdio: "pipe" });

    const outputFiles = readdirSync(publishDir);
    const searchDataFiles = outputFiles.filter((file) => /^en\.search-data\.min\.[a-f0-9]{64}\.json$/.test(file));
    const searchScript = outputFiles.find((file) => /^en\.search\.min\.[a-f0-9]{64}\.js$/.test(file));

    expect(searchDataFiles).toHaveLength(1);
    expect(searchScript).toBeDefined();
    expect(outputFiles).not.toContain("en.search-data.json");

    const script = readFileSync(join(publishDir, searchScript!), "utf8");
    expect(script).toContain(`/${searchDataFiles[0]}`);
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
