# Contribute to Hextra

👋 Thank you for being interested in contributing to Hextra! As an open source project, we welcome contributions of many forms including bug reports, feature requests, documentation improvements, and code contributions.

<!-- omit in toc -->
## Table of Contents

- [Guidelines](#guidelines)
  - [Contributing Code](#contributing-code)
  - [Contributing Documentation](#contributing-documentation)
  - [💬 GitHub Discussions](#-github-discussions)
  - [GitHub Issues](#github-issues)
- [Development](#development)
  - [Local development setup](#local-development-setup)
  - [Project structure](#project-structure)
  - [Start the development server](#start-the-development-server)
  - [Compile the styles](#compile-the-styles)


## Guidelines

### Contributing Code

To contribute, please follow the ["Fork and Pull Request"][fork and pull] workflow：

Fork the repository, make your changes, and then submit a pull request.
Please make sure to include a description of the changes you made and why you made them.
Use [Conventional Commits][conventional commits] message to make it easier to understand the changes you made.

### Contributing Documentation

Similar to contributing code, you can also contribute to the documentation by submitting a pull request.

The documentation site is located in the [`exampleSite`](../exampleSite/) folder.
You can make changes to the documentation and create a pull request. A preview of the new documentation will be automatically generated and displayed in the pull request comment via [Netlify][netlify deploy preview].

### 💬 GitHub Discussions

We’re using [Discussions][discussions] as a place to connect with other members using Hextra:

- Ask questions you’re wondering about.
- Share ideas.
- Engage with other users.

### GitHub Issues

If you find a bug or have a feature request, please [open an issue][issues].

Please make sure to include a description of the bug or feature you are requesting. If you are reporting a bug, please include steps to reproduce the bug.

We recommend that you search existing [issues][issues] or discussions before opening a new one to prevent duplicates.

## Development

> **Note**
> You can start developing on [GitHub Codespaces][open in codespaces] or use [devcontainer][devcontainer] locally without installing any dependencies.

### Local development setup

- [Hugo][hugo] >= v0.124.0 (extended version)
- [Node.js][nodejs]
- [Go][go]

Install dependencies:

```bash
npm i
```

### Project structure

- [`assets`](../assets/): CSS styles and JavaScript files.
- [`data`](../data/): The theme data files. Now only contains the `icons.yaml` file.
- [`exampleSite`](../exampleSite/): The documentation site for the theme.
- [`i18n`](../i18n/): The theme translation files.
- [`layouts`](../layouts/): The theme layouts.
- [`static`](../static/): The static files for the theme. For example, the favicon and the site logo.

Please refer to the [Hugo documentation][hugo] for more information.

### Start the development server

```bash
npm run dev:theme
```

It will start the Hugo server on `http://localhost:1313/` for the `exampleSite` content.

### Compile the styles

For development preview, we compile the Tailwind CSS styles on the fly. But for production, we need to compile the styles first.

```bash
npm run build:css
```

It will compile the Tailwind CSS styles and generate the `assets/css/compiled/main.css` file.

<!--links-->

[fork and pull]: https://docs.github.com/en/get-started/quickstart/contributing-to-projects
[conventional commits]: https://www.conventionalcommits.org
[issues]: https://github.com/imfing/hextra/issues
[discussions]: https://github.com/imfing/hextra/discussions
[nodejs]: https://nodejs.org/en/
[hugo]: https://gohugo.io/
[go]: https://golang.org/doc/install
[devcontainer]: https://code.visualstudio.com/docs/devcontainers/containers
[open in codespaces]: https://codespaces.new/imfing/hextra
[netlify deploy preview]: https://docs.netlify.com/site-deploys/deploy-previews/
