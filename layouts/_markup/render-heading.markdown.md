{{- /* Markdown output: a plain heading, without the anchor elements of render-heading.html. */ -}}
<h{{ .Level }}>{{ .Text | safeHTML }}</h{{ .Level }}>
