# ANTI-GRAVITY / A LINKED SPACE WITHOUT THE CEREMONY

anti-gravity is sobmachine’s small answer to a practical spatial question: can a normal walkthrough video become a place another person can enter and navigate?

The system separates appearance from movement. Structure-from-motion, metric depth, and Gaussian splat conversion produce a viewable reconstruction. A second layer derives an occupancy grid, walkable outline, and route graph. The web client then loads those artifacts as a static link.

The design refuses false precision. Unknown cells remain blocked. The sandbox is clearly marked as procedural. QA numbers remain attached to the bundle. The viewer’s brutalist interface makes the state of the system visible instead of hiding it behind polished chrome.

## Current scope

The shipped viewer supports first-person movement, touch input, plan view, point-cloud fallback, optional splat rendering, spawn selection, collision, A* route display, and a pick-and-place sandbox. POI search, richer semantic labels, and AR anchoring are future work.

## Ownership and licence

This rewrite is maintained by sobmachine. Source code remains available under the MIT License. Sample footage and derived test bundles retain their own attribution and redistribution terms.
