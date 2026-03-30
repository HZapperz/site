"use client";
import React, { useState } from "react";

const LIME = "#D4FF00";
const DARK = "#1A2A27";
const GRAY = "#D9D9D9";

const gameFormats = [
  { name: "Skins", emoji: "🏆", desc: "Hole-by-hole winners. Carryovers, ties, drama." },
  { name: "Wolf", emoji: "🐺", desc: "Pick your partner or go lone wolf. Every hole counts." },
  { name: "Stableford", emoji: "📊", desc: "Points-based scoring. Chase birdies, survive bogeys." },
  { name: "Best Net", emoji: "🎯", desc: "Handicap-adjusted net scores. Everyone has a shot." },
  { name: "Football", emoji: "🏈", desc: "Score like a football game. Touchdowns for eagles." },
  { name: "Nassau", emoji: "💰", desc: "Three bets in one — front, back, overall." },
  { name: "Bingo Bango Bongo", emoji: "🎲", desc: "Three ways to score every hole. Always competitive." },
  { name: "String", emoji: "🧵", desc: "Use your string wisely. Every inch is precious." },
  { name: "Scramble", emoji: "🔄", desc: "Best ball, team format. Carry each other to glory." },
  { name: "+ More", emoji: "⚡", desc: "New formats added regularly. Never play the same round twice." },
];

const steps = [
  {
    num: "01",
    title: "Create or join a round",
    desc: "Start a solo round, invite your crew, or jump into a league game. Pick your format and set the stakes.",
  },
  {
    num: "02",
    title: "Score as you play",
    desc: "Enter scores hole by hole. Net scores auto-calculate from handicaps — no math, no arguments.",
  },
  {
    num: "03",
    title: "See who won",
    desc: "Live leaderboard updates every hole. Full breakdown at the end. Share the carnage.",
  },
];

const leagueFeatures = [
  { icon: "📋", title: "Standings & stats", desc: "Full season standings updated after every round. Know exactly where you stack up." },
  { icon: "👑", title: "Commissioner tools", desc: "Set formats, manage rosters, approve scores. Run a tight ship or a loose one. Your call." },
  { icon: "📨", title: "Invites & scheduling", desc: "Send round invites directly in the app. Everyone knows when and where. No group text chaos." },
  { icon: "🔢", title: "Handicap management", desc: "Track handicaps per player, per season. Fair competition no matter who shows up." },
];

export default function DawnPatrolLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div
      style={{ backgroundColor: DARK, color: GRAY, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      className="min-h-screen"
    >
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span style={{ color: LIME }} className="text-2xl font-black tracking-tight">DAWN PATROL</span>
        </div>
        <a
          href="#download"
          style={{ backgroundColor: LIME, color: DARK }}
          className="px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Get the App
        </a>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-24 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div
              style={{ backgroundColor: "rgba(212,255,0,0.12)", color: LIME, border: `1px solid rgba(212,255,0,0.3)` }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 tracking-wider uppercase"
            >
              🏌️ Now Available on iOS
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight mb-6">
              Golf rounds,{" "}
              <span style={{ color: LIME }}>finally sorted.</span>
            </h1>
            <p style={{ color: "rgba(217,217,217,0.7)" }} className="text-lg lg:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Score any format, run a league, settle debates with automatic net scoring. Built for golfers who care about the game — just not enough to do math on the course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                style={{ backgroundColor: LIME, color: DARK }}
                className="px-8 py-4 rounded-full text-base font-black hover:opacity-90 transition-opacity text-center"
              >
                Download Free →
              </a>
              <a
                href="#formats"
                style={{ border: `1px solid rgba(217,217,217,0.3)`, color: GRAY }}
                className="px-8 py-4 rounded-full text-base font-semibold hover:border-white transition-colors text-center"
              >
                See formats
              </a>
            </div>
            <p style={{ color: "rgba(217,217,217,0.4)" }} className="text-xs mt-6">
              iOS 16+ · Free to download · Premium unlocks all formats
            </p>
          </div>

          {/* Phone mockup */}
          <div className="flex-shrink-0 relative">
            <div
              style={{
                width: 280,
                height: 560,
                background: "linear-gradient(160deg, #243d37 0%, #111e1c 100%)",
                border: "2px solid rgba(212,255,0,0.2)",
                borderRadius: 48,
                boxShadow: `0 0 80px rgba(212,255,0,0.08), 0 40px 80px rgba(0,0,0,0.5)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 100,
                  height: 28,
                  backgroundColor: "#0d1a18",
                  borderRadius: 20,
                  zIndex: 10,
                }}
              />

              {/* App UI mockup */}
              <div className="absolute inset-0 p-6 pt-16 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div style={{ color: LIME }} className="text-xs font-bold uppercase tracking-wider">Saturday Skins</div>
                    <div className="text-white text-lg font-black">Hole 12</div>
                  </div>
                  <div
                    style={{ backgroundColor: "rgba(212,255,0,0.15)", color: LIME }}
                    className="px-3 py-1 rounded-full text-xs font-bold"
                  >
                    LIVE
                  </div>
                </div>

                {/* Score rows */}
                {[
                  { name: "You", score: -2, net: -4, leading: true },
                  { name: "Scotty", score: +1, net: -1, leading: false },
                  { name: "Big Mike", score: 0, net: -2, leading: false },
                  { name: "Fletcher", score: +3, net: +1, leading: false },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: p.leading ? "rgba(212,255,0,0.1)" : "rgba(255,255,255,0.04)",
                      border: p.leading ? `1px solid rgba(212,255,0,0.3)` : "1px solid transparent",
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: p.leading ? LIME : "rgba(255,255,255,0.15)" }}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                      >
                        <span style={{ color: p.leading ? DARK : "white" }} className="text-xs font-black">
                          {i + 1}
                        </span>
                      </div>
                      <span style={{ color: p.leading ? LIME : "white" }} className="text-sm font-semibold">
                        {p.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div style={{ color: p.score <= 0 ? LIME : "#ff6b6b" }} className="text-sm font-black">
                        {p.score > 0 ? `+${p.score}` : p.score}
                      </div>
                      <div style={{ color: "rgba(217,217,217,0.5)" }} className="text-xs">
                        net {p.net > 0 ? `+${p.net}` : p.net}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bottom bar */}
                <div
                  style={{ backgroundColor: "rgba(212,255,0,0.08)", border: `1px solid rgba(212,255,0,0.2)` }}
                  className="mt-auto rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <div style={{ color: "rgba(217,217,217,0.6)" }} className="text-xs">Pot this hole</div>
                    <div style={{ color: LIME }} className="text-base font-black">$24 skins</div>
                  </div>
                  <div
                    style={{ backgroundColor: LIME, color: DARK }}
                    className="text-xs font-black px-3 py-1.5 rounded-full"
                  >
                    + Score
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 100,
                background: `radial-gradient(ellipse, rgba(212,255,0,0.15) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* GAME FORMATS */}
      <section id="formats" className="px-6 py-24" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              10+ game formats.{" "}
              <span style={{ color: LIME }}>Zero arguments.</span>
            </h2>
            <p style={{ color: "rgba(217,217,217,0.6)" }} className="text-lg max-w-xl mx-auto">
              Every format auto-calculates scores, payouts, and standings. Just play golf.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gameFormats.map((f, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(217,217,217,0.1)",
                  transition: "all 0.2s",
                }}
                className="rounded-2xl p-5 flex flex-col gap-2 hover:border-lime-300 cursor-default group"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,255,0,0.4)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(212,255,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(217,217,217,0.1)";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.04)";
                }}
              >
                <span className="text-3xl">{f.emoji}</span>
                <div className="font-black text-white text-sm">{f.name}</div>
                <div style={{ color: "rgba(217,217,217,0.55)" }} className="text-xs leading-relaxed">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            On the course in{" "}
            <span style={{ color: LIME }}>60 seconds.</span>
          </h2>
          <p style={{ color: "rgba(217,217,217,0.6)" }} className="text-lg">Three taps and you're scoring.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-full w-full h-px z-0"
                  style={{ background: `linear-gradient(to right, rgba(212,255,0,0.3), transparent)` }}
                />
              )}
              <div className="relative z-10">
                <div
                  style={{ color: LIME, fontSize: 64, lineHeight: 1 }}
                  className="font-black opacity-20 mb-4 select-none"
                >
                  {s.num}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                <p style={{ color: "rgba(217,217,217,0.65)" }} className="leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAGUE FEATURES */}
      <section className="px-6 py-24" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div style={{ color: LIME }} className="text-sm font-bold uppercase tracking-widest mb-4">
                League Mode
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Run a proper league.{" "}
                <span style={{ color: LIME }}>Not a group chat.</span>
              </h2>
              <p style={{ color: "rgba(217,217,217,0.65)" }} className="text-lg mb-10 leading-relaxed">
                Everything you need to run a competitive season — from the first round invite to the final standings. No spreadsheets. No drama. Just golf.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {leagueFeatures.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      style={{ backgroundColor: "rgba(212,255,0,0.1)", flexShrink: 0 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    >
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-black text-white mb-1">{f.title}</div>
                      <div style={{ color: "rgba(217,217,217,0.55)" }} className="text-sm leading-relaxed">
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* League card mockup */}
            <div className="flex-shrink-0">
              <div
                style={{
                  width: 320,
                  background: "linear-gradient(145deg, #243d37, #111e1c)",
                  border: "1px solid rgba(212,255,0,0.15)",
                  borderRadius: 24,
                  padding: 24,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div style={{ color: LIME }} className="text-xs font-bold uppercase tracking-wider mb-1">
                      Spring League 2025
                    </div>
                    <div className="text-white text-xl font-black">Fairway FC</div>
                  </div>
                  <div
                    style={{ backgroundColor: "rgba(212,255,0,0.15)", color: LIME }}
                    className="px-3 py-1 rounded-full text-xs font-bold"
                  >
                    Week 6
                  </div>
                </div>

                {/* Standings */}
                <div className="flex flex-col gap-2 mb-5">
                  {[
                    { pos: 1, name: "Dawson K.", pts: 142, trend: "↑" },
                    { pos: 2, name: "You", pts: 138, trend: "—" },
                    { pos: 3, name: "T. Morrison", pts: 121, trend: "↓" },
                    { pos: 4, name: "Gus W.", pts: 114, trend: "↑" },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: p.name === "You" ? "rgba(212,255,0,0.08)" : "rgba(255,255,255,0.03)",
                        border: p.name === "You" ? "1px solid rgba(212,255,0,0.25)" : "1px solid transparent",
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          style={{ color: p.pos === 1 ? LIME : "rgba(217,217,217,0.4)" }}
                          className="text-xs font-black w-4"
                        >
                          {p.pos}
                        </span>
                        <span
                          style={{ color: p.name === "You" ? LIME : "white" }}
                          className="text-sm font-semibold"
                        >
                          {p.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ color: "rgba(217,217,217,0.5)" }} className="text-xs">
                          {p.trend}
                        </span>
                        <span style={{ color: LIME }} className="text-sm font-black">
                          {p.pts}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{ backgroundColor: "rgba(212,255,0,0.06)", border: "1px solid rgba(212,255,0,0.15)" }}
                  className="rounded-xl p-3 flex items-center justify-between"
                >
                  <div style={{ color: "rgba(217,217,217,0.6)" }} className="text-xs">Next round</div>
                  <div style={{ color: LIME }} className="text-sm font-bold">Sat, 7:12am · Stableford</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL / FRIENDS */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            Your crew,{" "}
            <span style={{ color: LIME }}>in one place.</span>
          </h2>
          <p style={{ color: "rgba(217,217,217,0.6)" }} className="text-lg max-w-xl mx-auto">
            Add friends, see their recent rounds, challenge them to a format. Golf is better when everyone's connected.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🤝",
              title: "Friend requests",
              desc: "Add golfers by username or phone. No fake accounts. No clutter.",
            },
            {
              icon: "📱",
              title: "Social invites",
              desc: "Invite friends directly from your contacts or share a round link. They're in with one tap.",
            },
            {
              icon: "📈",
              title: "Round history",
              desc: "See your friends' recent scores, formats played, and handicap trend. Know who's been putting in work.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(217,217,217,0.08)",
              }}
              className="rounded-2xl p-6"
            >
              <div
                style={{ backgroundColor: "rgba(212,255,0,0.1)" }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
              <p style={{ color: "rgba(217,217,217,0.6)" }} className="text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section id="download" className="px-6 py-32" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">⛳</div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            Your next round starts{" "}
            <span style={{ color: LIME }}>here.</span>
          </h2>
          <p style={{ color: "rgba(217,217,217,0.65)" }} className="text-lg mb-10 leading-relaxed">
            Free to download. Works on any course. Your group will thank you after the first hole.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(217,217,217,0.2)",
                  color: "white",
                }}
                className="flex-1 px-5 py-4 rounded-full text-sm outline-none focus:border-lime-300 placeholder-gray-500 transition-colors"
              />
              <button
                type="submit"
                style={{ backgroundColor: LIME, color: DARK }}
                className="px-7 py-4 rounded-full font-black text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(212,255,0,0.1)",
                border: "1px solid rgba(212,255,0,0.3)",
                color: LIME,
              }}
              className="max-w-md mx-auto mb-8 px-6 py-4 rounded-full text-sm font-bold text-center"
            >
              You're on the list. We'll let you know when it drops. 🏌️
            </div>
          )}

          {/* App Store badge */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              style={{
                backgroundColor: "white",
                color: DARK,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div style={{ fontSize: 10, opacity: 0.7 }} className="uppercase tracking-wider font-semibold">Download on the</div>
                <div className="text-base font-black leading-tight">App Store</div>
              </div>
            </a>
          </div>

          <p style={{ color: "rgba(217,217,217,0.3)" }} className="text-xs mt-8">
            iOS 16+ required · iPhone & iPad · Free with optional Premium
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(217,217,217,0.1)" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div style={{ color: LIME }} className="font-black text-lg mb-1">DAWN PATROL</div>
            <div style={{ color: "rgba(217,217,217,0.4)" }} className="text-xs">
              The golf scoring app for people who love the game.
            </div>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: "rgba(217,217,217,0.45)" }}
                className="text-xs hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div style={{ color: "rgba(217,217,217,0.3)" }} className="text-xs">
            © 2025 Dawn Patrol. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
