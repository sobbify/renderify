# ANTI-GRAVITY VIEWER

The web client is a static first-person viewer for a packaged spatial twin. It loads `nav.json`, optional `cloud.ply`, optional `splat.splat`, and metadata from `public/artifacts/<capture>/`.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run preview
```

The interface deliberately uses no project image assets. The visual system is CSS, canvas, WebGL, and procedural sandbox geometry: black ink, warm paper, signal red, and acid green.

## Controls

Desktop: click to enter, WASD/arrows to walk, mouse to look, Shift to move faster, `M` to toggle the plan, `P` to toggle debug points, and `G` to open the sandbox. Mobile: drag to look and use the left half of the screen to walk.

The sandbox supports four procedural objects, placement, rotation, removal, shareable layouts, collision updates, and A* rerouting. It is an experiment layer, not a claim about the captured room.

## Capture selection

Choose a bundle with `?capture=south-hall-ucb` or another directory present under `public/artifacts/`. A bundle without a splat falls back to the point cloud and debug geometry.
