---
title: FileTree コンポーネント
linkTitle: FileTree
---

## 例

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

## 使用方法

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

## オプション

### `filetree/file`

| パラメータ  | 説明       |
|--------|----------|
| `name` | ファイルの名前。 |

### `filetree/folder`

| パラメータ   | 説明                                                       |
|---------|----------------------------------------------------------|
| `name`  | ファイルの名前。                                                 |
| `state` | ファイルの状態。`open` または `closed` のいずれかになります。デフォルトは `open` です。 |
