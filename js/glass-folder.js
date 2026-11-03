/**
 * Glass Folder Cards (Vanilla JS Edition)
 * Pure vanilla JavaScript + Canvas + 3D CSS transforms
 * Ported directly from glass-folder-cards.tsx
 */

(function () {
  'use strict';

  // #region Art Recipes & Generator
  const ART_PRESETS = {
    aurora: {
      style: "streak",
      colors: ["#f4efe9", "#e9c2b8", "#c2433f", "#2a1e2a", "#22395e", "#6f97c2", "#e5edf4"],
      scale: 0.7,
      warp: 1.4,
      angle: -0.62,
      gloss: 0.18,
      veins: 0,
    },
    ember: {
      style: "marble",
      colors: ["#07090c", "#16252c", "#3d5f68", "#1a1416", "#a3201a", "#ef4a2b", "#ff8a5c"],
      scale: 0.62,
      warp: 3.2,
      angle: -0.5,
      gloss: 0.55,
      veins: 0.6,
    },
    dusk: {
      style: "marble",
      colors: ["#120c18", "#3e2850", "#8f6c9c", "#2b1a24", "#b3502f", "#eab08a", "#fbe7d2"],
      scale: 0.75,
      warp: 3.6,
      angle: 0.8,
      gloss: 0.5,
      veins: 0.5,
    },
    glacier: {
      style: "streak",
      colors: ["#f7f8fa", "#d9e2ea", "#9fb4c7", "#e8edf2", "#bccbd8", "#ffffff"],
      scale: 0.7,
      warp: 1.6,
      angle: 0.35,
      gloss: 0.25,
      veins: 0,
    },
    verdant: {
      style: "marble",
      colors: ["#070b08", "#173024", "#4f7a5a", "#141812", "#a7843a", "#e9cf87", "#fbf3d6"],
      scale: 0.7,
      warp: 3.4,
      angle: 2.1,
      gloss: 0.5,
      veins: 0.5,
    },
  };

  function hexToRgb(hex) {
    let h = hex.trim().replace(/^#/, "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = /^[0-9a-f]{6}$/i.test(h) ? parseInt(h, 16) : 0x808080;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashString(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  }

  function makeFbm(seed) {
    const r = rng(seed);
    const perm = new Uint8Array(512);
    const grad = new Float32Array(512);
    const p = [];
    for (let i = 0; i < 256; i++) p.push(i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      const t = p[i];
      p[i] = p[j];
      p[j] = t;
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    for (let i = 0; i < 256; i++) {
      const a = r() * Math.PI * 2;
      grad[i * 2] = Math.cos(a);
      grad[i * 2 + 1] = Math.sin(a);
    }
    const noise = (x, y) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const X = xi & 255;
      const Y = yi & 255;
      const h00 = perm[X + perm[Y]] * 2;
      const h10 = perm[X + 1 + perm[Y]] * 2;
      const h01 = perm[X + perm[Y + 1]] * 2;
      const h11 = perm[X + 1 + perm[Y + 1]] * 2;
      const d00 = grad[h00] * xf + grad[h00 + 1] * yf;
      const d10 = grad[h10] * (xf - 1) + grad[h10 + 1] * yf;
      const d01 = grad[h01] * xf + grad[h01 + 1] * (yf - 1);
      const d11 = grad[h11] * (xf - 1) + grad[h11 + 1] * (yf - 1);
      const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
      const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
      return d00 + u * (d10 - d00) + v * (d01 - d00 + u * (d11 - d01 - d10 + d00));
    };
    return (x, y, octaves) => {
      let sum = 0;
      let amp = 0.5;
      for (let i = 0; i < octaves; i++) {
        sum += amp * noise(x, y);
        const nx = 1.6 * x + 1.2 * y + 7.1;
        y = -1.2 * x + 1.6 * y + 3.3;
        x = nx;
        amp *= 0.5;
      }
      return sum;
    };
  }

  function createArtJob(width, height, recipe, seed) {
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(height));
    const colors = recipe.colors && recipe.colors.length >= 2 ? recipe.colors : ["#111111", "#eeeeee"];
    const stops = colors.map((c, i) => ({ t: i / (colors.length - 1), c: hexToRgb(c) }));
    const scale = recipe.scale ?? 0.7;
    const warp = recipe.warp ?? 3;
    const gloss = recipe.gloss ?? 0.4;
    const veins = recipe.veins ?? 0;
    const streak = recipe.style === "streak";
    const fbm = makeFbm(seed * 977 + 13);
    const r = rng(seed + 1);
    const ox = r() * 50;
    const oy = r() * 50;
    const angle = (recipe.angle ?? 0) + (r() - 0.5) * 0.5;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    const m = Math.min(w, h);

    const gw = Math.ceil(w / 2) + 3;
    const gh = Math.ceil(h / 2) + 3;
    const G = new Float32Array(gw * gh);
    const GQ = new Float32Array(gw * gh);
    const F = new Float32Array(w * h);
    const Q = new Float32Array(w * h);
    const pixels = new Uint8ClampedArray(w * h * 4);
    let row = 0;

    const field = (gy) => {
      for (let gx = 0; gx < gw; gx++) {
        const u = ((gx - 1) * 2 - w / 2) / m;
        const v = ((gy - 1) * 2 - h / 2) / m;
        let px = (u * ca - v * sa) * scale;
        let py = (u * sa + v * ca) * scale;
        if (streak) {
          px *= 0.14;
          py *= 2.2;
        }
        px += ox;
        py += oy;
        const qx = fbm(px, py, 3);
        const qy = fbm(px + 5.2, py + 1.3, 3);
        const rx = fbm(px + warp * qx + 1.7, py + warp * qy + 9.2, 3);
        const ry = fbm(px + warp * qx + 8.3, py + warp * qy + 2.8, 3);
        G[gy * gw + gx] = fbm(px + warp * rx, py + warp * ry, 4);
        GQ[gy * gw + gx] = Math.sqrt(qx * qx + qy * qy);
      }
    };

    const upsample = () => {
      const cr = (a, b, c, d) => (-a + 9 * b + 9 * c - d) / 16;
      const T = new Float32Array(w * gh);
      for (let gy = 0; gy < gh; gy++) {
        const rowOff = gy * gw;
        for (let x = 0; x < w; x++) {
          const c = (x >> 1) + 1;
          T[gy * w + x] = x & 1 ? cr(G[rowOff + c - 1], G[rowOff + c], G[rowOff + c + 1], G[rowOff + c + 2]) : G[rowOff + c];
        }
      }
      for (let y = 0; y < h; y++) {
        const c = (y >> 1) + 1;
        for (let x = 0; x < w; x++) {
          F[y * w + x] =
            y & 1 ? cr(T[(c - 1) * w + x], T[c * w + x], T[(c + 1) * w + x], T[(c + 2) * w + x]) : T[c * w + x];
          const gx = (x >> 1) + 1;
          const q0 = GQ[c * gw + gx];
          const qx = x & 1 ? (q0 + GQ[c * gw + gx + 1]) / 2 : q0;
          const q1 = y & 1 ? (x & 1 ? (GQ[(c + 1) * gw + gx] + GQ[(c + 1) * gw + gx + 1]) / 2 : GQ[(c + 1) * gw + gx]) : qx;
          Q[y * w + x] = (qx + q1) / 2;
        }
      }
    };

    const colorize = () => {
      const sample = [];
      const stride = Math.max(1, Math.floor(F.length / 4096));
      for (let i = 0; i < F.length; i += stride) sample.push(F[i]);
      sample.sort((a, b) => a - b);
      const lo = sample[Math.floor(sample.length * 0.02)];
      const hi = sample[Math.floor(sample.length * 0.98)];
      const k = 1 / (hi - lo || 1);
      const lx = -0.55;
      const ly = -0.65;
      const lz = 0.52;
      const slope = k * m * 0.012;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          let t = (F[i] - lo) * k;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          let j = 1;
          while (j < stops.length - 1 && stops[j].t < t) j++;
          const a = stops[j - 1];
          const b = stops[j];
          let f = (t - a.t) / (b.t - a.t || 1);
          f = f < 0 ? 0 : f > 1 ? 1 : f;
          f = f * f * (3 - 2 * f);
          const gx = (F[x < w - 1 ? i + 1 : i] - F[x > 0 ? i - 1 : i]) * slope;
          const gy = (F[y < h - 1 ? i + w : i] - F[y > 0 ? i - w : i]) * slope;
          const nd = (-gx * lx - gy * ly + lz) / Math.sqrt(gx * gx + gy * gy + 1);
          const spec = Math.pow(nd > 0 ? nd : 0, 24) * gloss * 255;
          const silk = 1 + 0.035 * Math.sin(t * 150 + Q[i] * 24);
          const vein = veins * Math.max(0, 1 - Math.abs(Q[i] - 0.42) * 14) * 0.6;
          const lit = (0.82 + 0.28 * nd) * silk * (1 - vein);
          pixels[i * 4] = (a.c[0] + (b.c[0] - a.c[0]) * f) * lit + spec;
          pixels[i * 4 + 1] = (a.c[1] + (b.c[1] - a.c[1]) * f) * lit + spec;
          pixels[i * 4 + 2] = (a.c[2] + (b.c[2] - a.c[2]) * f) * lit + spec;
          pixels[i * 4 + 3] = 255;
        }
      }
    };

    const step = (rows) => {
      if (row >= gh) return true;
      const end = Math.min(gh, row + Math.max(1, rows));
      while (row < end) field(row++);
      if (row < gh) return false;
      upsample();
      colorize();
      return true;
    };

    return { width: w, height: h, pixels, step };
  }

  const artCache = new Map();
  const queue = [];
  let pumping = false;

  function pump() {
    if (pumping) return;
    pumping = true;
    const tick = () => {
      const until = performance.now() + 7;
      while (queue.length && performance.now() < until) {
        const head = queue[0];
        if (head.job.step(4)) {
          queue.shift();
          const c = document.createElement("canvas");
          c.width = head.job.width;
          c.height = head.job.height;
          c.getContext("2d")?.putImageData(new ImageData(head.job.pixels, c.width, c.height), 0, 0);
          head.done(c);
        }
      }
      if (queue.length) requestAnimationFrame(tick);
      else pumping = false;
    };
    requestAnimationFrame(tick);
  }

  function paintArt(recipe, seed, w, h, priority) {
    const key = JSON.stringify([recipe, seed, w, h]);
    let p = artCache.get(key);
    if (!p) {
      p = new Promise((done) => {
        let at = queue.length;
        while (at > 1 && queue[at - 1].priority > priority) at--;
        queue.splice(at, 0, { job: createArtJob(w, h, recipe, seed), priority, done });
        pump();
      });
      artCache.set(key, p);
    }
    return p;
  }

  function fanSlot(index, count) {
    return count <= 1 ? 0 : (index / (count - 1)) * 2 - 1;
  }
  // #endregion

  // Geometry Constants
  const W = 340;
  const H = 272;
  const HEADROOM = 54;
  const FRONT_TOP = 74;
  const FRONT_H = H - FRONT_TOP;
  const SHEET_W = 272;
  const SHEET_H = 184;
  const MAX_VISIBLE = 4;

  const BACK_PATH =
    "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";
  const FRONT_PATH =
    "M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 " +
    (FRONT_H - 22) +
    "A22 22 0 0 1 318 " +
    FRONT_H +
    "L22 " +
    FRONT_H +
    "A22 22 0 0 1 0 " +
    (FRONT_H - 22) +
    "Z";

  let uidCounter = 0;

  /**
   * Creates an interactive GlassFolder element
   * @param {Object} options
   */
  function createGlassFolder(options) {
    const {
      label = "My Files",
      meta,
      tone = "light",
      art = "aurora",
      seed = 3,
      image,
      files = [],
      labelPlacement = "bottom-left",
      width = 340,
      appear = true,
      appearDelay = 0,
      onFileSelect,
    } = options;

    const uid = "gf" + ++uidCounter;
    const k = width / W;
    const density = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1)) * k;

    const root = document.createElement("div");
    root.className = "gf-root";
    root.setAttribute("data-tone", tone);
    root.setAttribute("data-place", labelPlacement);
    root.style.width = width + "px";
    root.style.height = (H + HEADROOM) * k + "px";

    const recipe = typeof art === "string" ? ART_PRESETS[art] || ART_PRESETS.aurora : art;
    const count = files.length;
    const metaLine = meta ?? count + (count === 1 ? " item" : " items");

    const start = Math.max(0, files.length - MAX_VISIBLE);
    const visible = files.slice(start);

    root.innerHTML = `
      <div class="gf-stage" style="transform: translateY(${HEADROOM * k}px) scale(${k})">
        <div class="gf-tilt">
          <div class="gf-shadow" aria-hidden="true"></div>

          <!-- back panel -->
          <div class="gf-back" style="clip-path: path('${BACK_PATH}')" aria-hidden="true">
            ${image ? `<img class="gf-art" src="${image}" alt="" width="${W + 24}" height="${H + 24}" draggable="false">` : `<canvas class="gf-art" width="${W + 24}" height="${H + 24}"></canvas>`}
            <div class="gf-back-sheen"></div>
          </div>
          <svg class="gf-rim gf-back-rim" viewBox="0 0 ${W} ${H}" aria-hidden="true">
            <path d="${BACK_PATH}"></path>
          </svg>

          <!-- front frosted panel -->
          <div class="gf-front" style="clip-path: path('${FRONT_PATH}')">
            <div class="gf-tint" aria-hidden="true"></div>
            <div class="gf-spec" aria-hidden="true"></div>
            <svg class="gf-rim gf-front-rim" viewBox="0 0 ${W} ${FRONT_H}" aria-hidden="true">
              <defs>
                <linearGradient id="gf-rim-${uid}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#fff" stop-opacity="0.95"></stop>
                  <stop offset="0.35" stop-color="#fff" stop-opacity="0.35"></stop>
                  <stop offset="1" stop-color="#fff" stop-opacity="0.12"></stop>
                </linearGradient>
              </defs>
              <path d="${FRONT_PATH}" stroke="url(#gf-rim-${uid})"></path>
            </svg>
            <button type="button" class="gf-hit" aria-expanded="false" aria-label="Open ${label}, ${metaLine}"></button>
            <div class="gf-label">
              <span class="gf-title">${label}</span>
              <span class="gf-meta">${metaLine}</span>
            </div>
          </div>

          <!-- file contents -->
          <div class="gf-files" role="list" aria-label="${label} contents"></div>
        </div>
      </div>
    `;

    // Render Back Canvas Art if no image
    if (!image && art !== "none") {
      const backCanvas = root.querySelector("canvas.gf-art");
      if (backCanvas) {
        const pw = Math.round((W + 24) * density);
        const ph = Math.round((H + 24) * density);
        paintArt(recipe, seed, pw, ph, 0).then((src) => {
          backCanvas.width = src.width;
          backCanvas.height = src.height;
          backCanvas.getContext("2d")?.drawImage(src, 0, 0);
          backCanvas.setAttribute("data-ready", "true");
        });
      }
    }

    // Render Files
    const filesContainer = root.querySelector(".gf-files");
    visible.forEach((file, v) => {
      const slot = fanSlot(v, visible.length);
      const jitter = rng(hashString(file.name) + v);
      const picture = !!(file.art || file.image);
      const slotDiv = document.createElement("div");
      slotDiv.className = "gf-sheet-slot";
      slotDiv.setAttribute("role", "listitem");

      const tag = file.href ? "a" : "button";
      const sheet = document.createElement(tag);
      sheet.className = "gf-sheet" + (picture ? " gf-sheet--art" : "");
      if (file.href) sheet.href = file.href;
      else sheet.type = "button";

      sheet.style.setProperty("--gf-slot", slot);
      sheet.style.setProperty("--gf-depth", visible.length - 1 - v);
      sheet.style.setProperty("--gf-jx", ((jitter() - 0.5) * 10).toFixed(2) + "px");
      sheet.style.setProperty("--gf-jr", ((jitter() - 0.5) * 3.2).toFixed(2) + "deg");
      sheet.style.zIndex = v + 1;

      sheet.innerHTML = `
        ${picture ? (
          file.image
            ? `<img class="gf-sheet-art" src="${file.image}" alt="" width="${SHEET_W}" height="${SHEET_H}" draggable="false">`
            : `<canvas class="gf-sheet-art" width="${SHEET_W}" height="${SHEET_H}"></canvas>`
        ) : `
          <span class="gf-lines" aria-hidden="true">
            <i style="width: 86%"></i>
            <i style="width: 92%"></i>
            <i style="width: 64%"></i>
            <i style="width: 88%"></i>
            <i style="width: 42%"></i>
          </span>
        `}
        <span class="gf-sheet-head">
          <span class="gf-sheet-name">${file.name}</span>
          ${file.meta ? `<span class="gf-sheet-meta">${file.meta}</span>` : ""}
        </span>
      `;

      if (picture && !file.image) {
        const fileRecipe = typeof file.art === "string" ? ART_PRESETS[file.art] || ART_PRESETS.aurora : file.art;
        const fileCanvas = sheet.querySelector("canvas.gf-sheet-art");
        if (fileCanvas) {
          const pw = Math.round(SHEET_W * Math.min(density, 1.25));
          const ph = Math.round(SHEET_H * Math.min(density, 1.25));
          paintArt(fileRecipe, hashString(file.name) % 997, pw, ph, 1).then((src) => {
            fileCanvas.width = src.width;
            fileCanvas.height = src.height;
            fileCanvas.getContext("2d")?.drawImage(src, 0, 0);
            fileCanvas.setAttribute("data-ready", "true");
          });
        }
      }

      sheet.addEventListener("click", (e) => {
        if (onFileSelect) onFileSelect(file, v);
      });

      slotDiv.appendChild(sheet);
      filesContainer.appendChild(slotDiv);
    });

    // Inert behavior when closed
    filesContainer.setAttribute("inert", "");

    // Tilt cursor tracking
    let raf = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      raf = 0;
      root.style.setProperty("--gf-px", px.toFixed(3));
      root.style.setProperty("--gf-py", py.toFixed(3));
    };
    root.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = root.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    });
    root.addEventListener("pointerleave", () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(write);
    });

    // Open/Close Hit
    const hitBtn = root.querySelector(".gf-hit");
    let isOpen = false;

    function setOpen(open) {
      if (isOpen === open) return;
      isOpen = open;
      if (isOpen) {
        root.setAttribute("data-open", "");
        hitBtn.setAttribute("aria-expanded", "true");
        hitBtn.setAttribute("aria-label", `Close ${label}, ${metaLine}`);
        filesContainer.removeAttribute("inert");
      } else {
        root.removeAttribute("data-open");
        hitBtn.setAttribute("aria-expanded", "false");
        hitBtn.setAttribute("aria-label", `Open ${label}, ${metaLine}`);
        filesContainer.setAttribute("inert", "");
      }
      root.dispatchEvent(new CustomEvent("gf-toggle", { detail: { open: isOpen, index: options.index ?? -1 } }));
    }

    root._setOpen = setOpen;
    root._isOpen = () => isOpen;

    // Make entire folder clickable to open/close
    root.addEventListener("click", (e) => {
      // Don't intercept if clicking an actual file anchor link
      const sheet = e.target.closest(".gf-sheet");
      if (sheet && (sheet.tagName === "A" || sheet.getAttribute("href"))) {
        return; // Allow native link navigation
      }
      setOpen(!isOpen);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
        hitBtn.focus();
      }
    });

    // Close on outside click (excluding drawers, showcase, and other folders)
    document.addEventListener("pointerdown", (e) => {
      if (!isOpen) return;
      if (root.contains(e.target)) return;
      if (e.target.closest(".glass-folder-drawers-wrap") || e.target.closest(".glass-folders-showcase-wrap") || e.target.closest(".glass-folder-drawer")) return;
      if (e.target.closest(".gf-root")) return;
      setOpen(false);
    });

    // Entrance Animation with IntersectionObserver
    if (appear && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            setTimeout(() => root.setAttribute("data-entered", ""), appearDelay);
          }
        },
        { threshold: 0.2 }
      );
      io.observe(root);
    } else {
      root.setAttribute("data-entered", "");
    }

    return root;
  }

  // Export to window
  window.GlassFolder = {
    create: createGlassFolder,
    presets: ART_PRESETS,
  };

  /**
   * setupFolderDrawers(showcaseId, drawersWrapId, defaultOpenIndex)
   *
   * Links each .gf-root inside the showcase to a matching
   * .glass-folder-drawer[data-folder-index] inside the drawers wrap.
   * Clicking any folder opens it in 3D and reveals its embedded drawer.
   * By default, folder 0 is opened so cards are visible immediately.
   */
  window.setupFolderDrawers = function setupFolderDrawers(showcaseId, drawersWrapId, defaultOpenIndex = 0) {
    const showcase = document.getElementById(showcaseId);
    const wrap = document.getElementById(drawersWrapId);
    if (!showcase || !wrap) return;

    const folders = Array.from(showcase.querySelectorAll(".gf-root"));
    const drawers = Array.from(wrap.querySelectorAll(".glass-folder-drawer"));
    let activeIdx = -1;

    function activateDrawer(idx) {
      if (activeIdx === idx) {
        // Toggle close if already active
        const f = folders[idx];
        const d = drawers[idx];
        if (f) {
          f.classList.remove("is-active-drawer");
          if (f._setOpen) f._setOpen(false);
        }
        if (d) d.classList.remove("is-open");
        activeIdx = -1;
        return;
      }

      // Activate new index
      folders.forEach((f, i) => {
        if (i === idx) {
          f.classList.add("is-active-drawer");
          if (f._setOpen) f._setOpen(true);
        } else {
          f.classList.remove("is-active-drawer");
          if (f._setOpen) f._setOpen(false);
        }
      });

      drawers.forEach((d, i) => {
        if (i === idx) {
          d.classList.add("is-open");
          d.style.animation = "none";
          d.offsetHeight; // reflow
          d.style.animation = "";
        } else {
          d.classList.remove("is-open");
        }
      });

      activeIdx = idx;
    }

    folders.forEach((folder, idx) => {
      folder.addEventListener("gf-toggle", (e) => {
        if (e.detail.open) {
          if (activeIdx !== idx) activateDrawer(idx);
        } else {
          if (activeIdx === idx) {
            folder.classList.remove("is-active-drawer");
            if (drawers[idx]) drawers[idx].classList.remove("is-open");
            activeIdx = -1;
          }
        }
      });
    });

    // Open first folder by default so cards are visible immediately on load
    if (defaultOpenIndex >= 0 && folders[defaultOpenIndex]) {
      setTimeout(() => {
        activateDrawer(defaultOpenIndex);
      }, 100);
    }
  };

  // Auto-mount folders on page containers when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Home Page Folders
    const homeContainer = document.getElementById("home-glass-folders");
    if (homeContainer) {
      homeContainer.appendChild(createGlassFolder({
        label: "Academic Dossier",
        meta: "3 Portals",
        art: "aurora",
        seed: 3,
        appearDelay: 0,
        files: [
          { name: "Biography & Pedagogy", meta: "18+ Yrs Higher Ed", art: "ember", href: "about.html" },
          { name: "Curriculum Vitae", meta: "Assoc. Professor", art: "dusk", href: "cv.html" },
          { name: "Executive Leadership", meta: "ORDI & DPO Officer", art: "aurora", href: "about.html" }
        ]
      }));

      homeContainer.appendChild(createGlassFolder({
        label: "Research & Publications",
        meta: "1,550+ Cites",
        tone: "dark",
        art: "ember",
        seed: 11,
        appearDelay: 140,
        files: [
          { name: "Research Domains", meta: "PDEs, Options & PINNs", art: "glacier", href: "research.html" },
          { name: "70+ Scholarly Papers", meta: "Elsevier & Springer", art: "aurora", href: "publications.html" },
          { name: "Scholar Metrics", meta: "h-index 20 · i10 53", art: "verdant", href: "publications.html" }
        ]
      }));

      homeContainer.appendChild(createGlassFolder({
        label: "Honors & Inquiries",
        meta: "3 Portals",
        art: "glacier",
        seed: 7,
        appearDelay: 280,
        files: [
          { name: "Distinguished Award", meta: "2026 Laureate", art: "aurora", href: "awards.html" },
          { name: "Fellowships (FASI)", meta: "African Scientific Inst", art: "verdant", href: "awards.html" },
          { name: "Academic Desk", meta: "Formal Inquiries", art: "ember", href: "contact.html" }
        ]
      }));

      // Wire up folder → drawer links for the home page
      setTimeout(function() {
        setupFolderDrawers("home-glass-folders", "home-folder-drawers");
      }, 0);
    }

    // 2. About Page Folders
    const aboutContainer = document.getElementById("about-glass-folders");
    if (aboutContainer) {
      aboutContainer.appendChild(createGlassFolder({
        label: "Biography & Ethos",
        meta: "3 Records",
        art: "aurora",
        seed: 4,
        appearDelay: 0,
        files: [
          { name: "Biographical Narrative", meta: "Origins & Academic Path", art: "ember" },
          { name: "Teaching Philosophy", meta: "Mathematical Pedagogy", art: "dusk" },
          { name: "Research Vision", meta: "Rigorous Applied Solutions", art: "aurora" }
        ]
      }));

      aboutContainer.appendChild(createGlassFolder({
        label: "Qualifications & Roles",
        meta: "3 Degrees",
        tone: "dark",
        art: "glacier",
        seed: 9,
        appearDelay: 140,
        files: [
          { name: "Ph.D. Applied Math", meta: "Fractional Calculus & Schemes", art: "glacier" },
          { name: "M.Sc. Mathematics", meta: "Numerical Initial Value Problems", art: "verdant" },
          { name: "B.Sc. (Hons) Math", meta: "First Class Academic Honors", art: "aurora" }
        ]
      }));

      aboutContainer.appendChild(createGlassFolder({
        label: "Governance & Service",
        meta: "3 Positions",
        art: "verdant",
        seed: 14,
        appearDelay: 280,
        files: [
          { name: "Deputy Director (ORDI)", meta: "Research & Innovation", art: "ember" },
          { name: "Data Protection Officer", meta: "Statutory Compliance & Privacy", art: "dusk" },
          { name: "GST Directorate", meta: "Coordination & Curriculum", art: "verdant" }
        ]
      }));

      // Wire up folder → drawer links for about page
      setTimeout(function() {
        setupFolderDrawers("about-glass-folders", "about-folder-drawers");
      }, 0);
    }

    // 3. Research Page Folders
    const researchContainer = document.getElementById("research-glass-folders");
    if (researchContainer) {
      researchContainer.appendChild(createGlassFolder({
        label: "Financial Mathematics",
        meta: "Quantitative Models",
        tone: "dark",
        art: "ember",
        seed: 8,
        appearDelay: 0,
        files: [
          { name: "Fractional Black-Scholes", meta: "Option Valuation & PDE Schemes", art: "ember" },
          { name: "Mellin Transform Theory", meta: "European & American Pricing", art: "dusk" },
          { name: "Homotopy Analysis", meta: "Semi-Analytical Approximations", art: "aurora" }
        ]
      }));

      researchContainer.appendChild(createGlassFolder({
        label: "Numerical ODEs & PDEs",
        meta: "Computational Schemes",
        art: "glacier",
        seed: 12,
        appearDelay: 140,
        files: [
          { name: "Crank-Nicolson Schemes", meta: "Parabolic Boundary Value Problems", art: "glacier" },
          { name: "Continuous Multistep", meta: "High-Order Initial Value Solvers", art: "verdant" },
          { name: "Stability Analysis", meta: "Rigorous Convergence & Errors", art: "aurora" }
        ]
      }));

      researchContainer.appendChild(createGlassFolder({
        label: "Epidemiology & AI",
        meta: "Bio-Systems & PINNs",
        art: "verdant",
        seed: 18,
        appearDelay: 280,
        files: [
          { name: "COVID-19 Fractional Model", meta: "Citizens' Reaction Dynamics", art: "verdant" },
          { name: "Stochastic Control", meta: "Epidemic Wave Interventions", art: "ember" },
          { name: "Deep PINNs", meta: "Physics-Informed Neural Nets", art: "dusk" }
        ]
      }));

      // Wire up folder → drawer links for research page
      setTimeout(function() {
        setupFolderDrawers("research-glass-folders", "research-folder-drawers");
      }, 0);
    }

    // 4. Publications Page Folders
    const pubContainer = document.getElementById("publications-glass-folders");
    if (pubContainer) {
      pubContainer.appendChild(createGlassFolder({
        label: "Most Cited Papers",
        meta: "Top Impact",
        tone: "dark",
        art: "ember",
        seed: 21,
        appearDelay: 0,
        files: [
          { name: "Crank Nicolson (2013)", meta: "76 Citations · Parabolic PDEs", art: "ember" },
          { name: "Numerical IVPs (2012)", meta: "66 Citations · Foundational Scheme", art: "dusk" },
          { name: "COVID-19 Model (2021)", meta: "50 Citations · Fractional ODEs", art: "glacier" }
        ]
      }));

      pubContainer.appendChild(createGlassFolder({
        label: "Financial Math Series",
        meta: "Elsevier / AMC",
        art: "aurora",
        seed: 15,
        appearDelay: 140,
        files: [
          { name: "Homotopy Analysis (2020)", meta: "41 Citations · Chaos & Solitons", art: "aurora" },
          { name: "Mellin Transform (2024)", meta: "34 Citations · Applied Math Comput", art: "verdant" },
          { name: "Fractional Pricing (2020)", meta: "28 Citations · TASR Journal", art: "ember" }
        ]
      }));

      pubContainer.appendChild(createGlassFolder({
        label: "Books & Monographs",
        meta: "Volumes & Chapters",
        art: "verdant",
        seed: 27,
        appearDelay: 280,
        files: [
          { name: "Computational Techniques", meta: "62 Citations · 2023 Monograph", art: "verdant" },
          { name: "Emerging African Economies", meta: "29 Citations · Springer Chapter", art: "dusk" },
          { name: "Deep PINNs (2024)", meta: "12 Citations · IEEE Conference", art: "glacier" }
        ]
      }));

      // Wire up folder → drawer links for publications page
      setTimeout(function() {
        setupFolderDrawers("publications-glass-folders", "publications-folder-drawers");
      }, 0);
    }

    // 5. Awards Page Folders
    const awardsContainer = document.getElementById("awards-glass-folders");
    if (awardsContainer) {
      awardsContainer.appendChild(createGlassFolder({
        label: "Fellowships & Honors",
        meta: "Prestigious Titles",
        tone: "dark",
        art: "ember",
        seed: 31,
        appearDelay: 0,
        files: [
          { name: "Fellowship of ASI (FASI)", meta: "African Scientific Institute", art: "ember" },
          { name: "Fellow of AFAAN", meta: "African Academic Network", art: "dusk" },
          { name: "Learned Societies", meta: "MNSPS, MAGES, CMACSP", art: "aurora" }
        ]
      }));

      awardsContainer.appendChild(createGlassFolder({
        label: "Research Laurels",
        meta: "Excellence Awards",
        art: "aurora",
        seed: 33,
        appearDelay: 140,
        files: [
          { name: "Distinguished Researcher", meta: "EKSU Institutional Award 2026", art: "aurora" },
          { name: "Best Paper Commendation", meta: "International Applied Math Conf", art: "verdant" },
          { name: "Teaching Merit", meta: "Mathematical Pedagogy Commendation", art: "glacier" }
        ]
      }));

      awardsContainer.appendChild(createGlassFolder({
        label: "Grants & Keynotes",
        meta: "Funded Research",
        art: "glacier",
        seed: 36,
        appearDelay: 280,
        files: [
          { name: "TETFund Research Grants", meta: "National Academic Allocations", art: "glacier" },
          { name: "Conference Sponsorships", meta: "AMU & International Travel", art: "verdant" },
          { name: "Plenary Keynotes", meta: "Invited Applied Math Lectures", art: "ember" }
        ]
      }));

      // Wire up folder → drawer links for awards page
      setTimeout(function() {
        setupFolderDrawers("awards-glass-folders", "awards-folder-drawers");
      }, 0);
    }

    // 6. CV Page Folders
    const cvContainer = document.getElementById("cv-glass-folders");
    if (cvContainer) {
      cvContainer.appendChild(createGlassFolder({
        label: "Executive Dossier",
        meta: "Curriculum Vitae",
        art: "glacier",
        seed: 41,
        appearDelay: 0,
        files: [
          { name: "Complete Dossier (PDF)", meta: "Verified Printable Vitae", art: "glacier", href: "cv.html" },
          { name: "Associate Professorship", meta: "Senior Faculty Credentials", art: "aurora", href: "cv.html" },
          { name: "Researcher Identifiers", meta: "ORCID, Scopus, MathSciNet", art: "verdant", href: "cv.html" }
        ]
      }));

      cvContainer.appendChild(createGlassFolder({
        label: "Academic Career",
        meta: "18+ Yrs Service",
        tone: "dark",
        art: "aurora",
        seed: 44,
        appearDelay: 140,
        files: [
          { name: "Higher Education Record", meta: "Ph.D., M.Sc., B.Sc. Degrees", art: "aurora" },
          { name: "Postgraduate Supervision", meta: "M.Sc. & Ph.D. Theses Mentoring", art: "ember" },
          { name: "Curriculum Governance", meta: "GST & Departmental Teaching", art: "dusk" }
        ]
      }));

      cvContainer.appendChild(createGlassFolder({
        label: "Professional Service",
        meta: "Institutional Record",
        art: "verdant",
        seed: 48,
        appearDelay: 280,
        files: [
          { name: "Deputy Director (ORDI)", meta: "Research & Development Leadership", art: "verdant" },
          { name: "Data Protection Officer", meta: "Institutional Compliance Officer", art: "ember" },
          { name: "Peer Review & Editing", meta: "International Mathematics Journals", art: "glacier" }
        ]
      }));

      // Wire up folder → drawer links for cv page
      setTimeout(function() {
        setupFolderDrawers("cv-glass-folders", "cv-folder-drawers");
      }, 0);
    }

    // 7. Contact Page Folders
    const contactContainer = document.getElementById("contact-glass-folders");
    if (contactContainer) {
      contactContainer.appendChild(createGlassFolder({
        label: "Official Academic Desk",
        meta: "EKSU Office",
        art: "glacier",
        seed: 51,
        appearDelay: 0,
        files: [
          { name: "Room 135, Mathematics", meta: "Faculty of Physical Sciences, EKSU", art: "glacier" },
          { name: "Official Email Desk", meta: "sunday.fadugba@eksu.edu.ng", art: "aurora" },
          { name: "Office Consultation", meta: "By Academic Appointment", art: "verdant" }
        ]
      }));

      contactContainer.appendChild(createGlassFolder({
        label: "Scholarly Networks",
        meta: "Verified Profiles",
        tone: "dark",
        art: "ember",
        seed: 55,
        appearDelay: 140,
        files: [
          { name: "Google Scholar Profile", meta: "1,550+ Cites · h-index 20", art: "ember", href: "https://scholar.google.com/citations?pli=1&authuser=1&user=BAbkMU4AAAAJ" },
          { name: "Scopus Author ID", meta: "Elsevier Verified Record", art: "dusk", href: "https://www.scopus.com/authid/detail.uri?authorId=56104468000" },
          { name: "MathSciNet AMS", meta: "Mathematical Reviews ID", art: "aurora", href: "http://www.ams.org/mathscinet/MRAuthorID/1022379" }
        ]
      }));

      contactContainer.appendChild(createGlassFolder({
        label: "Inquiry Channels",
        meta: "Direct Form",
        art: "aurora",
        seed: 58,
        appearDelay: 280,
        files: [
          { name: "Postgraduate Advising", meta: "Ph.D. & M.Sc. Supervision", art: "aurora" },
          { name: "Research Collaboration", meta: "Joint Grants & Mathematical Visits", art: "verdant" },
          { name: "Speaking & Keynotes", meta: "Conference & Seminar Plenaries", art: "ember" }
        ]
      }));

      // Wire up folder → drawer links for contact page
      setTimeout(function() {
        setupFolderDrawers("contact-glass-folders", "contact-folder-drawers");
      }, 0);
    }
  });
})();
