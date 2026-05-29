# ClayTube

Turn YouTube channels into your own curated video website.

ClayTube is a static site generator for building TED-style video portals from YouTube channels.

---

## Quick Start

### 1. Create a new site

```bash
npx claytube init my-site
cd my-site
npm install
```

---

### 2. Add your YouTube channels

Edit:

```text
claytube.config.yaml
```

Example:

```yaml
site:
  title: My Learning Hub
  description: Curated educational videos

channels:
  - https://www.youtube.com/@cable8mm
  - https://www.youtube.com/@3blue1brown
```

ClayTube supports:

- `https://youtube.com/@handle`
- `https://youtube.com/channel/UC...`
- `https://youtube.com/c/...`
- `https://youtube.com/user/...`

---

### 3. Add your YouTube API key

Create:

```text
.env
```

Contents:

```bash
YOUTUBE_API_KEY=your_api_key_here
```

---

### 4. Fetch videos

```bash
npm run sync
```

This updates:

```text
data/channels.json
data/videos.json
```

---

### 5. Preview locally

```bash
npm run dev
```

Open:

```text
http://localhost:4321
```

---

### 6. Build static site

```bash
npm run build
```

Output:

```text
dist/
```

Deploy `dist/` to GitHub Pages.

---

## What ClayTube Does

- Import videos from one or more YouTube channels
- Generate a clean editorial website
- Auto-update with GitHub Actions
- Deploy free on GitHub Pages

---

## Commands

```bash
claytube init
claytube sync
claytube build
```

---

## Project Structure

```text
claytube.config.yaml
.env
data/
  channels.json
  videos.json
src/
dist/
```

---

## License

MIT
