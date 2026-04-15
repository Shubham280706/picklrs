/**
 * Lottie animation data — Pickleball bouncing with squish + rotation + shadow
 * Canvas: 200 × 300  |  60 fps  |  90 frames (1.5 s loop)
 */

// Helper: outer ring of N holes at radius R
function ring(count, radius, size, color) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    const px = Math.round(Math.cos(a) * radius * 10) / 10;
    const py = Math.round(Math.sin(a) * radius * 10) / 10;
    return {
      ty: 'gr', nm: `h${i}`, it: [
        { ty: 'el', p: { a: 0, k: [px, py] }, s: { a: 0, k: [size, size] } },
        { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 }, r: 1 },
        { ty: 'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} },
      ],
    };
  });
}

const DARK_HOLE = [0.047, 0.220, 0.137, 1];

const ballBounceData = {
  v: '5.9.0',
  fr: 60,
  ip: 0,
  op: 90,
  w: 200,
  h: 300,
  nm: 'Pickleball Bounce',
  ddd: 0,
  assets: [],
  layers: [
    /* ── Layer 2: Ground shadow ─────────────────────────── */
    {
      ddd: 0, ind: 2, ty: 4, nm: 'Shadow',
      sr: 1, ao: 0, ip: 0, op: 90, st: 0, bm: 0,
      ks: {
        o: { a: 0, k: 45 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 272, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0,  s: [22, 22, 100], e: [100, 100, 100], i: { x: [0.42], y: [1] }, o: { x: [0.58], y: [0] } },
            { t: 45, s: [100, 100, 100], e: [22, 22, 100], i: { x: [0.42], y: [1] }, o: { x: [0.58], y: [0] } },
            { t: 90, s: [22, 22, 100] },
          ],
        },
      },
      shapes: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [70, 18] } },
        { ty: 'fl', c: { a: 0, k: [0, 0, 0, 1] }, o: { a: 0, k: 100 }, r: 1 },
        { ty: 'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} },
      ],
    },

    /* ── Layer 1: Ball ───────────────────────────────────── */
    {
      ddd: 0, ind: 1, ty: 4, nm: 'Ball',
      sr: 1, ao: 0, ip: 0, op: 90, st: 0, bm: 0,
      ks: {
        o: { a: 0, k: 100 },
        /* Continuous rotation */
        r: {
          a: 1,
          k: [
            { t: 0,  s: [0],   e: [360], i: { x: [0.5], y: [0.5] }, o: { x: [0.5], y: [0.5] } },
            { t: 90, s: [360] },
          ],
        },
        /* Gravity fall → bounce → rise */
        p: {
          a: 1,
          k: [
            { t: 0,  s: [100, 55,  0], e: [100, 248, 0], i: { x: [0.40], y: [1.25] }, o: { x: [0.55], y: [0]  } },
            { t: 45, s: [100, 248, 0], e: [100, 55,  0], i: { x: [0.55], y: [0]    }, o: { x: [0.40], y: [1.25]} },
            { t: 90, s: [100, 55, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        /* Squish at bounce */
        s: {
          a: 1,
          k: [
            { t: 0,  s: [100, 100, 100], e: [100, 100, 100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
            { t: 43, s: [100, 100, 100], e: [128,  75, 100], i: { x: [0.2], y: [1] }, o: { x: [0.8], y: [0] } },
            { t: 45, s: [128,  75, 100], e: [100, 100, 100], i: { x: [0.2], y: [1] }, o: { x: [0.8], y: [0] } },
            { t: 48, s: [100, 100, 100] },
          ],
        },
      },
      shapes: [
        /* Main sphere */
        {
          ty: 'gr', nm: 'Body', it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [92, 92] } },
            { ty: 'fl', c: { a: 0, k: [0.173, 0.561, 0.384, 1] }, o: { a: 0, k: 100 }, r: 1 },
            { ty: 'st', c: { a: 0, k: [0.082, 0.361, 0.239, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2, ml: 4 },
            { ty: 'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} },
          ],
        },
        /* Outer ring of 8 holes */
        ...ring(8, 28, 11, DARK_HOLE),
        /* Inner ring of 6 holes */
        ...ring(6, 13, 8, DARK_HOLE),
        /* Seam line (horizontal dash) */
        {
          ty: 'gr', nm: 'Seam', it: [
            {
              ty: 'sh', ks: { a: 0, k: {
                i: [[0,0],[0,0]], o: [[0,0],[0,0]],
                v: [[-38, 0], [38, 0]], c: false,
              }},
            },
            { ty: 'st', c: { a: 0, k: [0.082, 0.361, 0.239, 1] }, o: { a: 0, k: 40 }, w: { a: 0, k: 2 }, lc: 2, lj: 2, ml: 4 },
            { ty: 'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} },
          ],
        },
        /* Specular gloss */
        {
          ty: 'gr', nm: 'Gloss', it: [
            { ty: 'el', p: { a: 0, k: [-16, -18] }, s: { a: 0, k: [22, 14] } },
            { ty: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 30 }, r: 1 },
            { ty: 'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} },
          ],
        },
      ],
    },
  ],
};

export default ballBounceData;
