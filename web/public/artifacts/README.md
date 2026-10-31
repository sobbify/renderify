# ARTIFACT BUNDLES

Each capture folder is loaded by the static viewer. A minimal bundle contains `nav.json`; richer bundles may include `cloud.ply`, `splat.splat`, a Gaussian-Splat `*.ply`, `meta.json`, and supporting grid data.

Folder names are selected with the `capture` query parameter. Keep metadata and QA beside the files they describe.

The `kitchen` bundle is the official krpano `kitchen_250.splat` example converted to the standard binary Gaussian-Splat PLY layout so it can be used as a real `.ply` asset in the viewer.
