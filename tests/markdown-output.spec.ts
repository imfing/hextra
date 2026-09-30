import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("Markdown output renders shortcodes and resolves links", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "hextra-markdown-output-"));
  const contentDir = join(siteDir, "content");
  const publishDir = join(siteDir, "public");
  const themesDir = join(siteDir, "themes");

  mkdirSync(join(contentDir, "docs", "guide"), { recursive: true });
  mkdirSync(themesDir);
  symlinkSync(process.cwd(), join(themesDir, "hextra"), "dir");

  writeFileSync(
    join(siteDir, "hugo.yaml"),
    `title: Test
baseURL: https://example.org/base/
theme: hextra
outputs:
  page: [html, markdown]
markup:
  goldmark:
    renderer:
      unsafe: true
    extensions:
      passthrough:
        enable: true
        delimiters:
          block: [["$$", "$$"]]
          inline: [["\\\\(", "\\\\)"]]
`
  );
  writeFileSync(join(contentDir, "_index.md"), "---\ntitle: Home\n---\n");
  writeFileSync(join(contentDir, "docs", "_index.md"), "---\ntitle: Docs\n---\n");
  writeFileSync(join(contentDir, "docs", "guide", "_index.md"), "---\ntitle: Guide\n---\n");
  writeFileSync(join(contentDir, "docs", "guide", "sibling.md"), "---\ntitle: Sibling\n---\n");
  writeFileSync(
    join(contentDir, "docs", "guide", "current.md"),
    `---
title: Current
---

## Section Title

See [Sibling](../sibling), [Absolute](/docs/) and [Remote](https://example.com/page).

### Custom Heading {#custom-id}

Jump to [the heading](#custom-id) or <a HREF = '../sibling'>raw HTML</a>.

<pre><code>command href="relative"</code></pre>

<a href="été">Unicode</a> <a title='sample href="decoy"' href="actual">Decoy</a> <a title="1 > 0" href="greater">Greater</a> <a title="1 < 2" href="less">Less</a> <a href=unquoted>Unquoted</a>

> [!WARNING] Careful
> Alert body.

> Quoted command:
>
> \`\`\`sh
> echo one
> echo two
> \`\`\`

- Item with a quote:

  > Nested in a list
  > > and in a quote

- > Quoted first block.

1. > [!NOTE]
   > Numbered alert.

| Cell | Callout |
| ---- | ------- |
| Demo | {{< callout type="info" >}}Table body{{< /callout >}} |

\`\`\`text
\ue000NOTE\ue001 \ue00000000000000000000000000000000000\ue001
\`\`\`

\`\`\`sh {linenos=table,filename="install.sh"}
echo three
\`\`\`

{{< callout type="info" >}}
Callout **body**.
{{< /callout >}}

{{< tabs >}}
{{< tab name="npm" >}}npm install{{< /tab >}}
{{< tab name="yarn" >}}yarn add{{< /tab >}}
{{< /tabs >}}

{{< cards >}}
{{< card link="../sibling" title="Sibling card" subtitle="Card subtitle" icon="document" >}}
{{< /cards >}}

\`\`\`mermaid
graph TD;
  A-->B;
\`\`\`

Inline \\(a^2 + b^2\\) math.
`
  );

  try {
    execFileSync("hugo", ["--source", siteDir, "--themesDir", themesDir, "--destination", publishDir], { cwd: process.cwd(), stdio: "pipe" });

    const markdown = readFileSync(join(publishDir, "docs", "guide", "current.md"), "utf8");

    expect(markdown).not.toContain("{{<");
    expect(markdown).not.toMatch(/<svg|<div|<span/);

    expect(markdown).toContain("## Section Title\n");
    expect(markdown).not.toContain("[](#section-title)");

    expect(markdown).toContain("[Sibling](https://example.org/base/docs/guide/sibling)");
    expect(markdown).toContain("[Absolute](https://example.org/base/docs/)");
    expect(markdown).toContain("[Remote](https://example.com/page).");
    expect(markdown).toContain("[the heading](https://example.org/base/docs/guide/current/#custom-id)");
    expect(markdown).toContain("[raw HTML](https://example.org/base/docs/guide/sibling)");
    expect(markdown).toContain('command href="relative"');
    expect(markdown).toContain("[Unicode](https://example.org/base/docs/guide/current/%C3%A9t%C3%A9)");
    expect(markdown).toContain(`[Decoy](https://example.org/base/docs/guide/current/actual 'sample href="decoy"')`);
    expect(markdown).toContain('[Greater](https://example.org/base/docs/guide/current/greater "1 > 0")');
    expect(markdown).toContain('[Less](https://example.org/base/docs/guide/current/less "1 < 2")');
    expect(markdown).toContain("[Unquoted](https://example.org/base/docs/guide/current/unquoted)");

    expect(markdown).toContain("> [!WARNING] Careful\n> Alert body.");
    expect(markdown).toContain("> Quoted command:\n>\n> \`\`\`sh\n> echo one\n> echo two\n> \`\`\`");
    expect(markdown).toMatch(/- Item with a quote:\n *\n {2,4}> Nested in a list\n {2,4}>\n {2,4}> > and in a quote/);
    expect(markdown).toContain("- > Quoted first block.");
    expect(markdown).toContain("1. > [!NOTE]\n   > Numbered alert.");
    expect(markdown).toContain("| Demo | [!NOTE] Table body |");
    expect(markdown).toContain("\ue000NOTE\ue001 \ue00000000000000000000000000000000000\ue001");
    expect(markdown).toContain("install.sh\n\n\`\`\`sh\necho three\n\`\`\`");
    expect(markdown).toContain("> [!NOTE]\n> Callout **body**.");

    expect(markdown).toMatch(/\*\*npm\*\*\s+npm install\s+\*\*yarn\*\*\s+yarn add/);
    expect(markdown).toContain("- [Sibling card](https://example.org/base/docs/guide/sibling): Card subtitle");

    expect(markdown).toMatch(/```mermaid\ngraph TD;\n {2}A-->B;\n```/);
    expect(markdown).toContain("Inline $`a^2 + b^2`$ math.");
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
