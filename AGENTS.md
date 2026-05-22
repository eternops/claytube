# AGENTS.md

## Project Identity

ClayTube is a CLI-based static site generator.

It converts YouTube channels into curated video portals.

Design inspiration:

TED.com

---

## Stack

- Astro
- TypeScript
- static-first
- GitHub Pages
- YouTube Data API

---

## Core Workflow

1. Read `claytube.config.yaml`
2. Fetch YouTube data
3. Update `data/channels.json`
4. Update `data/videos.json`
5. Generate static pages
6. Deploy

---

## Priorities

Prefer:

- deterministic output
- simple data flow
- minimal dependencies
- reusable templates

Avoid:

- database
- backend server
- unnecessary client-side JS

---

## Output Structure

```text
claytube.config.yaml
data/
  channels.json
  videos.json
dist/
  index.html
  videos/
  channels/
```

---

## Read Next

- docs/SPEC.md
- docs/ARCHITECTURE.md
- docs/DATA_MODEL.md
