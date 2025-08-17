---
title: کامپوننت FileTree
linkTitle: FileTree
---

## مثال

{{< filetree/container >}}
  {{< filetree/folder name="content" >}}
    {{< filetree/file name="_index.md" >}}
    {{< filetree/folder name="docs" state="closed" >}}
      {{< filetree/file name="_index.md" >}}
      {{< filetree/file name="introduction.md" >}}
      {{< filetree/file name="introduction.fr.md" >}}
    {{< /filetree/folder >}}
  {{< /filetree/folder >}}
  {{< filetree/file name="hugo.toml" >}}
{{< /filetree/container >}}

## نحوه استفاده

```text {filename="Markdown"}
{{</* filetree/container */>}}
  {{</* filetree/folder name="content" */>}}
    {{</* filetree/file name="_index.md" */>}}
    {{</* filetree/folder name="docs" state="closed" */>}}
      {{</* filetree/file name="_index.md" */>}}
      {{</* filetree/file name="introduction.md" */>}}
      {{</* filetree/file name="introduction.fr.md" */>}}
    {{</* /filetree/folder */>}}
  {{</* /filetree/folder */>}}
  {{</* filetree/file name="hugo.toml" */>}}
{{</* /filetree/container */>}}
```

## خيارات

### `filetree/file`

| المعلمة | وصف        |
|---------|------------|
| `name`  | اسم الملف. |

### `filetree/folder`

| المعلمة | وصف                                                                       |
|---------|---------------------------------------------------------------------------|
| `name`  | اسم الملف.                                                                |
| `state` | حالة الملف. يمكن أن تكون `open` أو `closed`. القيمة الافتراضية هي `open`. |
