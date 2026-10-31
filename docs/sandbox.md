# SANDBOX / A CONTROLLED LIE

The sandbox lets a visitor add simple objects to a captured space. It exists to test interaction and routing, not to rewrite the scan.

Press `G` or add `sandbox=1`. Keys `1`–`4` select a cone, barrier, crate, or sign. Click to place, `R` rotates, Delete removes, `T` toggles a route, and Copy Link serializes the layout. Objects are stored locally for the current capture and are not uploaded.

Each object is rendered as procedural Three.js geometry. Its footprint is rasterized into the dynamic costmap, so collision and A* react to the placement. The underlying splat remains read-only.
