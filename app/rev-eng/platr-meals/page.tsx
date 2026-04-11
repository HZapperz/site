"use client"

import { useState, useEffect } from "react"

const PASSWORD = "platr2026"

export default function PlatrMealsPortal() {
  const [authenticated, setAuthenticated] = useState(false)
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [activeDoc, setActiveDoc] = useState<"quote" | "scope" | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("platr-auth")
      if (stored === "true") setAuthenticated(true)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === PASSWORD) {
      setAuthenticated(true)
      setError(false)
      sessionStorage.setItem("platr-auth", "true")
    } else {
      setError(true)
    }
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
          }}>Platr Meals</h1>
          <p style={{
            fontSize: 14,
            color: "#6b6759",
            marginBottom: 28,
          }}>Enter the password to view the proposal documents.</p>
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
              style={{
                width: "100%",
                padding: "12px 0",
                fontSize: 14,
                fontWeight: 700,
                background: "#f97316",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              View Proposal
            </button>
          </form>
        </div>
      </div>
    )
  }

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
                fontSize: 13,
                fontWeight: 600,
                color: "#f97316",
                background: "none",
                border: "1px solid #302f24",
                borderRadius: 6,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              &larr; Back
            </button>
            <span style={{ fontSize: 13, color: "#6b6759" }}>
              {activeDoc === "quote" ? "Engagement Proposal (One-Pager)" : "Scope & Estimate (Detailed)"}
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
          src={activeDoc === "quote" ? "/_docs/pm/q.html" : "/_docs/pm/s.html"}
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
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
            fontSize: 32,
            fontWeight: 800,
            color: "#f2ece0",
            marginBottom: 6,
          }}>Platr Meals</h1>
          <p style={{
            fontSize: 16,
            color: "#6b6759",
          }}>Engagement Proposal &middot; April 2026</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}>
          <button
            onClick={() => setActiveDoc("quote")}
            style={{
              background: "#17170f",
              border: "1px solid #302f24",
              borderRadius: 14,
              padding: "32px 24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = "#f97316")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "#302f24")}
          >
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: 10,
            }}>Document 1</div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f2ece0",
              marginBottom: 8,
              lineHeight: 1.3,
            }}>Engagement Proposal</div>
            <div style={{
              fontSize: 13,
              color: "#6b6759",
              lineHeight: 1.6,
            }}>
              One-page overview: the opportunity, phased proposal, revenue calculator, MFF-style redesign, and pricing paths.
            </div>
          </button>

          <button
            onClick={() => setActiveDoc("scope")}
            style={{
              background: "#17170f",
              border: "1px solid #302f24",
              borderRadius: 14,
              padding: "32px 24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = "#f97316")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "#302f24")}
          >
            <div style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: 10,
            }}>Document 2</div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f2ece0",
              marginBottom: 8,
              lineHeight: 1.3,
            }}>Scope & Estimate</div>
            <div style={{
              fontSize: 13,
              color: "#6b6759",
              lineHeight: 1.6,
            }}>
              Detailed breakdown: AI advantage, MFF competitive analysis, app costs, all 32 Phase 1 items, 14 Phase 3 workstreams, and decision matrix.
            </div>
          </button>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: 12,
          color: "#3d3c2e",
          marginTop: 24,
        }}>
          Confidential &middot; Prepared for Platr Meals by Zapp Studios
        </p>
      </div>
    </div>
  )
}
