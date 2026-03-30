'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Check, X, Zap, DollarSign, Shield, Cpu, Clock, Eye, Columns, Layers } from 'lucide-react'

// ─── Fonts ───────────────────────────────────────────────────────
const DISPLAY: React.CSSProperties = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

// ─── Colors ──────────────────────────────────────────────────────
const COLORS = {
  bg: '#0a1512',
  bgCard: '#0f2018',
  bgCardAlt: '#0f1a2a',
  accent: '#D4FF00',
  accentDim: '#1a3020',
  cloudAccent: '#7aa7f0',
  cloudDim: '#0f2040',
  border: '#1e3a2f',
  borderAlt: '#1e2e4a',
  textPrimary: '#e2f0e8',
  textSecondary: '#a0c4a8',
  textMuted: '#6b8f7a',
  textCloudMuted: '#3a5a8a',
  red: '#f07a7a',
}

// ─── Scroll animation hook ────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ─── Animation Variants ───────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// ─── Prompt Content ───────────────────────────────────────────────
const PROMPT = `Build a complete landing page in TSX for Dawn Patrol — a mobile golf app for iOS that makes scoring rounds and running leagues effortless. 10+ game formats including Skins, Wolf, Stableford, Best Net, and Football. Auto-calculates net scores and points from handicaps. League management with standings, invites, and commissioner tools. Friend system with social invites.

Design spec:
- Primary/bg: #1A2A27 (dark green), accent: #D4FF00 (lime), secondary: #D9D9D9 (gray)
- Tone: casual, competitive, built for golfers who take their game seriously but not themselves
- Sections: hero with app screenshot mockup, game formats showcase (grid of format cards), how it works (3 steps), league features, social/friends, download CTA
- Mobile-first, Tailwind CSS, no external dependencies beyond React and Tailwind
- Output only the complete TSX code`

// ─── Section Label ───────────────────────────────────────────────
function SectionLabel({ children, color = COLORS.textMuted }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ backgroundColor: COLORS.accent }} className="inline-block w-4 h-px" />
      <p style={{ ...MONO, letterSpacing: '0.15em', color, fontSize: '11px' }} className="uppercase font-semibold">
        {children}
      </p>
    </div>
  )
}

// ─── Hero Section ────────────────────────────────────────────────
function HeroSection() {
  const [showLocal, setShowLocal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowLocal(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '72px 24px 64px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: COLORS.accentDim,
            border: `1px solid #2a5035`,
            borderRadius: '6px',
            padding: '4px 12px',
            marginBottom: '28px'
          }}
        >
          <Zap size={12} style={{ color: COLORS.accent }} />
          <span style={{ ...MONO, fontSize: '11px', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.1em' }}>
            EXPERIMENT #001 — LOCAL VS CLOUD
          </span>
        </motion.div>

        {/* Headline — leads immediately */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ ...DISPLAY, fontSize: 'clamp(34px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.08, marginBottom: '24px' }}
        >
          <span style={{ color: COLORS.textPrimary }}>Cloud AI cost </span>
          <span style={{
            color: showLocal ? COLORS.textMuted : COLORS.cloudAccent,
            textDecoration: showLocal ? 'line-through' : 'none',
            transition: 'all 0.6s ease'
          }}>
            $0.23
          </span>
          <span style={{ color: COLORS.textPrimary }}>.<br />Local AI cost </span>
          <span style={{ color: COLORS.accent }}>less than a penny</span>
          <span style={{ color: COLORS.textPrimary }}>.</span>
        </motion.h1>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ color: COLORS.textSecondary, fontSize: '17px', lineHeight: 1.65, marginBottom: '40px', maxWidth: '520px' }}
        >
          Same prompt. Two models. One in the cloud, one on your desk.{' '}
          <span style={{ color: COLORS.textMuted }}>The output was closer than expected.</span>
        </motion.p>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ ...MONO, fontSize: '12px', color: COLORS.textMuted, letterSpacing: '0.06em' }}>
            See the full breakdown
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} style={{ color: COLORS.accent }} />
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

// ─── Setup Section (story + premise, merged) ──────────────────────
function SetupSection() {
  const { ref, isVisible } = useInView()

  const beats = [
    {
      label: 'THE PROBLEM',
      color: COLORS.cloudAccent,
      text: 'API bills compound fast. One prototype becomes a pipeline. Suddenly you\'re moving $300/month to Anthropic and wondering where it went.',
    },
    {
      label: 'THE QUESTION',
      color: COLORS.accent,
      text: 'Open-source models are getting uncomfortably good. Qwen, Llama, Mistral — on your own hardware, for free. But is the output actually production-ready?',
    },
    {
      label: 'THE EXPERIMENT',
      color: COLORS.textSecondary,
      text: 'I set up local inference on an M4 Pro (24GB). No API key, no internet. Same prompt sent to both. Here\'s what came back.',
    },
  ]

  const cards = [
    { icon: Cpu, title: 'LOCAL', desc: 'No API keys. No rate limits. Your hardware, your rules.' },
    { icon: DollarSign, title: 'COST', desc: '30x cheaper at scale. Thousands saved per month.' },
    { icon: Shield, title: 'PRIVATE', desc: 'Data never leaves your machine. Zero third-party exposure.' },
  ]

  return (
    <div ref={ref} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '56px 24px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div style={{ display: 'grid', gap: '48px' }} className="grid-cols-1 lg:grid-cols-2">

          {/* Left — Story timeline */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <SectionLabel>The Story</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {beats.map((beat, i) => (
                <motion.div
                  key={beat.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  {/* Timeline spine */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '3px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: beat.color, flexShrink: 0 }} />
                    {i < beats.length - 1 && (
                      <div style={{ width: '1px', background: COLORS.border, flex: 1, marginTop: '4px', minHeight: '48px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: i < beats.length - 1 ? '28px' : 0 }}>
                    <div style={{ ...MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: beat.color, marginBottom: '8px' }}>
                      {beat.label}
                    </div>
                    <p style={{ color: COLORS.textSecondary, fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                      {beat.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Premise cards */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <SectionLabel>Why It Matters</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cards.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
                  style={{
                    background: COLORS.bgCard,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '10px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  <div style={{ background: COLORS.accentDim, borderRadius: '6px', padding: '8px', flexShrink: 0, marginTop: '1px' }}>
                    <Icon size={16} style={{ color: COLORS.accent }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: COLORS.accent, letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {title}
                    </div>
                    <p style={{ color: COLORS.textSecondary, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

// ─── Prompt Accordion ─────────────────────────────────────────────
function PromptAccordion() {
  const [expanded, setExpanded] = useState(false)
  const { ref, isVisible } = useInView()

  return (
    <div ref={ref} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '48px 24px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>The Prompt</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Preview / Header */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              width: '100%',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: COLORS.textPrimary,
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <p style={{ ...MONO, fontSize: '13px', color: COLORS.textSecondary, margin: 0 }}>
                "Build a complete landing page in TSX for Dawn Patrol — a mobile golf app..."
              </p>
              <p style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '8px' }}>
                Click to {expanded ? 'collapse' : 'see full prompt'}
              </p>
            </div>
            {expanded ? <ChevronUp size={20} style={{ color: COLORS.textMuted }} /> : <ChevronDown size={20} style={{ color: COLORS.textMuted }} />}
          </button>

          {/* Expanded Content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${COLORS.border}` }}>
                  <pre style={{
                    ...MONO,
                    color: COLORS.textSecondary,
                    fontSize: '12px',
                    lineHeight: 1.8,
                    margin: 0,
                    paddingTop: '20px',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {PROMPT}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Stats Showdown ───────────────────────────────────────────────
function StatsShowdown() {
  const { ref, isVisible } = useInView()

  const qwenStats = [
    { label: 'Time', value: '9m 10s', barWidth: 62, note: '2.7x slower' },
    { label: 'Cost', value: '<$0.01', barWidth: 8, note: '30x cheaper!', highlight: true },
    { label: 'Tokens', value: '7,888', barWidth: 95, note: null },
    { label: 'Privacy', value: '100% local', barWidth: 100, note: '✓', highlight: true },
  ]

  const claudeStats = [
    { label: 'Time', value: '3m 10s', barWidth: 100, note: 'faster', highlight: true },
    { label: 'Cost', value: '$0.2325', barWidth: 100, note: 'standard' },
    { label: 'Tokens', value: '8,316', barWidth: 100, note: null },
    { label: 'Privacy', value: 'Sent to API', barWidth: 100, note: '✗', negative: true },
  ]

  return (
    <div ref={ref} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '48px 24px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>The Results</SectionLabel>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{ display: 'grid', gap: '16px' }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Qwen Card */}
          <motion.div
            variants={staggerItem}
            style={{
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: COLORS.accentDim, border: `1px solid #2a5035`, borderRadius: '6px', padding: '4px 10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.08em' }}>LOCAL</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '14px', color: COLORS.textPrimary }}>Qwen3.5-27B</span>
            </div>

            {qwenStats.map((stat) => (
              <div key={stat.label} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: COLORS.textMuted }}>{stat.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: stat.highlight ? COLORS.accent : COLORS.textPrimary }}>
                      {stat.value}
                    </span>
                    {stat.note && (
                      <span style={{ fontSize: '11px', color: stat.highlight ? COLORS.accent : COLORS.textMuted }}>
                        {stat.note}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ height: '4px', background: COLORS.border, borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${stat.barWidth}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ height: '100%', background: stat.highlight ? COLORS.accent : '#2a5035', borderRadius: '2px' }}
                  />
                </div>
              </div>
            ))}

            <p style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px' }}>
              M4 Pro 24GB • Claude-4.6-Opus Reasoning Distilled
            </p>
          </motion.div>

          {/* Claude Card */}
          <motion.div
            variants={staggerItem}
            style={{
              background: COLORS.bgCardAlt,
              border: `1px solid ${COLORS.borderAlt}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: COLORS.cloudDim, border: `1px solid #1e3a70`, borderRadius: '6px', padding: '4px 10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS.cloudAccent, letterSpacing: '0.08em' }}>CLOUD API</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#d0e4ff' }}>Claude Sonnet 4.6</span>
            </div>

            {claudeStats.map((stat) => (
              <div key={stat.label} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: COLORS.textCloudMuted }}>{stat.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: stat.highlight ? COLORS.cloudAccent : stat.negative ? COLORS.red : '#d0e4ff'
                    }}>
                      {stat.value}
                    </span>
                    {stat.note && (
                      <span style={{ fontSize: '11px', color: stat.highlight ? COLORS.cloudAccent : stat.negative ? COLORS.red : COLORS.textCloudMuted }}>
                        {stat.note}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ height: '4px', background: COLORS.borderAlt, borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${stat.barWidth}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: stat.negative ? COLORS.red : stat.highlight ? COLORS.cloudAccent : '#1e3a70',
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
            ))}

            <p style={{ fontSize: '11px', color: COLORS.textCloudMuted, marginTop: '8px' }}>
              Anthropic API • Prompt caching enabled
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Output Viewer ────────────────────────────────────────────────
type ViewMode = 'side-by-side' | 'tab' | 'stacked'

function OutputViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side')
  const [activeTab, setActiveTab] = useState<'qwen' | 'claude'>('qwen')
  const { ref, isVisible } = useInView()

  const viewModes: { id: ViewMode; label: string; icon: React.ElementType }[] = [
    { id: 'side-by-side', label: 'Side by Side', icon: Columns },
    { id: 'tab', label: 'Tab View', icon: Eye },
    { id: 'stacked', label: 'Stacked', icon: Layers },
  ]

  return (
    <div ref={ref} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '48px 24px' }} className="md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>See For Yourself</SectionLabel>

        {/* View Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}
        >
          {viewModes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: `1px solid ${viewMode === id ? COLORS.accent : COLORS.border}`,
                background: viewMode === id ? COLORS.accentDim : 'transparent',
                color: viewMode === id ? COLORS.accent : COLORS.textMuted,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Helper Tip */}
        <p style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '16px' }}>
          💡 Look for differences in: visual polish, spacing, typography hierarchy
        </p>

        {/* Output Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Side by Side */}
          {viewMode === 'side-by-side' && (
            <div style={{ display: 'grid', gap: '16px' }} className="grid-cols-1 lg:grid-cols-2">
              <IframeCard type="qwen" />
              <IframeCard type="claude" />
            </div>
          )}

          {/* Tab View */}
          {viewMode === 'tab' && (
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                <button
                  onClick={() => setActiveTab('qwen')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px 6px 0 0',
                    border: 'none',
                    background: activeTab === 'qwen' ? COLORS.bgCard : 'transparent',
                    color: activeTab === 'qwen' ? COLORS.accent : COLORS.textMuted,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Qwen (Local)
                </button>
                <button
                  onClick={() => setActiveTab('claude')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px 6px 0 0',
                    border: 'none',
                    background: activeTab === 'claude' ? COLORS.bgCardAlt : 'transparent',
                    color: activeTab === 'claude' ? COLORS.cloudAccent : COLORS.textMuted,
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Claude (Cloud)
                </button>
              </div>
              <div style={{ background: activeTab === 'qwen' ? COLORS.bgCard : COLORS.bgCardAlt, borderRadius: '0 12px 12px 12px', overflow: 'hidden' }}>
                <iframe
                  src={activeTab === 'qwen' ? '/local-models/dawn-patrol-qwen' : '/local-models/dawn-patrol-claude'}
                  style={{ width: '100%', height: '75vh', border: 'none' }}
                  title={activeTab === 'qwen' ? 'Qwen output' : 'Claude output'}
                />
              </div>
            </div>
          )}

          {/* Stacked */}
          {viewMode === 'stacked' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <IframeCard type="qwen" />
              <IframeCard type="claude" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Iframe Card ───────────────────────────────────────────────────
function IframeCard({ type }: { type: 'qwen' | 'claude' }) {
  const isQwen = type === 'qwen'

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isQwen ? COLORS.accent : COLORS.cloudAccent
        }} />
        <span style={{ fontWeight: 600, fontSize: '13px', color: isQwen ? COLORS.textPrimary : '#d0e4ff' }}>
          {isQwen ? 'Qwen3.5-27B — Local' : 'Claude Sonnet 4.6 — Cloud'}
        </span>
        <span style={{ fontSize: '11px', color: COLORS.textMuted, marginLeft: 'auto' }}>
          {isQwen ? '9m 10s · <$0.01' : '3m 10s · $0.2325'}
        </span>
      </div>
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${isQwen ? COLORS.border : COLORS.borderAlt}`,
      }}>
        <iframe
          src={isQwen ? '/local-models/dawn-patrol-qwen' : '/local-models/dawn-patrol-claude'}
          style={{ width: '100%', height: '70vh', border: 'none', display: 'block' }}
          title={isQwen ? 'Qwen output' : 'Claude output'}
        />
      </div>
    </div>
  )
}

// ─── Findings Section ──────────────────────────────────────────────
function FindingsSection() {
  const { ref, isVisible } = useInView()

  const findings = [
    {
      title: 'QUALITY',
      winner: 'claude',
      summary: 'Claude edges out on refinement',
      detail: 'Both followed the spec — same sections, colors, structure. But neither was 100% out of the box.',
      note: 'The remaining 15% (Claude) and 25% (Qwen) require further prompting or human intervention to reach production quality.',
      bars: [
        { label: 'Qwen', value: 75, display: '75% refined', color: COLORS.accent, dimColor: '#2a5035' },
        { label: 'Claude', value: 85, display: '85% refined', color: COLORS.cloudAccent, dimColor: '#1e3a70' },
      ],
    },
    {
      title: 'SPEED',
      winner: 'claude',
      summary: 'Claude is 2.7x faster',
      detail: '3min vs 9min. If you\'re iterating rapidly, cloud still wins on turnaround.',
      note: null,
      bars: [
        { label: 'Qwen', value: 35, display: '9m 10s', color: '#2a5035', dimColor: '#2a5035' },
        { label: 'Claude', value: 100, display: '3m 10s', color: COLORS.cloudAccent, dimColor: '#1e3a70' },
      ],
    },
    {
      title: 'VALUE',
      winner: 'qwen',
      summary: 'Qwen is 30x cheaper',
      detail: '$0.23 vs less than a penny. Same task, 30x the cost difference. That\'s the story.',
      note: null,
      bars: [
        { label: 'Qwen', value: 100, display: '<$0.01', color: COLORS.accent, dimColor: '#2a5035' },
        { label: 'Claude', value: 3, display: '$0.23', color: '#1e3a70', dimColor: '#1e3a70' },
      ],
    },
  ]

  return (
    <div ref={ref} style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '48px 24px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>The Verdict</SectionLabel>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{ display: 'grid', gap: '16px' }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {findings.map((finding) => (
            <motion.div
              key={finding.title}
              variants={staggerItem}
              style={{
                background: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ ...MONO, fontSize: '11px', fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.1em' }}>
                  {finding.title}
                </span>
                {finding.winner === 'qwen' ? (
                  <span style={{ fontSize: '10px', fontWeight: 700, color: COLORS.accent, background: COLORS.accentDim, padding: '3px 8px', borderRadius: '4px' }}>
                    LOCAL WINS
                  </span>
                ) : (
                  <span style={{ fontSize: '10px', fontWeight: 700, color: COLORS.cloudAccent, background: COLORS.cloudDim, padding: '3px 8px', borderRadius: '4px' }}>
                    CLOUD WINS
                  </span>
                )}
              </div>

              <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '8px', lineHeight: 1.3 }}>
                {finding.summary}
              </p>
              <p style={{ fontSize: '13px', color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: '20px' }}>
                {finding.detail}
              </p>

              {/* Bar charts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: finding.note ? '16px' : '0', flex: 1, justifyContent: 'flex-end' }}>
                {finding.bars.map((bar, bi) => (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: COLORS.textMuted, fontWeight: 600 }}>{bar.label}</span>
                      <span style={{ ...MONO, fontSize: '11px', color: bar.color === '#2a5035' || bar.color === '#1e3a70' ? COLORS.textMuted : bar.color, fontWeight: 700 }}>
                        {bar.display}
                      </span>
                    </div>
                    <div style={{ height: '8px', background: COLORS.border, borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${bar.value}%` } : { width: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 + bi * 0.12, ease: 'easeOut' }}
                        style={{ height: '100%', background: bar.color, borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footnote for quality */}
              {finding.note && (
                <p style={{ fontSize: '11px', color: COLORS.textMuted, lineHeight: 1.6, marginTop: '14px', borderTop: `1px solid ${COLORS.border}`, paddingTop: '12px', margin: '14px 0 0' }}>
                  {finding.note}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.accentDim}, ${COLORS.bgCard})`,
            border: `1px solid #2a5035`,
            borderRadius: '12px',
            padding: '24px',
            marginTop: '24px',
          }}
        >
          <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.accent, letterSpacing: '0.1em', marginBottom: '8px' }}>
            BOTTOM LINE
          </p>
          <p style={{ fontSize: '15px', color: COLORS.textPrimary, lineHeight: 1.7, margin: 0 }}>
            For production work, cloud APIs still win on quality and speed. But for prototyping,
            privacy-sensitive work, or high-volume tasks? <strong style={{ color: COLORS.accent }}>Local is ready.</strong>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Bigger Picture Section ────────────────────────────────────────
function BiggerPictureSection() {
  const { ref, isVisible } = useInView()

  const audiences = [
    { emoji: '⚖️', title: 'Law firms', reason: 'client confidentiality' },
    { emoji: '🏥', title: 'Healthcare', reason: 'HIPAA compliance' },
    { emoji: '💰', title: 'Finance', reason: 'regulatory requirements' },
    { emoji: '🚀', title: 'Startups', reason: 'cost-conscious scaling' },
  ]

  return (
    <div ref={ref} style={{ padding: '48px 24px 80px' }} className="md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>Why This Matters</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <p style={{ fontSize: '18px', color: COLORS.textPrimary, lineHeight: 1.7, marginBottom: '16px' }}>
            This isn't about one model beating another.
            It's about a fundamental shift in how AI gets deployed.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, color: COLORS.textMuted, letterSpacing: '0.1em', marginBottom: '16px' }}>
            WHO SHOULD CARE ABOUT LOCAL AI
          </p>
          <div style={{ display: 'grid', gap: '12px' }} className="grid-cols-1 sm:grid-cols-2">
            {audiences.map(({ emoji, title, reason }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <span style={{ fontSize: '20px' }}>{emoji}</span>
                <div>
                  <span style={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: '14px' }}>{title}</span>
                  <span style={{ color: COLORS.textMuted, fontSize: '13px' }}> — {reason}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: '16px', color: COLORS.textSecondary, lineHeight: 1.8, textAlign: 'center' }}
        >
          The infrastructure for private, sovereign AI is here.
          <br />
          <span style={{ color: COLORS.accent, fontWeight: 600 }}>It just runs quietly on your desk.</span>
        </motion.p>
      </div>
    </div>
  )
}

// ─── Main Page Component ───────────────────────────────────────────
export default function ComparisonPage() {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.textPrimary, fontFamily: 'system-ui, sans-serif' }}>
      <HeroSection />
      <SetupSection />
      <PromptAccordion />
      <StatsShowdown />
      <OutputViewer />
      <FindingsSection />
      <BiggerPictureSection />
    </div>
  )
}
