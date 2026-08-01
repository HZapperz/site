'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { Drip, GhostFunnel, ROYAL_SPEC, SMALL_SPEC, SolidFunnel, bandGeom, funnelHeight } from './Funnel'
import { FadeText } from './WorldText'
import CameraRig from './CameraRig'
import DevPoseLogger from './DevPoseLogger'
import { STOPS } from './stops'
import { AMBER, AMBER_DK, CREAM, FONT_DISPLAY_URL, FONT_MONO_URL, INK, INK_MUTED } from './theme'

const RG = [0, 1, 2, 3].map((i) => bandGeom(ROYAL_SPEC, i))
const ROYAL_Y = 0.85
const SMALL_Y = 0.6

/** Cream plain with a faint drafting-paper dot grid, dissolving into fog. */
function DottedGround() {
  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#F5EFE0'
    ctx.fillRect(0, 0, 64, 64)
    ctx.fillStyle = '#E9E1CB'
    ctx.beginPath()
    ctx.arc(32, 32, 2.4, 0, Math.PI * 2)
    ctx.fill()
    const t = new THREE.CanvasTexture(c)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(360, 360)
    t.anisotropy = 8
    return t
  }, [])
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
      <circleGeometry args={[300, 64]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function Halo({ x, z, r }: { x: number; z: number; r: number }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[x, 0.012, z]}>
      <circleGeometry args={[r, 48]} />
      <meshBasicMaterial color={AMBER} transparent opacity={0.07} depthWrite={false} />
    </mesh>
  )
}

function FadeBar({ visible }: { visible: boolean }) {
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  useFrame((_, dt) => {
    if (mat.current) mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, visible ? 1 : 0, 8, dt)
  })
  return (
    <mesh position={[0, 7.72, -2]}>
      <planeGeometry args={[9.4, 0.07]} />
      <meshBasicMaterial ref={mat} color={AMBER} transparent opacity={0} />
    </mesh>
  )
}

interface SceneProps {
  stopIndex: number
  reducedMotion: boolean
  onArrive: () => void
  yoursLabels: [string, string, string, string]
  devMode: boolean
}

export default function Scene({ stopIndex, reducedMotion, onArrive, yoursLabels, devMode }: SceneProps) {
  const stop = STOPS[stopIndex]
  const e = stop.emphasis
  const royalFocus = e.startsWith('royal.') ? Number(e.split('.')[1]) : null
  const at = (...ids: string[]) => ids.includes(stop.id)
  const dimRoyal = e === 'mango' || e === 'yours'
  // mango also dims during the human truth-bomb — it photobombed the giant text
  const dimMango = e === 'royal' || e.startsWith('royal.') || e === 'yours' || at('human')
  // the ghost dims whenever another funnel has the stage — a pre-filled YOURS
  // was photobombing the royal deep-dive stops in bright amber
  const dimYours = e === 'royal' || e.startsWith('royal.') || e === 'mango'

  return (
    <>
      <fog attach="fog" args={[CREAM, 25, 90]} />

      <DottedGround />
      <ContactShadows
        position={[0, 0.015, 0]}
        opacity={0.32}
        scale={44}
        blur={2.7}
        far={9}
        resolution={1024}
        frames={1}
        color="#8A7A5C"
      />
      <Halo x={0} z={0} r={ROYAL_SPEC.topR * 0.95} />
      <Halo x={-7.5} z={-3} r={SMALL_SPEC.topR * 0.95} />
      <Halo x={7.5} z={-3} r={SMALL_SPEC.topR * 0.95} />

      {/* sky title block — only where it sits FULLY in frame with nothing over
          it. Off at lobby (the clock card overlapped it on short windows), off
          at expect (center panel), off at studio (it cropped at the top). */}
      <FadeText position={[0, 11.15, -2]} text="ZAPP STUDIOS — LIVE FROM HOUSTON" visible={at('title', 'offer', 'close')} size={0.26} color={AMBER_DK} font={FONT_MONO_URL} billboard={false} letterSpacing={0.22} />
      <FadeText position={[0, 9.95, -2]} text="AI FOR LOCAL" visible={at('title', 'offer', 'close')} size={1.15} color={INK} font={FONT_DISPLAY_URL} billboard={false} letterSpacing={0.02} />
      <FadeText position={[0, 8.6, -2]} text="HOUSTON BUSINESSES" visible={at('title', 'offer', 'close')} size={1.15} color={AMBER_DK} font={FONT_DISPLAY_URL} billboard={false} letterSpacing={0.02} />
      <FadeBar visible={at('title', 'offer', 'close')} />

      {/* royal pawz — the hero funnel, floating over its shadow */}
      <group position={[0, ROYAL_Y, 0]}>
        <SolidFunnel spec={ROYAL_SPEC} labels hideLabels={at('close')} focusBand={royalFocus} dimAll={dimRoyal} />
        <Drip fromY={-0.04} toY={-ROYAL_Y + 0.03} />
        {/* name stays hidden through thesis/textbook — the funnel plays the
            anonymous archetype there; the name enters with the studio cast shot
            and returns when the June numbers make it Royal Pawz again */}
        <FadeText
          position={[0, funnelHeight(ROYAL_SPEC) + 0.75, 0]}
          text="ROYAL PAWZ USA"
          visible={at('studio', 'royal-numbers', 'qa', 'mango', 'yours', 'offer', 'close')}
          size={0.4}
          color={INK}
          font={FONT_DISPLAY_URL}
          letterSpacing={0.08}
        />
        {/* the June chain, beside its bands — every number carries a caption so
            it reads as an annotation, not a mystery figure */}
        <FadeText position={[RG[0].rCenter + 1.45, RG[0].center, 0]} text="12,500" visible={at('royal-numbers')} size={0.52} />
        <FadeText position={[RG[0].rCenter + 1.45, RG[0].center - 0.46, 0]} text="SAW US" visible={at('royal-numbers')} size={0.16} color={INK_MUTED} />
        <FadeText position={[RG[1].rCenter + 1.35, RG[1].center, 0]} text="707" visible={at('royal-numbers')} size={0.52} />
        <FadeText position={[RG[1].rCenter + 1.35, RG[1].center - 0.46, 0]} text="CAME INSIDE" visible={at('royal-numbers')} size={0.16} color={INK_MUTED} />
        <FadeText position={[RG[2].rCenter + 1.25, RG[2].center, 0]} text="60" visible={at('royal-numbers')} size={0.52} />
        <FadeText position={[RG[2].rCenter + 1.25, RG[2].center - 0.44, 0]} text="BOOKED" visible={at('royal-numbers')} size={0.17} color={INK_MUTED} />
        {/* per-stage stats, each with its plain-English caption */}
        <FadeText position={[0.2, RG[0].top + 0.78, 0]} text="12,500" visible={at('stage-marketing')} size={0.5} />
        <FadeText position={[0.2, RG[0].top + 0.42, 0]} text="VISITS · JUNE" visible={at('stage-marketing')} size={0.15} color={INK_MUTED} />
        <FadeText position={[-(RG[1].rCenter + 1.9), RG[1].center + 0.15, 0.5]} text="61.4%" visible={at('inside')} size={0.46} />
        <FadeText position={[-(RG[1].rCenter + 1.9), RG[1].center - 0.24, 0.5]} text="QUIT AT SIGN-UP" visible={at('inside')} size={0.15} color={INK_MUTED} />
        {/* floated in the open cream left of the funnel, clear of the label */}
        <FadeText position={[-(RG[1].rCenter + 2.2), RG[1].center + 0.3, 0.4]} text="7.1% → 30.8%" visible={at('stage-onboarding')} size={0.34} />
        <FadeText position={[-(RG[1].rCenter + 2.2), RG[1].center - 0.02, 0.4]} text="BOOKING STARTS THAT PAY" visible={at('stage-onboarding')} size={0.13} color={INK_MUTED} />
        {/* left of the funnel — the right side belongs to the DOM panel */}
        <FadeText position={[-(RG[2].rCenter + 1.9), RG[2].center + 0.1, 0.3]} text="57" visible={at('stage-fulfillment')} size={0.5} />
        <FadeText position={[-(RG[2].rCenter + 1.9), RG[2].center - 0.34, 0.3]} text="OF 60 SHOWED UP" visible={at('stage-fulfillment')} size={0.15} color={INK_MUTED} />
        <FadeText position={[-(RG[3].rCenter + 1.55), RG[3].center + 0.25, 0.3]} text="52%" visible={at('stage-retention')} size={0.5} />
        <FadeText position={[-(RG[3].rCenter + 1.55), RG[3].center - 0.14, 0.3]} text="OF JUNE REVENUE" visible={at('stage-retention')} size={0.13} color={INK_MUTED} />
      </group>

      {/* mango2usa */}
      <group position={[-7.5, SMALL_Y, -3]}>
        <SolidFunnel spec={SMALL_SPEC} dimAll={dimMango} />
        <FadeText position={[0, funnelHeight(SMALL_SPEC) + 0.55, 0]} text="MANGO2USA" visible={!dimMango} size={0.3} color={INK} font={FONT_DISPLAY_URL} letterSpacing={0.08} />
      </group>

      {/* yours — the ghost */}
      <group position={[7.5, SMALL_Y, -3]}>
        <GhostFunnel spec={SMALL_SPEC} labels={yoursLabels} hideLabels={at('close')} dimmed={dimYours} />
        <FadeText position={[0, funnelHeight(SMALL_SPEC) + 0.55, 0]} text="YOURS" visible={!dimYours} size={0.3} color={INK_MUTED} font={FONT_DISPLAY_URL} letterSpacing={0.12} />
      </group>

      {/* the truth bomb, standing on an open patch of plain */}
      <FadeText position={[-13, 3.0, 2]} text="THE BEST AI AGENT" visible={at('human')} size={0.62} color={INK} font={FONT_DISPLAY_URL} billboard={false} />
      <FadeText position={[-13, 2.2, 2]} text="IS A HUMAN" visible={at('human')} size={0.62} color={AMBER_DK} font={FONT_DISPLAY_URL} billboard={false} />
      <FadeText position={[-13, 1.4, 2]} text="USING AI." visible={at('human')} size={0.62} color={INK} font={FONT_DISPLAY_URL} billboard={false} />

      {devMode ? (
        <DevPoseLogger />
      ) : (
        <CameraRig stopIndex={stopIndex} reducedMotion={reducedMotion} onArrive={onArrive} />
      )}
    </>
  )
}
