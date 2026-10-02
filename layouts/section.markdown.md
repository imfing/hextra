{{- .Title | replaceRE "\n" " " | printf "# %s" }}
{{ partial "utils/markdown-content.md" . }}
