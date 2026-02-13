import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { parseStringPromise } from "xml2js";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];
const DISABLED_RULES = ["color-contrast", "target-size"];

type Violation = Awaited<
  ReturnType<InstanceType<typeof AxeBuilder>["analyze"]>
>["violations"][number];

async function getEnglishPages(baseURL: string): Promise<string[]> {
  const xml = await (await fetch(`${baseURL}/en/sitemap.xml`)).text();
  const sitemap = (await parseStringPromise(xml)) as {
    urlset?: { url?: Array<{ loc?: string[] }> };
  };

  return (sitemap.urlset?.url ?? [])
    .map((entry) => entry.loc?.[0])
    .filter((url): url is string => Boolean(url))
    .map((url) => {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    });
}

function formatViolation(v: Violation): string {
  return `• ${v.id} (${v.impact}) — ${v.nodes.length} element(s)\n  ${v.help}\n  ${v.helpUrl}`;
}

test("all English pages pass axe-core WCAG AA", async ({ page, baseURL }) => {
  const pages = await getEnglishPages(baseURL!);
  const failures: string[] = [];

  for (const path of pages) {
    await page.goto(path, { waitUntil: "load" });

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .disableRules(DISABLED_RULES)
      .analyze();

    if (results.violations.length === 0) {
      continue;
    }

    failures.push(
      `--- ${path} ---\n${results.violations
        .map(formatViolation)
        .join("\n\n")}`,
    );
  }

  expect(
    failures,
    `Accessibility violations found:\n\n${failures.join("\n\n")}`,
  ).toHaveLength(0);
});
