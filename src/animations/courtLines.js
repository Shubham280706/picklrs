/**
 * Lottie animation — Pickleball court lines drawing in sequence
 * Canvas: 1440 × 800  |  30 fps  |  240 frames (8 s, then loops)
 *
 * Court layout (absolute → relative to layer at center 720,400):
 *   Outer rect  : (-540,-320) → (540,320)
 *   Kitchen top : y = -80   (absolute 320)
 *   Kitchen bot : y =  80   (absolute 480)
 *   Center line : x = 0     (absolute 720)
 *   Net         : y = 0     (absolute 400), dashed gold
 */

/* Build a line path shape (sh) from two points */
function linePath(x1, y1, x2, y2) {
  return {
    ty: 'sh',
    nm: 'path',
    ks: {
      a: 0,
      k: {
        i: [[0, 0], [0, 0]],
        o: [[0, 0], [0, 0]],
        v: [[x1, y1], [x2, y2]],
        c: false,
      },
    },
  };
}

/* Build a closed rectangle path */
function rectPath(x1, y1, x2, y2) {
  return {
    ty: 'sh',
    nm: 'rect',
    ks: {
      a: 0,
      k: {
        i: [[0,0],[0,0],[0,0],[0,0]],
        o: [[0,0],[0,0],[0,0],[0,0]],
        v: [[x1,y1],[x2,y1],[x2,y2],[x1,y2]],
        c: true,
      },
    },
  };
}

/* Animated trim-path end: 0 → 100 between frames [startF, endF] */
function trimEnd(startF, endF) {
  return {
    ty: 'tm',
    nm: 'Trim',
    s: { a: 0, k: 0 },
    e: {
      a: 1,
      k: [
        { t: startF, s: [0],   e: [100], i: { x: [0.45], y: [1] }, o: { x: [0.55], y: [0] } },
        { t: endF,   s: [100] },
      ],
    },
    o: { a: 0, k: 0 },
    m: 1,
  };
}

/* Standard group transform */
const TR = {
  ty: 'tr',
  p: { a:0, k:[0,0] }, a: { a:0, k:[0,0] },
  s: { a:0, k:[100,100] }, r: { a:0, k:0 },
  o: { a:0, k:100 }, sk: { a:0, k:0 }, sa: { a:0, k:0 },
};

/* Fade in at frame F */
function fadeIn(F) {
  return {
    a: 1,
    k: [
      { t: F,     s: [0],   e: [100], i:{x:[0.5],y:[1]}, o:{x:[0.5],y:[0]} },
      { t: F + 8, s: [100] },
    ],
  };
}

/* Green stroke */
const GREEN_ST = (w = 2.5) => ({
  ty: 'st',
  c: { a:0, k:[0.118, 0.431, 0.298, 1] },
  o: { a:0, k:100 },
  w: { a:0, k:w },
  lc: 2, lj: 2, ml: 4,
});

/* Gold stroke (for net) */
const GOLD_ST = {
  ty: 'st',
  c: { a:0, k:[0.831, 0.627, 0.090, 1] },
  o: { a:0, k:100 },
  w: { a:0, k:4 },
  lc: 2, lj: 2, ml: 4,
  d: [
    { nm: 'dash', n: 'd', v: { a:0, k:18 } },
    { nm: 'gap',  n: 'g', v: { a:0, k:11 } },
  ],
};

const courtLinesData = {
  v: '5.9.0',
  fr: 30,
  ip: 0,
  op: 240,
  w: 1440,
  h: 800,
  nm: 'Pickleball Court Lines',
  ddd: 0,
  assets: [],
  layers: [
    /* Layer 1 — all shapes, single shape layer, anchor at court center */
    {
      ddd: 0, ind: 1, ty: 4, nm: 'Court',
      sr: 1, ao: 0, ip: 0, op: 240, st: 0, bm: 0,
      ks: {
        o: { a:0, k:100 },
        r: { a:0, k:0 },
        p: { a:0, k:[720, 400, 0] },
        a: { a:0, k:[0, 0, 0] },
        s: { a:0, k:[100, 100, 100] },
      },
      shapes: [

        /* ── Outer rectangle (frames 0→50) ──────────────── */
        {
          ty: 'gr', nm: 'Outer', it: [
            rectPath(-540, -320, 540, 320),
            GREEN_ST(3),
            trimEnd(0, 50),
            { ...TR, o: fadeIn(0) },
          ],
        },

        /* ── Kitchen line top  y=-80  (frames 20→55) ────── */
        {
          ty: 'gr', nm: 'KitchenTop', it: [
            linePath(-540, -80, 540, -80),
            GREEN_ST(2),
            trimEnd(20, 55),
            { ...TR, o: fadeIn(20) },
          ],
        },

        /* ── Kitchen line bottom  y=80  (frames 25→60) ─── */
        {
          ty: 'gr', nm: 'KitchenBot', it: [
            linePath(-540, 80, 540, 80),
            GREEN_ST(2),
            trimEnd(25, 60),
            { ...TR, o: fadeIn(25) },
          ],
        },

        /* ── Center line  x=0  (frames 35→70) ──────────── */
        {
          ty: 'gr', nm: 'CenterLine', it: [
            linePath(0, -320, 0, 320),
            {
              ty: 'st',
              c: { a:0, k:[0.831, 0.627, 0.090, 1] },
              o: { a:0, k:100 },
              w: { a:0, k:2 },
              lc: 2, lj: 2, ml: 4,
            },
            trimEnd(35, 70),
            { ...TR, o: fadeIn(35) },
          ],
        },

        /* ── Net  y=0  dashed gold  (frames 50→80) ──────── */
        {
          ty: 'gr', nm: 'Net', it: [
            linePath(-540, 0, 540, 0),
            GOLD_ST,
            trimEnd(50, 80),
            { ...TR, o: fadeIn(50) },
          ],
        },

        /* ── Net center dot ──────────────────────────────── */
        {
          ty: 'gr', nm: 'NetDot', it: [
            { ty: 'el', p: { a:0, k:[0,0] }, s: { a:0, k:[14,14] } },
            {
              ty: 'fl',
              c: { a:0, k:[0.831, 0.627, 0.090, 1] },
              o: { a:0, k:100 }, r: 1,
            },
            {
              ...TR,
              o: {
                a:1,
                k:[
                  { t:78, s:[0],   e:[100], i:{x:[0.5],y:[1]}, o:{x:[0.5],y:[0]} },
                  { t:88, s:[100] },
                ],
              },
              s: {
                a:1,
                k:[
                  { t:78, s:[0,0,100],   e:[100,100,100], i:{x:[0.35],y:[1.4]}, o:{x:[0.65],y:[0]} },
                  { t:90, s:[100,100,100] },
                ],
              },
            },
          ],
        },

        /* ── Corner accent arcs (frames 70→100) ─────────── */
        ...([
          [[-540,-320],[-440,-320],[-540,-220]],  // TL
          [[540,-320],[440,-320],[540,-220]],       // TR
          [[-540,320],[-440,320],[-540,220]],       // BL
          [[540,320],[440,320],[540,220]],           // BR
        ].map(([[sx,sy],[ex,ey],[cx,cy]], i) => ({
          ty: 'gr', nm: `Corner${i}`, it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  i: [[0,0],[0,0],[0,0]],
                  o: [[0,0],[0,0],[0,0]],
                  v: [[sx,sy],[cx,cy],[ex,ey]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a:0, k:[0.831, 0.627, 0.090, 1] },
              o: { a:0, k:100 },
              w: { a:0, k:2.5 },
              lc: 2, lj: 2, ml: 4,
            },
            trimEnd(70 + i * 5, 100 + i * 5),
            { ...TR, o: fadeIn(70 + i * 5) },
          ],
        }))),

        /* ── Service box hash marks ──────────────────────── */
        ...([
          [-270, -80, -270, 80],
          [270,  -80, 270,  80],
        ].map(([x1,y1,x2,y2], i) => ({
          ty: 'gr', nm: `Hash${i}`, it: [
            linePath(x1, y1, x2, y2),
            {
              ty: 'st',
              c: { a:0, k:[0.118, 0.431, 0.298, 1] },
              o: { a:0, k:50 },
              w: { a:0, k:1.5 },
              lc: 2, lj: 2, ml: 4,
            },
            trimEnd(60 + i * 8, 90 + i * 8),
            { ...TR, o: fadeIn(60 + i * 8) },
          ],
        }))),
      ],
    },
  ],
};

export default courtLinesData;
