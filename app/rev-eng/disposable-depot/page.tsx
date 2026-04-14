"use client"

import { useState, useEffect } from "react"

export default function DisposableDepotPortal() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/dispo/auth")
      .then(r => r.json())
      .then(d => setAuthenticated(d.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const res = await fetch("/api/dispo/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      })

      if (res.ok) {
        setAuthenticated(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  if (authenticated === null) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d0d0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b6759",
        fontSize: 14,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        Loading...
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d0d0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        <div style={{
          background: "#17170f",
          border: "1px solid #302f24",
          borderRadius: 16,
          padding: "48px 40px",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            color: "#f97316",
            marginBottom: 8,
          }}>Zapp Studios</div>
          <h1 style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#f2ece0",
            marginBottom: 6,
          }}>Disposable Depot</h1>
          <p style={{
            fontSize: 14,
            color: "#6b6759",
            marginBottom: 28,
          }}>Enter the password to view the proposal.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              placeholder="Password"
              autoFocus
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 15,
                background: "#0d0d0b",
                border: error ? "1px solid #ef4444" : "1px solid #302f24",
                borderRadius: 8,
                color: "#f2ece0",
                outline: "none",
                marginBottom: 12,
              }}
            />
            {error && (
              <p style={{ fontSize: 13, color: "#ef4444", marginBottom: 12 }}>
                Incorrect password. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 0",
                fontSize: 14,
                fontWeight: 700,
                background: loading ? "#b45309" : "#f97316",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "Verifying..." : "View Proposal"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0d0d0b",
      overflow: "hidden",
      position: "fixed",
      inset: 0,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#17170f",
        borderBottom: "1px solid #302f24",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: "#6b6759" }}>
          Website Rebuild Proposal
        </span>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
          color: "#f97316",
        }}>Zapp Studios</div>
      </div>
      <iframe
        src="/api/dispo/doc"
        style={{
          flex: 1,
          border: "none",
          width: "100%",
          minHeight: 0,
        }}
      />
    </div>
  )
}
