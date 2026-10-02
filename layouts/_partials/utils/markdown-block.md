{{- /*
Returns a blockquote, optionally a GitHub alert, prepared for the Markdown output format.

@param {page} page The page the content belongs to.
@param {string} content The blockquote content, as HTML.
@param {string} marker The optional first line, such as "[!NOTE] Title".

The HTML-to-Markdown conversion only quotes the first line of a code block
nested in a blockquote, and would escape the brackets of an alert marker. The
content is therefore converted and quoted line by line here, stored in
hugo.Store under a key built from its MD5 hash, and replaced by that hash
between private-use characters (U+E000/U+E001). utils/html-to-markdown.md
restores stored blocks only: text shaped like a token is left alone unless it
copies the hash of a stored block.
*/ -}}
{{- $markdown := partial "utils/html-to-markdown.md" (dict "page" .page "html" .content) -}}
{{- $lines := slice -}}
{{- with .marker }}{{ $lines = $lines | append (printf "> %s" .) }}{{ end -}}
{{- range split (strings.Trim $markdown "\n") "\n" -}}
  {{- $lines = $lines | append (strings.TrimRight " " (printf "> %s" .)) -}}
{{- end -}}
{{- $block := delimit $lines "\n" -}}
{{- $id := md5 $block -}}
{{- /* One key per block: reads and writes then go through the synchronized
Store methods, as pages render in parallel. */ -}}
{{- hugo.Store.Set (printf "hextra/markdown-block/%s" $id) $block -}}
<p>{{ printf "\ue000%s\ue001" $id }}</p>
