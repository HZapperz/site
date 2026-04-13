"use client"

import { useState, useEffect } from "react"

export default function PlatrMealsPortal() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/platr/auth")
      .then(r => r.json())
      .then(d => setAuthenticated(d.authenticated))
      .catch(() => setAuthenticated(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const res = await fetch("/api/platr/auth", {
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

  // Loading state
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

  // Login
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
          }}>Platr Meals</h1>
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

  // Authenticated — show document picker or document
  const [activeDoc, setActiveDoc] = useState<string | null>(null)

  if (activeDoc) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0d0d0b",
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setActiveDoc(null)}
              style={{
                background: "none",
                border: "1px solid #302f24",
                borderRadius: 6,
                color: "#6b6759",
                fontSize: 13,
                padding: "4px 12px",
                cursor: "pointer",
              }}
            >
              &larr; Back
            </button>
            <span style={{ fontSize: 13, color: "#6b6759" }}>
              {activeDoc === "quote" ? "Engagement Proposal" : "Detailed Scope & Estimate"}
            </span>
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: "#f97316",
          }}>Zapp Studios</div>
        </div>
        <iframe
          src={`/api/platr/doc/${activeDoc}`}
          style={{
            flex: 1,
            border: "none",
            width: "100%",
          }}
        />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 640, width: "100%", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            color: "#f97316",
            marginBottom: 8,
          }}>Zapp Studios</div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#f2ece0",
            marginBottom: 6,
          }}>Platr Meals</h1>
          <p style={{
            fontSize: 14,
            color: "#6b6759",
          }}>Choose a document to review.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={() => setActiveDoc("quote")}
            style={{
              background: "#17170f",
              border: "1px solid #302f24",
              borderRadius: 16,
              padding: "28px 32px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#f97316"
              e.currentTarget.style.boxShadow = "0 0 0 1px #f97316, 0 4px 24px rgba(249,115,22,0.08)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#302f24"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: 6,
            }}>Document 1</div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#f2ece0",
              marginBottom: 6,
            }}>Engagement Proposal</div>
            <p style={{
              fontSize: 14,
              color: "#6b6759",
              lineHeight: 1.6,
              margin: 0,
            }}>
              The overview. Opportunity summary, phased pricing, what each phase delivers, expected revenue impact, and decision comparison. Start here.
            </p>
          </button>

          <button
            onClick={() => setActiveDoc("scope")}
            style={{
              background: "#17170f",
              border: "1px solid #302f24",
              borderRadius: 16,
              padding: "28px 32px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#f97316"
              e.currentTarget.style.boxShadow = "0 0 0 1px #f97316, 0 4px 24px rgba(249,115,22,0.08)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#302f24"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: 6,
            }}>Document 2</div>
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#f2ece0",
              marginBottom: 6,
            }}>Detailed Scope & Estimate</div>
            <p style={{
              fontSize: 14,
              color: "#6b6759",
              lineHeight: 1.6,
              margin: 0,
            }}>
              The deep dive. Competitive benchmark vs. My Fit Foods, performance audit, 90-day funnel analysis, all 41 findings with fix details, fix-by-fix breakdown per phase, revenue projections, and timeline.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
