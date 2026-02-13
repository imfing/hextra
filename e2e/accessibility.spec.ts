import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { parseStringPromise } from "xml2js";

interface SitemapUrl {
  loc: string[];
}

interface Sitemap {
  urlset: {
    url: SitemapUrl[];
  };
}

async function getEnglishPages(baseURL: string): Promise<string[]> {
  // Hugo generates a sitemap index at /sitemap.xml with per-language sitemaps.
  // The English sitemap is at /en/sitemap.xml and contains all English pages.
  const response = await fetch(`${baseURL}/en/sitemap.xml`);
  const xml = await response.text();
  const result: Sitemap = await parseStringPromise(xml);
  const urls = result.urlset.url.map((u) => u.loc[0]);

  return urls.map((url) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  });
}

function formatViolations(
  violations: Awaited<
    ReturnType<InstanceType<typeof AxeBuilder>["analyze"]>
  >["violations"],
): string {
  return violations
    .map(
      (v) =>
        `• ${v.id} (${v.impact}) — ${v.nodes.length} element(s)\n  ${v.help}\n  ${v.helpUrl}`,
    )
    .join("\n\n");
}

test("all English pages pass axe-core WCAG AA", async ({ page, baseURL }) => {
  const pages = await getEnglishPages(baseURL!);
  const failures: { path: string; report: string }[] = [];

  for (const path of pages) {
    await page.goto(path, { waitUntil: "load" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    if (results.violations.length > 0) {
      failures.push({
        path,
        report: formatViolations(results.violations),
      });
    }
  }

  const summary = failures
    .map((f) => `\n--- ${f.path} ---\n${f.report}`)
    .join("\n");

  expect(failures, `Accessibility violations found:\n${summary}`).toHaveLength(
    0,
  );
});
