{{- /*
Returns the page body for the Markdown output format.

The rendered content is converted back to Markdown, so shortcodes, includes and
links resolve the same way as in HTML instead of leaking their source syntax.
Output-specific render hooks (layouts/_markup/*.markdown.md) and shortcodes
(layouts/_shortcodes/*.markdown.md) shape the HTML before the conversion where
the HTML version would not convert cleanly. See utils/html-to-markdown.md.
*/ -}}
{{- partial "utils/html-to-markdown.md" (dict "page" . "html" .Content) -}}
