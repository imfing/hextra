{{- /*
Converts rendered HTML to Markdown for the Markdown output format.

@param {page} page The page the HTML belongs to.
@param {string} html The HTML to convert.

Before the conversion:
- SVG elements are dropped: Markdown has no equivalent for them, and the icons
  the theme renders inline would otherwise become stray characters.
- The href and src attributes of HTML tags are resolved against the HTML page,
  fragments included. The Markdown file is served from another URL, is often
  copied elsewhere, and has no heading anchors, so relative URLs would no
  longer point to the right place.

After the conversion, blocks prepared by utils/markdown-block.md are restored.

Requires Hugo v0.151.0 or later for transform.HTMLToMarkdown.
*/ -}}
{{- $html := .html | replaceRE `(?s)<svg\b.*?</svg>` "" -}}

{{- $base := urls.Parse .page.Permalink -}}
{{- with .page.OutputFormats.Get "html" -}}
  {{- $base = urls.Parse .Permalink -}}
{{- end -}}

{{- /* Split the HTML into text and start tags in one pass, then read each tag
attribute by attribute, so text or attribute values that merely look like an
href are left alone. */ -}}
{{- $value := `(?:"([^"]*)"|'([^']*)'|([^\s"'=<>\x60]+))` -}}
{{- $attributePattern := printf `\s+([^\s"'>/=]+)(?:\s*=\s*%s)?` $value -}}
{{- $tagPattern := printf `<[a-zA-Z][^\s/>]*(?:\s+[^\s"'>/=]+(?:\s*=\s*%s)?)*\s*/?>` $value -}}
{{- $parts := split ($html | replaceRE $tagPattern "\x00${0}\x00") "\x00" -}}
{{- $chunks := slice -}}
{{- range $i, $part := $parts -}}
  {{- if and (eq (mod $i 2) 1) (findRE `(?i)\s(href|src)\s*=` $part 1) -}}
    {{- $attributes := slice -}}
    {{- range findRESubmatch $attributePattern $part -}}
      {{- $attribute := index . 0 -}}
      {{- $url := or (index . 2) (index . 3) (index . 4) | htmlUnescape -}}
      {{- if and $url (in (slice "href" "src") (lower (index . 1))) -}}
        {{- $name := index . 1 -}}
        {{- with try (urls.Parse $url) -}}
          {{- if and (not .Err) (not .Value.IsAbs) -}}
            {{- $attribute = printf ` %s="%s"` $name (($base.ResolveReference .Value).String | htmlEscape) -}}
          {{- end -}}
        {{- end -}}
      {{- end -}}
      {{- $attributes = $attributes | append $attribute -}}
    {{- end -}}
    {{- $part = printf "%s%s%s" (index (findRE `^<[^\s/>]+` $part 1) 0) (delimit $attributes "") (index (findRE `/?>$` $part 1) 0) -}}
  {{- end -}}
  {{- $chunks = $chunks | append $part -}}
{{- end -}}

{{- $markdown := delimit $chunks "" | transform.HTMLToMarkdown -}}

{{- /* Restore registered blocks. A block alone on its line repeats the
indentation and quote markers of that line on every line, a list marker being
replaced by spaces after the first line, so blocks nested in lists or quotes
stay nested. A block that shares its line, such as one in a table cell, is
flattened onto that line. */ -}}
{{- if strings.Contains $markdown "\ue000" -}}
  {{- range seq 10 -}}
    {{- $restored := false -}}
    {{- range findRESubmatch `(?m)^([ \t>]*)((?:[-*+]|[0-9]+[.)])[ \t]+)?\x{E000}([0-9a-f]{32})\x{E001}[ \t]*$` $markdown -}}
      {{- $match := index . 0 -}}
      {{- $first := printf "%s%s" (index . 1) (index . 2) -}}
      {{- $next := printf "%s%s" (index . 1) (strings.Repeat (len (index . 2)) " ") -}}
      {{- with hugo.Store.Get (printf "hextra/markdown-block/%s" (index . 3)) -}}
        {{- $lines := slice -}}
        {{- range $i, $line := split . "\n" -}}
          {{- $lines = $lines | append (strings.TrimRight " \t" (printf "%s%s" (cond (eq $i 0) $first $next) $line)) -}}
        {{- end -}}
        {{- $markdown = replace $markdown $match (delimit $lines "\n") 1 -}}
        {{- $restored = true -}}
      {{- end -}}
    {{- end -}}
    {{- if not $restored }}{{ break }}{{ end -}}
  {{- end -}}
  {{- range findRESubmatch `\x{E000}([0-9a-f]{32})\x{E001}` $markdown -}}
    {{- $match := index . 0 -}}
    {{- with hugo.Store.Get (printf "hextra/markdown-block/%s" (index . 1)) -}}
      {{- $markdown = replace $markdown $match (. | replaceRE `(?m)^[ \t]*>[ \t>]*` "" | replaceRE `\s*\n\s*` " " | strings.TrimSpace) 1 -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- return $markdown -}}
