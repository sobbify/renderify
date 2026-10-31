# ANTI-GRAVITY / SOBMACHINE

**A walkable spatial twin with the polish sanded off.**

anti-gravity turns an ordinary indoor walkthrough into a static, linkable 3D space. The project is intentionally direct: capture a place, reconstruct its geometry, attach a navigation grid, and let somebody else enter from a browser without installing a client.

This repository is now maintained and presented by **sobmachine**. The interface is a deliberate brutalist system: high contrast, square edges, loud status labels, and controls that announce what they do. No decorative image pack is required by the viewer.

## What ships

- `capture/` — field rules for collecting usable phone video.
- `pipeline/` — Python reconstruction, metric alignment, navigation, QA, and packaging.
- `web/` — Vite + TypeScript viewer using Three.js and optional Gaussian splats.
- `kaggle/` — remote GPU/CPU run helpers.
- `test/` — small redistributable artifact bundles and their provenance notes.
- `docs/` — operating notes, demo script, and project record.
- `tools/` — sample and document helpers.

## The hard boundary

The viewer is static. It does not pretend a splat is a CAD model, and it does not silently invent unseen rooms. The navigation grid marks unknown cells as blocked. The sandbox can place procedural obstacles, but those objects are overlays, not scanned facts.

## Run the viewer

Node 20 or newer is recommended. Stage one of the committed sample bundles, then start Vite:

```bash
mkdir -p web/public/artifacts/south-hall-ucb
cp -r test/south-hall-ucb/web/. web/public/artifacts/south-hall-ucb/
cd web
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/?capture=south-hall-ucb`. Use WASD or arrow keys to move, drag or mouse-look to turn, `M` for the plan, `P` for the point cloud, and `G` for the sandbox. `npm run build` creates a static `dist/` directory.

## GitHub Pages

The workflow at `.github/workflows/web-pages.yml` builds and deploys the viewer whenever `main` changes. It stages every committed bundle under `test/<capture>/web/`, keeps committed examples under `web/public/artifacts/`, and writes `artifacts/examples.json` as a machine-readable catalogue.

After enabling **Settings → Pages → Source: GitHub Actions**, the default example is available at:

```text
https://<owner>.github.io/<repository>/?capture=eyefultower-apartment
```

Replace `<owner>` and `<repository>` with the GitHub repository coordinates. Any additional bundle can be opened by changing the `capture` query parameter to its directory name. Because the viewer uses relative asset paths, it works both at a repository Pages URL and at a custom domain.

Useful query switches include `?t=<trajectory-index>`, `?route`, `?sandbox=1`, `?clean`, and `?scale=<0..1>`. Touch devices use a left-side walk stick and right-side look gesture.

## Pipeline rule

Heavy reconstruction runs belong on Kaggle. The local checkout is for code, packaging, and review. The pipeline stages are frame selection, SfM, depth fusion, metric alignment, geometry export, splat conversion, and QA. The exact command contracts live beside each stage.

## Samples and attribution


## Nerfstudio example

A runnable demo is included at `?capture=eyefultower-apartment`. It uses camera metadata from Nerfstudio’s documented EyefulTower apartment example and a clearly labeled procedural point-cloud scaffold for UI demonstration. Fresh captures are in `screenshots/`.

## Maintainer

**sobmachine** owns the current presentation and maintenance of this rewrite. Contributions should keep the viewer honest: prefer measurable behavior, explicit limits, and plain-text documentation over decorative claims.

## License

MIT. See [`LICENSE`](LICENSE).
