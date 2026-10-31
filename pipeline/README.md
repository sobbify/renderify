# RECONSTRUCTION PIPELINE

The pipeline is the measurement side of anti-gravity. It converts a walkthrough into artifacts the web viewer can load without a server.

## Sequence

1. Select stable frames from the source video.
2. Run structure-from-motion and retain camera registration metrics.
3. Fuse metric indoor depth and align scale/gravity.
4. Derive a 2.5D occupancy grid and walkable outline.
5. Train or convert a Gaussian representation when the run budget allows.
6. Package navigation, point data, splat data, metadata, and QA.

All stages are designed to be inspectable. A failed QA gate is recorded rather than hidden behind a green UI status. Heavy jobs should run through the Kaggle helpers in `kaggle/`.

## Local checks

Install the pinned requirements from `requirements.txt`, then run `pytest pipeline/tests`. The test suite covers geometry alignment, metricization, lazy imports, PLY round trips, and splat conversion contracts.

The pipeline code is MIT licensed and maintained under the sobmachine project identity.
