{{- /* Markdown output: keep Mermaid diagrams as fenced source blocks. */ -}}
<pre><code class="language-mermaid">{{ .Inner | htmlEscape | safeHTML }}</code></pre>
