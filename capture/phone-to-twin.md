# PHONE VIDEO TO LINKED SPACE

This runbook connects a phone capture to a static sobmachine viewer.

## Handoff

1. Preserve the original video and provenance note.
2. Run the frame preflight and reject clips with severe blur, clipped exposure, or insufficient overlap.
3. Push code and capture inputs through `kaggle/tools/`.
4. Run reconstruction and inspect registration, metric scale, occupancy, and QA.
5. Copy the resulting web bundle into `web/public/artifacts/<capture>/`.
6. Build the viewer and test both desktop and touch input.

The link is not the source of truth by itself. The artifact bundle, QA JSON, and capture notes travel together so a reviewer can reproduce the claim.
