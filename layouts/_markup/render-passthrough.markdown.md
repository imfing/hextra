{{- /*
Markdown output: keep the TeX source instead of the rendered KaTeX markup.

The source goes in code elements so the conversion does not escape its
backslashes: block math becomes a "math" fenced block and inline math uses the
$`...`$ syntax, both supported by GitHub.
*/ -}}
{{- if eq .Type "block" -}}
<pre><code class="language-math">{{ .Inner | htmlEscape | safeHTML }}</code></pre>
{{- else -}}
${{ printf "<code>%s</code>" (.Inner | htmlEscape) | safeHTML }}$
{{- end -}}
