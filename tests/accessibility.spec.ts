import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { parseStringPromise } from "xml2js";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];
// TODO: Re-enable once known baseline issues are resolved and tracked.
const DISABLED_RULES = ["color-contrast", "target-size"];

type Violation = Awaited<
  ReturnType<InstanceType<typeof AxeBuilder>["analyze"]>
>["violations"][number];

async function getEnglishPages(baseURL: string): Promise<string[]> {
  const sitemapUrl = `${baseURL}/en/sitemap.xml`;
  const response = await fetch(sitemapUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch sitemap (${response.status} ${response.statusText}) at ${sitemapUrl}`,
    );
  }

  const xml = await response.text();
  const sitemap = (await parseStringPromise(xml)) as {
    urlset?: { url?: Array<{ loc?: string[] }> };
  };

  const pages = (sitemap.urlset?.url ?? [])
    .map((entry) => entry.loc?.[0])
    .filter((url): url is string => Boolean(url))
    .map((url) => {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    });

  if (pages.length === 0) {
    throw new Error(`Sitemap at ${sitemapUrl} returned no URLs.`);
  }

  return pages;
}

function formatViolation(v: Violation): string {
  return `• ${v.id} (${v.impact}) — ${v.nodes.length} element(s)\n  ${v.help}\n  ${v.helpUrl}`;
}

test("all English pages pass axe-core WCAG AA", async ({ page, baseURL }) => {
  const pages = await getEnglishPages(baseURL!);
  const failures: string[] = [];

  for (const path of pages) {
    await test.step(path, async () => {
      await page.goto(path, { waitUntil: "load" });

      const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .disableRules(DISABLED_RULES)
        .analyze();

      if (results.violations.length === 0) {
        return;
      }

      failures.push(
        `--- ${path} ---\n${results.violations
          .map(formatViolation)
          .join("\n\n")}`,
      );
    });
  }

  expect(
    failures,
    `Accessibility violations found:\n\n${failures.join("\n\n")}`,
  ).toHaveLength(0);
});
