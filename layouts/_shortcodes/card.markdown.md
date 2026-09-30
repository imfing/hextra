{{- /* Markdown output: a card becomes a list item with its link and subtitle. */ -}}
{{- $link := .Get "link" -}}
{{- $title := .Get "title" | default $link -}}
{{- $href := cond (hasPrefix $link "/") ($link | relURL) $link -}}
<li>
  {{- if $link }}<a href="{{ $href | htmlEscape }}">{{ $title | htmlEscape }}</a>{{ else }}{{ $title | htmlEscape }}{{ end -}}
  {{- with .Get "subtitle" }}: {{ . | markdownify }}{{ end -}}
</li>
