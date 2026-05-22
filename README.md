# ClayTube

**Turn YouTube channels into static video portals.**

ClayTube는 YouTube 채널 목록을 입력하면
자동으로 동기화되는 정적 영상 포털을 생성하는 CLI 도구입니다.

TED.com 스타일의 영상 큐레이션 사이트를
서버 없이 빠르게 구축할 수 있습니다.

---

## Core Idea

Input:

- YouTube channel URLs

Output:

- static website
- `data/channels.json`
- `data/videos.json`
- GitHub Pages deployment

---

## Features

- multi-channel sync
- scheduled updates
- static site generation
- TED-style layout
- zero backend
- GitHub Pages friendly

---

## Commands

```bash
claytube init
claytube sync
claytube build
claytube deploy
```

---

## GitHub Pages Deployment

The GitHub Actions workflow deploys `dist/` to GitHub Pages after running
`claytube sync` and `astro build`.

Repository setup:

- Add `YOUTUBE_API_KEY` as a GitHub repository secret.
- Set GitHub Pages source to `GitHub Actions` in the repository settings.

---

## For Humans

See:

- docs/PRODUCT.md
- docs/SPEC.md
- docs/DESIGN.md

---

## For AI

See:

- AGENTS.md
