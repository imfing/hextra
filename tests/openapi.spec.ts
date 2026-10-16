import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Local Swagger UI files, so the tests do not depend on the network.
const LOCAL_ASSETS = `params:
  openapi:
    js: vendor/swagger-ui-bundle.js
    css: vendor/swagger-ui.css
`;

function buildSite(params: string, apiPage: string) {
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

  writeFileSync(join(siteDir, "hugo.yaml"), `title: Test\nbaseURL: https://example.org/\ntheme: hextra\n${params}`);
  writeFileSync(join(siteDir, "assets", "vendor", "swagger-ui-bundle.js"), "window.SwaggerUIBundle = () => {};\n");
  writeFileSync(join(siteDir, "assets", "vendor", "swagger-ui.css"), ".swagger-ui {}\n");
  writeFileSync(join(siteDir, "assets", "specs", "api.yaml"), "openapi: 3.1.0\n");
  writeFileSync(join(siteDir, "static", "api.json"), "{}\n");
  writeFileSync(join(contentDir, "_index.md"), "---\ntitle: Home\n---\n");
  writeFileSync(join(contentDir, "docs", "other.md"), "---\ntitle: Other\n---\n\nNo API here.\n");
  writeFileSync(join(contentDir, "docs", "api.md"), `---\ntitle: API\n---\n\n${apiPage}`);

  const build = spawnSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], { cwd: process.cwd(), encoding: "utf8" });
  const read = (...path: string[]) => readFileSync(join(publishDir, ...path), "utf8");
  const cleanup = () => rmSync(siteDir, { recursive: true, force: true });
  return { build, read, cleanup };
}

test("openapi shortcode resolves descriptions and loads Swagger UI only where used", () => {
  const { build, read, cleanup } = buildSite(
    LOCAL_ASSETS,
    `{{< openapi "specs/api.yaml" >}}

{{< openapi src="/api.json" docExpansion="none" filter=true defaultModelsExpandDepth="-1" tagsSorter="alpha" >}}

{{< openapi src="https://example.com/openapi.json" docExpansion="everything" operationsSorter="method" defaultModelsExpandDepth=0 tryItOutEnabled="yes" >}}

{{< openapi src="//example.com/openapi.yaml" defaultModelsExpandDepth="08" >}}
`
  );

  try {
    expect(build.status, build.stderr).toBe(0);

    const html = read("docs", "api", "index.html");
    const configs = [...html.matchAll(/<div\s+class="hextra-openapi not-prose"\s+role="region"\s+aria-label="API reference"\s+data-url="([^"]*)"\s+data-config="([^"]*)"\s*><\/div>/g)].map((m) => ({
      url: m[1],
      config: JSON.parse(m[2].replaceAll("&#34;", '"').replaceAll("&quot;", '"')),
    }));

    expect(configs).toEqual([
      { url: "/specs/api.yaml", config: {} },
      { url: "/api.json", config: { docExpansion: "none", filter: true, defaultModelsExpandDepth: -1, tagsSorter: "alpha" } },
      { url: "https://example.com/openapi.json", config: { operationsSorter: "method", defaultModelsExpandDepth: 0 } },
      { url: "//example.com/openapi.yaml", config: {} },
    ]);
    expect(read("specs", "api.yaml")).toContain("openapi: 3.1.0");
    expect(build.stderr).toContain('unknown docExpansion value "everything"');
    expect(build.stderr).toContain('invalid defaultModelsExpandDepth value "08"');
    expect(build.stderr).toContain('invalid tryItOutEnabled value "yes"');

    expect(html).toMatch(/<link rel="stylesheet" href="\/vendor\/swagger-ui\.[0-9a-f]+\.css" integrity="sha256-/);
    expect(html).toMatch(/<script defer src="\/vendor\/swagger-ui-bundle\.[0-9a-f]+\.js" integrity="sha256-/);
    expect(html).toContain('<script data-servers="Servers">');

    const other = read("docs", "other", "index.html");
    expect(other).not.toContain("swagger-ui");
  } finally {
    cleanup();
  }
});

test("openapi shortcode fails the build when the description cannot be found", () => {
  const { build, cleanup } = buildSite(LOCAL_ASSETS, `{{< openapi "specs/missing.yaml" >}}\n`);

  try {
    expect(build.status).not.toBe(0);
    expect(build.stderr).toContain('could not find the OpenAPI description "specs/missing.yaml"');
  } finally {
    cleanup();
  }
});

test("openapi shortcode fails the build when Swagger UI assets are misconfigured", () => {
  const { build, cleanup } = buildSite(`params:\n  openapi:\n    base: /vendor/swagger-ui\n`, `{{< openapi "specs/api.yaml" >}}\n`);

  try {
    expect(build.status).not.toBe(0);
    expect(build.stderr).toContain("Swagger UI js configuration is incomplete");
  } finally {
    cleanup();
  }
});
