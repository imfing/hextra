{{- /* Markdown output: a GitHub alert. The foldable sign has no GitHub equivalent and is dropped. */ -}}
{{- $marker := printf "[!%s]" (upper .AlertType) -}}
{{- with .AlertTitle -}}
  {{- $title := partial "utils/html-to-markdown.md" (dict "page" $.Page "html" .) -}}
  {{- $marker = printf "%s %s" $marker (strings.Trim $title "\n") -}}
{{- end -}}
{{- partial "utils/markdown-block.md" (dict "page" .Page "content" .Text "marker" $marker) -}}
