"use client"

import { useEffect, useState } from "react"

type Data = { exists: boolean; zips: string[] | null; updatedAt: string | null; count: number }

const bg = "#0d1712"
const panel = "#121d18"
const line = "#223029"
const ink = "#e7f1ea"
const muted = "#8fa79a"
const green = "#2bb56a"

export default function HoustonZipsAdmin() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [pw, setPw] = useState("")
  const [err, setErr] = useState(false)
  const [data, setData] = useState<Data | null>(null)
  const [copied, setCopied] = useState("")

  useEffect(() => {
    fetch("/api/houston-zips/auth").then((r) => r.json()).then((d) => setAuthed(!!d.authenticated)).catch(() => setAuthed(false))
  }, [])

  useEffect(() => {
    if (authed) load()
  }, [authed])

  async function load() {
    const d = await fetch("/api/houston-zips/selection").then((r) => r.json())
    setData(d)
  }

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setErr(false)
    const r = await fetch("/api/houston-zips/auth", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }),
    })
    if (r.ok) setAuthed(true)
    else setErr(true)
  }

  const zips = (data?.zips ?? []).slice().sort()

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => { setCopied(label); setTimeout(() => setCopied(""), 1500) })
  }
  function download(text: string, filename: string, type: string) {
    const blob = new Blob([text], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const wrap: React.CSSProperties = {
    minHeight: "100vh", background: bg, color: ink, fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif",
    display: "flex", justifyContent: "center", padding: "40px 20px",
  }
  const btn: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: ink, background: "transparent", border: `1px solid ${line}`,
    borderRadius: 9, padding: "9px 14px", cursor: "pointer",
  }

  if (authed === null) {
    return <div style={{ ...wrap, alignItems: "center", color: muted }}>Loading…</div>
  }

  if (!authed) {
    return (
      <div style={{ ...wrap, alignItems: "center" }}>
        <form onSubmit={login} style={{ background: panel, border: `1px solid ${line}`, borderRadius: 16, padding: "40px 34px", width: 360, maxWidth: "100%" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: green, marginBottom: 8 }}>Zapp Studios</div>
          <h1 style={{ fontSize: 21, margin: "0 0 6px" }}>Houston ZIPs — Admin</h1>
          <p style={{ fontSize: 13, color: muted, margin: "0 0 18px", lineHeight: 1.5 }}>Enter the passcode to view the ZIP codes the client saved.</p>
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Passcode" autoFocus
            style={{ width: "100%", fontSize: 15, padding: "11px 13px", borderRadius: 10, border: `1px solid ${line}`, background: bg, color: ink, outline: "none" }}
          />
          {err && <div style={{ color: "#e0533b", fontSize: 12.5, marginTop: 8 }}>That passcode didn&apos;t work.</div>}
          <button type="submit" style={{ ...btn, width: "100%", marginTop: 16, background: green, borderColor: green, color: "#08130c", padding: 12 }}>View data</button>
        </form>
      </div>
    )
  }

  const csv = "zip\n" + zips.join("\n")
  const commas = zips.join(", ")
  const json = JSON.stringify({ count: zips.length, updatedAt: data?.updatedAt ?? null, zips }, null, 2)

  return (
    <div style={{ ...wrap, alignItems: "flex-start" }}>
      <div style={{ width: 760, maxWidth: "100%" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: green }}>Houston ZIPs — Admin</div>
            <h1 style={{ fontSize: 26, margin: "4px 0 0" }}>{zips.length} ZIP codes highlighted</h1>
            <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>
              {data?.exists ? `Last saved ${data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : "—"}` : "No client edits yet — showing nothing saved."}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button style={btn} onClick={load}>Refresh</button>
            <a href="/houston-zips" style={{ ...btn, textDecoration: "none" }}>Open map</a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "22px 0 14px" }}>
          <button style={btn} onClick={() => copy(commas, "list")}>{copied === "list" ? "Copied ✓" : "Copy comma list"}</button>
          <button style={btn} onClick={() => copy(csv, "csv")}>{copied === "csv" ? "Copied ✓" : "Copy CSV"}</button>
          <button style={btn} onClick={() => download(csv, "houston-zips.csv", "text/csv")}>Download CSV</button>
          <button style={btn} onClick={() => download(json, "houston-zips.json", "application/json")}>Download JSON</button>
        </div>

        <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 14, padding: "16px 18px" }}>
          <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: 13.5, lineHeight: 1.9, color: ink, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(66px,1fr))", gap: "2px 10px" }}>
            {zips.map((z) => <span key={z}>{z}</span>)}
          </div>
          {zips.length === 0 && <div style={{ color: muted, fontSize: 14 }}>No ZIP codes saved yet.</div>}
        </div>
      </div>
    </div>
  )
}
