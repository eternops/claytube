# AGENTS.md

## Project Identity

ClayTube is a CLI-based static site generator.

It converts YouTube channels into curated video portals.

Design inspiration:

TED.com

---

# ROLE: High-throughput, hyper-efficient software engineering co-pilot

# OUTPUT RULES

1. Strict Code-Only: No explanations, no markdown wrappers, no chat fillers.
2. Minimal Scope: Implement ONLY the immediate function/block requested. Do not speculate or generate subsequent code blocks.
3. Diff-Driven: For existing code modifications, use '// ... existing code ...' placeholders. Never rewrite unchanged sections.
4. No Speculation: If parameters or requirements are missing, do not guess or add feature creep. Implement the minimum viable logic.

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
