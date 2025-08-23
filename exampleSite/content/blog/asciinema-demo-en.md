---
title: "Asciinema Player Demo"
date: 2025-08-21
description: "Demonstrating how to use asciinema player in Hugo blog to play terminal recording files"
tags: ["asciinema", "demo", "terminal"]
---

# Asciinema Player Demo

This article demonstrates how to use asciinema player in Hugo blog to play terminal recording files.

## Basic Usage

The simplest usage, just specify the cast file path:

```markdown
{{</* asciinema file="demo.cast" */>}}
```

{{< asciinema file="demo.cast" >}}

## Player with Theme

You can specify different themes:

```markdown
{{</* asciinema file="demo.cast" theme="dracula" */>}}
```

{{< asciinema file="demo.cast" theme="dracula" >}}

## Marker Points Feature

### Regular Marker Points

Add markers at specific time points for navigation:

```markdown
{{</* asciinema file="demo.cast" markers="2.0,4.0,6.0,8.0" */>}}
```

{{< asciinema file="demo.cast" markers="2.0,4.0,6.0,8.0" >}}

### Marker Points with Labels

Add markers with labels at specific time points:

```markdown
{{</* asciinema file="demo.cast" markers="2.0:ls command,4.0:view files,6.0:execute command,8.0:show path" */>}}
```

{{< asciinema file="demo.cast" markers="2.0:ls command,4.0:view files,6.0:execute command,8.0:show path" >}}

### Mixed Marker Points

Mix regular markers and labeled markers in the same parameter:

```markdown
{{</* asciinema file="demo.cast" markers="1.0,3.0,5.0,2.0:ls command,4.0:view files,6.0:execute command" */>}}
```

{{< asciinema file="demo.cast" markers="1.0,3.0,5.0,2.0:ls command,4.0:view files,6.0:execute command" >}}

### Space Handling Test

Test various space situations to ensure correct parsing:

```markdown
{{</* asciinema file="demo.cast" markers="2.0 , 4.0 , 6.0 , 1.0 : start , 3.0 : execute , 5.0 : end" */>}}
```

{{< asciinema file="demo.cast" markers="2.0 , 4.0 , 6.0 , 1.0 : start , 3.0 : execute , 5.0 : end" >}}

## Custom Playback Settings

You can adjust playback speed and other settings:

```markdown
{{</* asciinema file="demo.cast" speed="2" theme="monokai" */>}}
```

{{< asciinema file="demo.cast" speed="2" theme="monokai" >}}

## Autoplay and Loop

```markdown
{{</* asciinema file="demo.cast" autoplay="true" loop="true" */>}}
```

{{< asciinema file="demo.cast" autoplay="true" loop="true" >}}

## Poster Example

You can specify a poster that will be displayed before the player starts:

```markdown
{{</* asciinema file="demo.cast" poster="npt:0:2" */>}}
```

{{< asciinema file="demo.cast" poster="npt:0:2" >}}

## Complete Configuration Example

```markdown
{{</* asciinema 
    file="demo.cast" 
    theme="solarized-dark" 
    speed="1.5" 
    markers="2.0,4.0,6.0,3.0:file list,5.0:file content,7.0:command execution" 
*/>}}
```

{{< asciinema 
    file="demo.cast" 
    theme="solarized-dark" 
    speed="1.5" 
    markers="2.0,4.0,6.0,3.0:file list,5.0:file content,7.0:command execution" 
>}}

## Advanced Example - Node.js Project Setup

This is a more complex example showing how to set up a Node.js project:

```markdown
{{</* asciinema 
    file="advanced-demo.cast" 
    theme="dracula" 
    speed="2" 
    markers="4.0,7.0,10.0,12.0,14.0,17.0,19.0,2.0:start setup,4.0:create project directory,7.0:initialize npm project,10.0:install dependencies,12.0:view file structure,14.0:create server code,17.0:start server,19.0:test API" 
*/>}}
```

{{< asciinema 
    file="advanced-demo.cast" 
    theme="dracula" 
    speed="2" 
    markers="4.0,7.0,10.0,12.0,14.0,17.0,19.0,2.0:start setup,4.0:create project directory,7.0:initialize npm project,10.0:install dependencies,12.0:view file structure,14.0:create server code,17.0:start server,19.0:test API" 
>}}

## Usage

In your Markdown file, use the following syntax:

```markdown
{{</* asciinema file="your-file.cast" */>}}
```

### Available Parameters

- `file`: cast file path (required)
- `theme`: theme name (default: asciinema)
- `speed`: playback speed (default: 1)
- `autoplay`: whether to autoplay (default: false)
- `loop`: whether to loop playback (default: false)
- `poster`: poster image URL
- `markers`: marker points, supports mixed format:
  - Regular markers: `2.0,4.0,6.0`
  - Labeled markers: `2.0:ls command,4.0:view files`
  - Mixed format: `2.0,4.0,6.0,1.0:start,3.0:execute,5.0:end`
  - **Supports spaces**: `2.0 , 4.0 , 1.0 : start , 3.0 : execute`

### Supported Themes

- asciinema (default)
- dracula
- monokai
- solarized-dark
- solarized-light
- tango
- tomorrow-night
- tomorrow-night-bright
- tomorrow-night-blue
- tomorrow-night-eighties
- tomorrow
- white
