# Local Development

Use local linking during ClayTube development.

```bash
cd claytube
npm install
npm run build
npm link

cd ../my-site
npm link claytube
npm run sync
```
