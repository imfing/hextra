{{- /* Markdown output: a plain code block, with its file name when set, and without line numbers or copy button. */ -}}
{{- $lang := .Attributes.lang | default .Type -}}
{{- with .Attributes.filename -}}
  {{- $filename := . -}}
  {{- with $.Attributes.base_url -}}
    {{- $url := urls.JoinPath (strings.TrimSuffix "/" .) (strings.TrimPrefix "/" $filename) -}}
<p><a href="{{ $url | htmlEscape }}">{{ $filename | htmlEscape }}</a></p>
  {{- else -}}
<p>{{ $filename | htmlEscape }}</p>
  {{- end }}
{{ end -}}
<pre><code{{ with $lang }} class="language-{{ . | htmlEscape }}"{{ end }}>{{ .Inner | htmlEscape }}</code></pre>
