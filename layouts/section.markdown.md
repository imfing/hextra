{{- .Title | replaceRE "\n" " " | printf "# %s" -}}

{{ .RawContent }}

{{ if .Pages }}
## Pages in this section
{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink }}){{ with .Summary }} - {{ . | plainify | truncate 100 }}{{ end }}
{{ end }}
{{ end }}
