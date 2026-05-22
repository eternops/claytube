# SPEC

## Commands

### claytube init

새 프로젝트 생성

---

### claytube sync

YouTube API 호출

Update:

- data/channels.json
- data/videos.json

---

### claytube build

정적 사이트 생성

---

### claytube deploy

GitHub Pages 배포

---

## Config

`claytube.config.yaml`

Example:

```yaml
site:
  title: My Channel Hub

channels:
  - https://youtube.com/@ted
  - https://youtube.com/@mit
```
