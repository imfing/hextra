import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("openapi shortcode resolves descriptions and loads Swagger UI only where used", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-openapi-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(join(contentDir, "docs"), { recursive: true });
  mkdirSync(join(siteDir, "assets", "specs"), { recursive: true });
  mkdirSync(join(siteDir, "assets", "vendor"), { recursive: true });
  mkdirSync(join(siteDir, "static"), { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  // Local Swagger UI files, so the test does not depend on the network.
  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/
theme: hextra
params:
  openapi:
    js: vendor/swagger-ui-bundle.js
    css: vendor/swagger-ui.css
`
  );
  writeFileSync(join(siteDir, "assets", "vendor", "swagger-ui-bundle.js"), "window.SwaggerUIBundle = () => {};\n");
  writeFileSync(join(siteDir, "assets", "vendor", "swagger-ui.css"), ".swagger-ui {}\n");
  writeFileSync(join(siteDir, "assets", "specs", "api.yaml"), "openapi: 3.1.0\n");
  writeFileSync(join(siteDir, "static", "api.json"), "{}\n");
  writeFileSync(join(contentDir, "_index.md"), "---\ntitle: Home\n---\n");
  writeFileSync(join(contentDir, "docs", "other.md"), "---\ntitle: Other\n---\n\nNo API here.\n");
  writeFileSync(
    join(contentDir, "docs", "api.md"),
    `---
title: API
---

{{< openapi "specs/api.yaml" >}}

{{< openapi src="/api.json" docExpansion="none" filter=true defaultModelsExpandDepth="-1" tagsSorter="alpha" >}}

{{< openapi src="https://example.com/openapi.json" docExpansion="everything" operationsSorter="method" defaultModelsExpandDepth=0 >}}

{{< openapi src="//example.com/openapi.yaml" defaultModelsExpandDepth="08" >}}
`
  );

  try {
    const build = spawnSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], { cwd: process.cwd(), encoding: "utf8" });
    expect(build.status, build.stderr).toBe(0);

    const html = readFileSync(join(publishDir, "docs", "api", "index.html"), "utf8");
    const configs = [...html.matchAll(/<div class="hextra-openapi not-prose" data-url="([^"]*)" data-config="([^"]*)"><\/div>/g)].map((m) => ({
      url: m[1],
      config: JSON.parse(m[2].replaceAll("&#34;", '"').replaceAll("&quot;", '"')),
    }));

    expect(configs).toEqual([
      { url: "/specs/api.yaml", config: {} },
      { url: "/api.json", config: { docExpansion: "none", filter: true, defaultModelsExpandDepth: -1, tagsSorter: "alpha" } },
      { url: "https://example.com/openapi.json", config: { operationsSorter: "method", defaultModelsExpandDepth: 0 } },
      { url: "//example.com/openapi.yaml", config: {} },
    ]);
    expect(readFileSync(join(publishDir, "specs", "api.yaml"), "utf8")).toContain("openapi: 3.1.0");
    expect(build.stderr).toContain('unknown docExpansion value "everything"');
    expect(build.stderr).toContain('invalid defaultModelsExpandDepth value "08"');

    expect(html).toMatch(/<link rel="stylesheet" href="\/vendor\/swagger-ui\.[0-9a-f]+\.css" integrity="sha256-/);
    expect(html).toMatch(/<script defer src="\/vendor\/swagger-ui-bundle\.[0-9a-f]+\.js" integrity="sha256-/);

    const other = readFileSync(join(publishDir, "docs", "other", "index.html"), "utf8");
    expect(other).not.toContain("swagger-ui");
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
