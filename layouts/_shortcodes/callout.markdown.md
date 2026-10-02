{{- /* Markdown output: a callout becomes the matching GitHub alert. */ -}}
{{- $types := dict "default" "TIP" "info" "NOTE" "warning" "WARNING" "error" "CAUTION" "important" "IMPORTANT" -}}
{{- $type := index $types (.Get "type" | default "default") | default "TIP" -}}
{{- partial "utils/markdown-block.md" (dict "page" .Page "content" (.InnerDeindent | markdownify) "marker" (printf "[!%s]" $type)) -}}
