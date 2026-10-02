{{- /* Markdown output: every tab is emitted in order, under its name. */ -}}
{{- .Inner -}}
{{- $names := slice -}}
{{- with .Get "items" }}{{ $names = split . "," }}{{ end -}}
{{- range $i, $tab := ($.Store.Get "tabs") | default slice -}}
  {{- $name := $tab.name -}}
  {{- if lt $i (len $names) }}{{ $name = index $names $i }}{{ end }}
<p><strong>{{ $name | htmlEscape }}</strong></p>
{{ $tab.content | markdownify }}
{{ end -}}
