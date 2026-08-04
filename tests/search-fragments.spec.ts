import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("search fragments support inline markup in headings", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-search-fragments-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(join(contentDir, "repro"), { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
theme: hextra
params:
  search:
    flexsearch:
      index: content
`
  );
  writeFileSync(
    join(contentDir, "repro", "index.md"),
    `---
title: Search Fragment Repro
---
PREAMBLE_TOKEN

## Plain Heading
PLAIN_BODY_TOKEN

## [Link Heading](https://example.com)
LINK_BODY_TOKEN

## *Emphasized* \`Code\` #1
FORMATTED_BODY_TOKEN

## Duplicate
FIRST_DUPLICATE_BODY_TOKEN

## Duplicate
SECOND_DUPLICATE_BODY_TOKEN
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir, "--environment", "development"], {
      cwd: process.cwd(),
      stdio: "pipe",
    });

    const searchData = JSON.parse(readFileSync(join(publishDir, "en.search-data.json"), "utf8"));
    const fragments = searchData["/repro/"].data;

    expect(fragments[""]).toBe("PREAMBLE_TOKEN");
    expect(fragments["plain-heading#Plain Heading"]).toBe("PLAIN_BODY_TOKEN");
    expect(fragments["link-heading#Link Heading"]).toBe("LINK_BODY_TOKEN");
    expect(fragments["emphasized-code-1#<em>Emphasized</em> <code>Code</code> #1"]).toBe("FORMATTED_BODY_TOKEN");
    expect(fragments["duplicate#Duplicate"]).toBe("FIRST_DUPLICATE_BODY_TOKEN");
    expect(fragments["duplicate-1#Duplicate"]).toBe("SECOND_DUPLICATE_BODY_TOKEN");
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
