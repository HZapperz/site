"use client"

import { useEffect, useRef, useState } from "react"

const CSS = `
.hzip{
  --sans: system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono: ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
  --bg:#e8eee9; --panel:#ffffff; --board:#dae3dd;
  --ink:#14231b; --muted:#5b6b61; --line:#d4ddd6;
  --zip:#f1f5f1; --zip-line:#c4cdc6; --zip-hover:#ffffff;
  --green:#1f9d55; --green-line:#136e3b; --green-hi:#2cbb69; --green-deep:#0f5c30;
  --halo:#ffffff; --focus:#1f9d55; --shadow:20 35 27;
  --street:rgba(28,38,32,.34); --hwy:#d9791a; --hwy-casing:#ffffff;
  position:fixed; inset:0; z-index:1; background:var(--bg); color:var(--ink);
  font-family:var(--sans); -webkit-font-smoothing:antialiased; display:flex; flex-direction:column;
}
@media (prefers-color-scheme: dark){
  .hzip{
    --bg:#0a120e; --panel:#121d18; --board:#0d1712;
    --ink:#e7f1ea; --muted:#8fa79a; --line:#223029;
    --zip:#19251f; --zip-line:#2a3a30; --zip-hover:#27372f;
    --green:#2bb56a; --green-line:#61d693; --green-hi:#3ccf7e; --green-deep:#9be9bd;
    --halo:#0d1712; --focus:#3ccf7e; --shadow:0 0 0;
    --street:rgba(216,230,223,.32); --hwy:#f2b53c; --hwy-casing:#20170a;
  }
}
.hzip *{ box-sizing:border-box; }

/* ---- login gate ---- */
.hzip.gate{ align-items:center; justify-content:center; padding:24px; }
.hzip .loading{ color:var(--muted); font-size:14px; }
.hzip .login{ background:var(--panel); border:1px solid var(--line); border-radius:16px;
  padding:34px 30px; width:372px; max-width:100%; box-shadow:0 24px 70px -30px rgba(var(--shadow)/.6); }
.hzip .login h2{ margin:10px 0 6px; font-size:22px; font-weight:700; letter-spacing:-.02em; }
.hzip .login p{ margin:0 0 18px; font-size:13.5px; color:var(--muted); line-height:1.55; }
.hzip .login input{ width:100%; font-size:15px; padding:12px 14px; border:1px solid var(--line);
  border-radius:11px; background:var(--bg); color:var(--ink); outline:none; }
.hzip .login input:focus-visible{ border-color:var(--focus); box-shadow:0 0 0 3px color-mix(in srgb,var(--focus) 24%,transparent); }
.hzip .login .err{ color:#e0533b; font-size:12.5px; margin-top:9px; min-height:1.1em; }
.hzip .login .go{ width:100%; margin-top:14px; padding:12px; font-size:14px; font-weight:600;
  background:var(--green); border-color:var(--green-line); color:#fff; }
@media (prefers-color-scheme: dark){ .hzip .login .go{ color:#08130c; } }
.hzip .login .go:disabled{ opacity:.6; cursor:default; }

.hzip .bar{ display:flex; align-items:center; gap:18px 22px; flex-wrap:wrap; padding:14px 20px;
  background:var(--panel); border-bottom:1px solid var(--line); }
.hzip .brand{ display:flex; flex-direction:column; gap:3px; }
.hzip .eyebrow{ font-size:11px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--green-line); }
@media (prefers-color-scheme: dark){ .hzip .eyebrow{ color:var(--green); } }
.hzip h1{ margin:0; font-size:19px; font-weight:700; letter-spacing:-.015em; line-height:1.05; }
.hzip .stats{ display:flex; gap:10px; }
.hzip .stat{ display:flex; flex-direction:column; gap:1px; padding:7px 13px; border:1px solid var(--line); border-radius:11px; }
.hzip .stat b{ font-family:var(--mono); font-size:17px; font-weight:600; font-variant-numeric:tabular-nums; line-height:1; }
.hzip .stat.hi b{ color:var(--green-line); }
@media (prefers-color-scheme: dark){ .hzip .stat.hi b{ color:var(--green); } }
.hzip .stat span{ font-size:10.5px; letter-spacing:.05em; text-transform:uppercase; color:var(--muted); }
.hzip .tools{ display:flex; align-items:center; gap:9px; margin-left:auto; flex-wrap:wrap; }
.hzip .field{ position:relative; }
.hzip .find{ font-family:var(--mono); font-size:13px; color:var(--ink); background:var(--panel);
  border:1px solid var(--line); border-radius:10px; padding:9px 12px 9px 30px; width:120px; outline:none; }
.hzip .find::placeholder{ color:var(--muted); font-family:var(--sans); }
.hzip .find:focus-visible{ border-color:var(--focus); box-shadow:0 0 0 3px color-mix(in srgb,var(--focus) 24%,transparent); }
.hzip .field::before{ content:""; position:absolute; left:11px; top:50%; width:11px; height:11px;
  transform:translateY(-50%) rotate(-45deg); border:1.6px solid var(--muted); border-radius:50% 50% 50% 0; pointer-events:none; }
.hzip .btn{ font-family:var(--sans); font-size:13px; font-weight:550; color:var(--ink); background:var(--panel);
  border:1px solid var(--line); border-radius:10px; padding:9px 13px; cursor:pointer; transition:background .15s,border-color .15s,color .15s; }
.hzip .btn:hover{ border-color:var(--muted); }
.hzip .btn:focus-visible{ outline:none; border-color:var(--focus); box-shadow:0 0 0 3px color-mix(in srgb,var(--focus) 24%,transparent); }
.hzip .btn[aria-pressed="true"]{ background:var(--green); border-color:var(--green-line); color:#fff; }
@media (prefers-color-scheme: dark){ .hzip .btn[aria-pressed="true"]{ color:#08130c; } }
.hzip .zoomctl{ display:flex; }
.hzip .btn.ico{ font-size:17px; line-height:1; width:38px; padding:9px 0; text-align:center; font-weight:500; }
.hzip .zoomctl .btn.ico:first-child{ border-radius:10px 0 0 10px; }
.hzip .zoomctl .btn.ico:last-child{ border-radius:0 10px 10px 0; margin-left:-1px; }

/* ---- export menu ---- */
.hzip .menu{ position:relative; }
.hzip .btn.export{ font-weight:600; }
.hzip .pop{ position:absolute; right:0; top:calc(100% + 6px); background:var(--panel); border:1px solid var(--line);
  border-radius:12px; padding:5px; min-width:184px; box-shadow:0 16px 44px -18px rgba(var(--shadow)/.6);
  display:none; flex-direction:column; gap:2px; z-index:6; }
.hzip .pop.open{ display:flex; }
.hzip .popitem{ font-family:var(--sans); font-size:13px; font-weight:500; text-align:left; color:var(--ink);
  background:transparent; border:0; border-radius:8px; padding:9px 11px; cursor:pointer; white-space:nowrap; }
.hzip .popitem:hover{ background:var(--zip); }
.hzip .popitem:focus-visible{ outline:none; background:var(--zip); }

.hzip .save{ font-size:12px; color:var(--muted); display:flex; align-items:center; gap:6px; font-variant-numeric:tabular-nums; }
.hzip .save .dot{ width:7px; height:7px; border-radius:50%; background:var(--muted); transition:background .2s; }
.hzip .save.saved .dot{ background:var(--green); }
.hzip .save.saving .dot{ background:var(--hwy); }
.hzip .save.failed{ color:#e0533b; }
.hzip .save.failed .dot{ background:#e0533b; }

.hzip .stage{ position:relative; flex:1 1 auto; min-height:0; background:var(--board); overflow:hidden; }
.hzip #hz-map{ position:absolute; inset:0; width:100%; height:100%; display:block; cursor:grab; touch-action:none; }
.hzip #hz-map.grabbing{ cursor:grabbing; }
.hzip .zip{ fill:var(--zip); stroke:var(--zip-line); stroke-width:1; vector-effect:non-scaling-stroke; }
.hzip .zip.on{ fill:var(--green); stroke:var(--green-line); }
.hzip .zip:hover{ fill:var(--zip-hover); stroke:var(--focus); stroke-width:2; }
.hzip .zip.on:hover{ fill:var(--green-hi); stroke:var(--focus); stroke-width:2; }
.hzip .zip.locate{ stroke:var(--focus) !important; }
@media (prefers-reduced-motion: no-preference){
  @keyframes hzloc{ 0%{stroke-width:1} 30%{stroke-width:3.6} 100%{stroke-width:1} }
  .hzip .zip.locate{ animation:hzloc .7s ease 2; }
}
.hzip #hz-roads{ pointer-events:none; }
.hzip #hz-roads.hide{ display:none; }
.hzip #hz-roads path{ fill:none; vector-effect:non-scaling-stroke; stroke-linecap:round; stroke-linejoin:round; }
.hzip #hz-roads-street{ stroke:var(--street); stroke-width:0.7; }
.hzip #hz-roads-casing{ stroke:var(--hwy-casing); stroke-width:3; opacity:.75; }
.hzip #hz-roads-hwy{ stroke:var(--hwy); stroke-width:1.7; }
.hzip #hz-labels{ display:none; }
.hzip #hz-labels.show{ display:block; }
.hzip .lbl{ font-family:var(--mono); font-weight:600; fill:var(--ink); text-anchor:middle; dominant-baseline:middle;
  paint-order:stroke; stroke:var(--halo); stroke-width:2.6px; vector-effect:non-scaling-stroke; pointer-events:none; }
.hzip .lbl.on{ fill:var(--green-deep); }

.hzip .legend{ position:absolute; left:16px; bottom:16px; background:var(--panel); border:1px solid var(--line);
  border-radius:13px; padding:12px 14px; box-shadow:0 6px 22px -8px rgba(var(--shadow)/.55); display:flex; flex-direction:column; gap:8px; }
.hzip .key{ display:flex; align-items:center; gap:9px; font-size:12.5px; color:var(--muted); }
.hzip .key b{ font-family:var(--mono); font-variant-numeric:tabular-nums; color:var(--ink); margin-left:auto; padding-left:14px; }
.hzip .sw{ width:15px; height:15px; border-radius:4px; flex:none; }
.hzip .sw.green{ background:var(--green); border:1px solid var(--green-line); }
.hzip .sw.grey{ background:var(--zip); border:1px solid var(--zip-line); }
.hzip .sw.hwy{ height:4px; background:var(--hwy); border-radius:2px; box-shadow:0 0 0 1.5px var(--hwy-casing); }
.hzip .sw.street{ height:0; border-top:2px solid var(--ink); opacity:.4; border-radius:0; }
.hzip .hint{ font-size:11px; color:var(--green-line); font-weight:600; border-top:1px solid var(--line); padding-top:8px; }
@media (prefers-color-scheme: dark){ .hzip .hint{ color:var(--green); } }

.hzip .readout{ position:absolute; right:16px; top:16px; background:var(--panel); border:1px solid var(--line);
  border-radius:13px; padding:11px 15px; min-width:150px; box-shadow:0 6px 22px -8px rgba(var(--shadow)/.55); display:flex; flex-direction:column; gap:2px; }
.hzip .ro-z{ font-family:var(--mono); font-size:19px; font-weight:600; font-variant-numeric:tabular-nums; }
.hzip .ro-s{ font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); }
.hzip .readout.on .ro-z{ color:var(--green-line); }
@media (prefers-color-scheme: dark){ .hzip .readout.on .ro-z{ color:var(--green); } }

@media (max-width:640px){
  .hzip .bar{ gap:12px 14px; padding:12px 14px; }
  .hzip h1{ font-size:16px; }
  .hzip .tools{ width:100%; margin-left:0; }
  .hzip .find{ flex:1; width:auto; }
  .hzip .legend{ left:12px; bottom:12px; padding:10px 12px; }
  .hzip .readout{ right:12px; top:12px; }
}
`

const MARKUP = `
<header class="bar">
  <div class="brand">
    <span class="eyebrow">Houston Metro &middot; Coverage Map</span>
    <h1>Houston ZIP Coverage</h1>
  </div>
  <div class="stats">
    <div class="stat hi"><b id="hz-scount">&mdash;</b><span>Highlighted</span></div>
    <div class="stat"><b id="hz-stotal">&mdash;</b><span>ZIPs total</span></div>
  </div>
  <div class="tools">
    <div class="save saved" id="hz-save"><span class="dot"></span><span id="hz-savetext">All changes saved</span></div>
    <div class="field">
      <input class="find" id="hz-find" list="hz-ziplist" placeholder="Find ZIP" inputmode="numeric" autocomplete="off" aria-label="Find a ZIP code" />
      <datalist id="hz-ziplist"></datalist>
    </div>
    <button id="hz-roadsbtn" class="btn" aria-pressed="true">Roads</button>
    <button id="hz-lblbtn" class="btn" aria-pressed="false">Labels</button>
    <div class="zoomctl">
      <button id="hz-zout" class="btn ico" aria-label="Zoom out">&minus;</button>
      <button id="hz-zin" class="btn ico" aria-label="Zoom in">+</button>
    </div>
    <button id="hz-reset" class="btn">Reset</button>
    <div class="menu">
      <button id="hz-export" class="btn export" aria-haspopup="true" aria-expanded="false">Export &#9662;</button>
      <div class="pop" id="hz-pop" role="menu">
        <button class="popitem" role="menuitem" data-x="copy">Copy ZIP list</button>
        <button class="popitem" role="menuitem" data-x="copyjson">Copy as JSON</button>
        <button class="popitem" role="menuitem" data-x="json">Download JSON</button>
        <button class="popitem" role="menuitem" data-x="csv">Download CSV</button>
      </div>
    </div>
  </div>
</header>
<div class="stage">
  <svg id="hz-map" role="img" aria-label="Editable map of Houston-area ZIP codes">
    <g id="hz-layer">
      <g id="hz-fills"></g>
      <g id="hz-roads">
        <path id="hz-roads-street"></path>
        <path id="hz-roads-casing"></path>
        <path id="hz-roads-hwy"></path>
      </g>
      <g id="hz-labels"></g>
    </g>
  </svg>
  <div class="legend">
    <div class="key"><span class="sw green"></span> Highlighted <b id="hz-lgreen">&mdash;</b></div>
    <div class="key"><span class="sw grey"></span> Other ZIPs <b id="hz-lother">&mdash;</b></div>
    <div class="key"><span class="sw hwy"></span> Highways</div>
    <div class="key"><span class="sw street"></span> Major streets</div>
    <div class="hint" id="hz-hint">Click a ZIP to toggle &middot; drag to pan</div>
  </div>
  <div class="readout" id="hz-readout"><span class="ro-z" id="hz-roz">&mdash;</span><span class="ro-s" id="hz-ros">Click a ZIP to toggle</span></div>
</div>
`

function MapView({ onExpired }: { onExpired: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const inited = useRef(false)
  const onExpiredRef = useRef(onExpired)
  onExpiredRef.current = onExpired

  useEffect(() => {
    if (inited.current || !rootRef.current) return
    inited.current = true
    const root = rootRef.current
    root.innerHTML = MARKUP
    const NS = "http://www.w3.org/2000/svg"
    const $ = (id: string) => root.querySelector<HTMLElement>("#" + id)!
    const svg = $("hz-map") as unknown as SVGSVGElement
    const layer = $("hz-layer")
    const fillsG = $("hz-fills")
    const labelsG = $("hz-labels")
    const roadsG = $("hz-roads")
    const readout = $("hz-readout")
    const roZ = $("hz-roz"), roS = $("hz-ros")

    let selected = new Set<string>()
    const pathByZip: Record<string, SVGPathElement> = {}
    let total = 0
    let W = 1200, H = 1200

    function updateCounts() {
      $("hz-scount").textContent = String(selected.size)
      $("hz-stotal").textContent = String(total)
      $("hz-lgreen").textContent = String(selected.size)
      $("hz-lother").textContent = String(total - selected.size)
    }

    // ---- load geometry + saved selection in parallel ----
    Promise.all([
      fetch("/houston-zips/zips.json").then((r) => r.json()),
      fetch("/houston-zips/roads.json").then((r) => r.json()),
      fetch("/api/houston-zips/selection").then((r) => r.json()).catch(() => ({ exists: false })),
    ]).then(([mapData, roads, sel]) => {
      W = mapData.w; H = mapData.h; total = mapData.zips.length
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`)
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
      // initial selection: saved -> else defaults baked into zips.json
      const initial: string[] = sel && sel.exists && Array.isArray(sel.zips) ? sel.zips : mapData.defaults
      selected = new Set(initial)

      // roads
      ;($("hz-roads-street") as unknown as SVGPathElement).setAttribute("d", roads.street || "")
      ;($("hz-roads-casing") as unknown as SVGPathElement).setAttribute("d", roads.hwy || "")
      ;($("hz-roads-hwy") as unknown as SVGPathElement).setAttribute("d", roads.hwy || "")

      // build zip polygons + labels, ordered so highlighted paint on top
      const list = mapData.zips.slice().sort((a: any, b: any) => Number(selected.has(a.z)) - Number(selected.has(b.z)))
      const ff = document.createDocumentFragment()
      const lf = document.createDocumentFragment()
      const dl = $("hz-ziplist")
      for (const zp of list) {
        const p = document.createElementNS(NS, "path")
        p.setAttribute("d", zp.d)
        p.setAttribute("class", selected.has(zp.z) ? "zip on" : "zip")
        p.setAttribute("data-z", zp.z)
        ff.appendChild(p)
        pathByZip[zp.z] = p as SVGPathElement
        const t = document.createElementNS(NS, "text")
        t.setAttribute("x", zp.x); t.setAttribute("y", zp.y)
        t.setAttribute("class", "lbl")
        t.textContent = zp.z
        lf.appendChild(t)
        const o = document.createElement("option"); o.value = zp.z; dl.appendChild(o)
      }
      fillsG.appendChild(ff)
      labelsG.appendChild(lf)
      syncLabelClasses()
      updateCounts()
      apply()
    })

    function syncLabelClasses() {
      for (const t of Array.from(labelsG.querySelectorAll("text"))) {
        const z = t.textContent || ""
        t.setAttribute("class", selected.has(z) ? "lbl on" : "lbl")
      }
    }

    // ---- transform (pan / zoom) ----
    let k = 1, tx = 0, ty = 0
    const KMIN = 1, KMAX = 18, LABEL_PX = 12
    function clampPan() {
      tx = Math.min(0, Math.max(W * (1 - k), tx))
      ty = Math.min(0, Math.max(H * (1 - k), ty))
    }
    function apply() {
      layer.setAttribute("transform", `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(4)})`)
      const ctm = svg.getScreenCTM()
      if (ctm && ctm.a) labelsG.style.fontSize = (LABEL_PX / (k * ctm.a)).toFixed(2) + "px"
    }
    function toVB(cx: number, cy: number) {
      const m = svg.getScreenCTM()
      if (!m) return { x: 0, y: 0 }
      return new DOMPoint(cx, cy).matrixTransform(m.inverse())
    }
    svg.addEventListener("wheel", (e) => {
      e.preventDefault()
      const v = toVB(e.clientX, e.clientY)
      let f = Math.exp(-e.deltaY * 0.0016); f = Math.min(2, Math.max(0.5, f))
      const nk = Math.min(KMAX, Math.max(KMIN, k * f))
      tx = v.x - (v.x - tx) * (nk / k); ty = v.y - (v.y - ty) * (nk / k); k = nk
      clampPan(); apply()
    }, { passive: false })

    let panning = false, last: DOMPoint | { x: number; y: number } = { x: 0, y: 0 }, moved = false
    let downZip: Element | null = null
    svg.addEventListener("pointerdown", (e) => {
      panning = true; moved = false; last = toVB(e.clientX, e.clientY)
      downZip = (e.target as Element).closest?.(".zip") ?? null
      svg.setPointerCapture(e.pointerId); svg.classList.add("grabbing")
    })
    svg.addEventListener("pointermove", (e) => {
      if (panning) {
        const c = toVB(e.clientX, e.clientY)
        if (Math.abs(c.x - last.x) > 0.5 || Math.abs(c.y - last.y) > 0.5) moved = true
        tx += c.x - last.x; ty += c.y - last.y; last = c; clampPan(); apply()
        return
      }
      const el = (e.target as Element).closest?.(".zip")
      if (el) setReadout(el.getAttribute("data-z") || "", el.classList.contains("on"))
    })
    function endPan() {
      if (panning && !moved && downZip) toggleZip(downZip as SVGPathElement)
      panning = false; svg.classList.remove("grabbing"); downZip = null
    }
    window.addEventListener("pointerup", endPan)
    svg.addEventListener("pointerleave", () => { if (!panning) resetReadout() })

    function setReadout(z: string, on: boolean) {
      roZ.textContent = z
      roS.textContent = on ? "Click to remove" : "Click to add"
      readout.classList.toggle("on", on)
    }
    function resetReadout() {
      roZ.textContent = "—"; roS.textContent = "Click a ZIP to toggle"
      readout.classList.remove("on")
    }

    // ---- toggle + autosave ----
    let saveTimer: ReturnType<typeof setTimeout> | null = null
    const saveBox = $("hz-save"), saveText = $("hz-savetext")

    function setStatus(s: "saving" | "saved" | "failed") {
      saveBox.classList.remove("saving", "saved", "failed"); saveBox.classList.add(s)
      saveText.textContent = s === "saving" ? "Saving…" : s === "saved" ? "All changes saved" : "Save failed — retry"
    }
    function toggleZip(el: SVGPathElement) {
      const z = el.getAttribute("data-z") || ""
      if (selected.has(z)) { selected.delete(z); el.classList.remove("on") }
      else { selected.add(z); el.classList.add("on"); fillsG.appendChild(el) }
      const t = Array.from(labelsG.querySelectorAll("text")).find((n) => n.textContent === z)
      if (t) t.setAttribute("class", selected.has(z) ? "lbl on" : "lbl")
      updateCounts(); setReadout(z, selected.has(z)); scheduleSave()
    }
    function scheduleSave() {
      setStatus("saving")
      if (saveTimer) clearTimeout(saveTimer)
      saveTimer = setTimeout(doSave, 800)
    }
    async function doSave() {
      try {
        const r = await fetch("/api/houston-zips/selection", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ zips: Array.from(selected) }),
        })
        if (r.status === 401) { onExpiredRef.current(); return }
        if (!r.ok) { setStatus("failed"); return }
        setStatus("saved")
      } catch { setStatus("failed") }
    }

    // ---- export ----
    const exportBtn = $("hz-export"), pop = $("hz-pop")
    function sortedZips() { return Array.from(selected).sort() }
    function downloadFile(name: string, text: string, type: string) {
      const blob = new Blob([text], { type })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a"); a.href = url; a.download = name; a.click()
      URL.revokeObjectURL(url)
    }
    function flash(el: HTMLElement, msg: string) {
      const prev = el.textContent; el.textContent = msg
      setTimeout(() => { el.textContent = prev }, 1200)
    }
    function closePop() { pop.classList.remove("open"); exportBtn.setAttribute("aria-expanded", "false") }
    function doExport(kind: string, item: HTMLElement) {
      const zips = sortedZips()
      const stamp = new Date().toISOString()
      if (kind === "copy") {
        navigator.clipboard?.writeText(zips.join(", ")); flash(item, "Copied ✓"); return
      }
      if (kind === "copyjson") {
        navigator.clipboard?.writeText(JSON.stringify({ count: zips.length, updatedAt: stamp, zips }, null, 2))
        flash(item, "Copied ✓"); return
      }
      if (kind === "json") {
        downloadFile("houston-zips.json", JSON.stringify({ count: zips.length, updatedAt: stamp, zips }, null, 2), "application/json")
      } else if (kind === "csv") {
        downloadFile("houston-zips.csv", "zip\n" + zips.join("\n"), "text/csv")
      }
      closePop()
    }
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      const open = pop.classList.toggle("open")
      exportBtn.setAttribute("aria-expanded", open ? "true" : "false")
    })
    pop.addEventListener("click", (e) => {
      e.stopPropagation()
      const it = (e.target as Element).closest<HTMLElement>(".popitem")
      if (it) doExport(it.getAttribute("data-x") || "", it)
    })
    function onDocClick() { closePop() }
    document.addEventListener("click", onDocClick)

    // ---- controls ----
    $("hz-reset").addEventListener("click", () => { k = 1; tx = 0; ty = 0; apply() })
    function zoomCenter(f: number) {
      const cx = W / 2, cy = H / 2
      const nk = Math.min(KMAX, Math.max(KMIN, k * f))
      tx = cx - (cx - tx) * (nk / k); ty = cy - (cy - ty) * (nk / k); k = nk; clampPan(); apply()
    }
    $("hz-zin").addEventListener("click", () => zoomCenter(1.5))
    $("hz-zout").addEventListener("click", () => zoomCenter(1 / 1.5))
    const lblBtn = $("hz-lblbtn")
    lblBtn.addEventListener("click", () => {
      const on = labelsG.classList.toggle("show")
      lblBtn.setAttribute("aria-pressed", on ? "true" : "false")
    })
    const roadsBtn = $("hz-roadsbtn")
    roadsBtn.addEventListener("click", () => {
      const on = !roadsG.classList.toggle("hide")
      roadsBtn.setAttribute("aria-pressed", on ? "true" : "false")
    })
    const findInput = $("hz-find") as HTMLInputElement
    function locate(raw: string) {
      const z = (raw || "").trim()
      const el = pathByZip[z]
      if (!el) { if (z) { roZ.textContent = z; roS.textContent = "Not found"; readout.classList.remove("on") } return }
      const bb = el.getBBox(); const nkx = bb.x + bb.width / 2, nky = bb.y + bb.height / 2
      const nk = 8
      tx = W / 2 - nk * nkx; ty = H / 2 - nk * nky; k = nk; clampPan(); apply()
      setReadout(z, selected.has(z))
      el.classList.remove("locate"); void (el as unknown as HTMLElement).offsetWidth; el.classList.add("locate")
      setTimeout(() => el.classList.remove("locate"), 1600)
    }
    findInput.addEventListener("change", () => locate(findInput.value))
    findInput.addEventListener("keydown", (e) => { if ((e as KeyboardEvent).key === "Enter") locate(findInput.value) })
    window.addEventListener("resize", apply)
    // NOTE: no cleanup that removes these global listeners — the build is
    // guarded by `inited`, so under StrictMode's mount→cleanup→remount a
    // cleanup would strip pointerup/resize/click and the guarded re-run would
    // never re-add them. The map is a full-screen route; stale closures from a
    // rare re-login reference detached nodes and harmlessly no-op.
  }, [])

  return <div className="hzip" ref={rootRef} />
}

export default function HoustonZipsPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [pw, setPw] = useState("")
  const [err, setErr] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch("/api/houston-zips/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authenticated))
      .catch(() => setAuthed(false))
  }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setErr(false); setBusy(true)
    try {
      const r = await fetch("/api/houston-zips/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      })
      if (r.ok) setAuthed(true)
      else setErr(true)
    } catch {
      setErr(true)
    }
    setBusy(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {authed === null ? (
        <div className="hzip gate">
          <div className="loading">Loading…</div>
        </div>
      ) : authed ? (
        <MapView onExpired={() => setAuthed(false)} />
      ) : (
        <div className="hzip gate">
          <form className="login" onSubmit={login}>
            <span className="eyebrow">Zapp Studios</span>
            <h2>Houston ZIP Coverage</h2>
            <p>Enter the passcode to view and edit the coverage map. Click any ZIP to highlight it on or off — changes save automatically.</p>
            <input
              type="password" value={pw} onChange={(e) => setPw(e.target.value)}
              placeholder="Passcode" autoFocus autoComplete="off" aria-label="Passcode"
            />
            <div className="err">{err ? "That passcode didn’t work. Try again." : ""}</div>
            <button type="submit" className="btn go" disabled={busy || !pw}>
              {busy ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
