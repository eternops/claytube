# CLI

## Philosophy

ClayTube is CLI-first.

A user should be able to create and publish a site
without editing source code.

---

## Commands

### claytube init

Create a new ClayTube project.

```bash
claytube init my-site
claytube init my-site --git
```

Creates:

```text
my-site/
  claytube.config.yaml
  data/
    channels.json
    videos.json
  src/
  astro.config.mjs
  package.json
```

---

## Add channels

Edit:

`claytube.config.yaml`

Example:

```yaml
channels:
  - https://youtube.com/@TED
  - https://youtube.com/@MITOpenCourseWare
```

---

### claytube sync

Fetch latest YouTube metadata.

```bash
claytube sync
```

Updates:

- data/channels.json
- data/videos.json

---

### claytube build

Generate static site.

```bash
claytube build
```

Output:

```text
dist/
```

---

### claytube deploy

Publish to GitHub Pages.

```bash
claytube deploy
```

---

## Options

### --config

Specify config file.

```bash
claytube sync --config my.yaml
```

---

### --dry-run

Preview changes without writing.

```bash
claytube sync --dry-run
```

---

## Errors

Examples:

- invalid YouTube URL
- missing API key
- build failed
