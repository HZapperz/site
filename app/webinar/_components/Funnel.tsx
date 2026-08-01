'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Billboard, Line, Text } from '@react-three/drei'
import { easing } from 'maath'
import { AMBER_DK, CREAM, CREAM_DIM, FONT_DISPLAY_URL, FONT_MONO_URL, INK, RAMP, STAGE_NAMES } from './theme'

export interface FunnelSpec {
  topR: number
  bottomR: number
  bandH: number
  gap: number
}

export const ROYAL_SPEC: FunnelSpec = { topR: 2.55, bottomR: 0.75, bandH: 1.06, gap: 0.18 }
export const SMALL_SPEC: FunnelSpec = { topR: 1.35, bottomR: 0.48, bandH: 0.7, gap: 0.12 }

export function funnelHeight(spec: FunnelSpec): number {
  return 4 * spec.bandH + 3 * spec.gap
}

function radiusAt(spec: FunnelSpec, y: number): number {
  return spec.bottomR + (spec.topR - spec.bottomR) * (y / funnelHeight(spec))
}

export interface BandGeom {
  top: number
  bottom: number
  center: number
  rTop: number
  rBottom: number
  rCenter: number
}

export function bandGeom(spec: FunnelSpec, i: number): BandGeom {
  const top = funnelHeight(spec) - i * (spec.bandH + spec.gap)
  const bottom = top - spec.bandH
  const center = (top + bottom) / 2
  return {
    top,
    bottom,
    center,
    rTop: radiusAt(spec, top),
    rBottom: radiusAt(spec, bottom),
    rCenter: radiusAt(spec, center),
  }
}

/* ── solid amber funnel (Royal Pawz / mango) ─────────────────────── */

function SolidBand({ spec, index, dimmed }: { spec: FunnelSpec; index: number; dimmed: boolean }) {
  // Basic materials keep the brand hex eyedropper-true (no light shading);
  // depth comes from the open mouth, a darkened inner wall, gaps + shadows.
  const outer = useRef<THREE.MeshBasicMaterial>(null)
  const inner = useRef<THREE.MeshBasicMaterial>(null)
  const colors = useMemo(() => {
    const base = new THREE.Color(RAMP[index])
    const dim = new THREE.Color(CREAM_DIM)
    return {
      base,
      baseIn: base.clone().multiplyScalar(0.84),
      dim,
      dimIn: dim.clone().multiplyScalar(0.92),
    }
  }, [index])
  const g = bandGeom(spec, index)
  useFrame((_, dt) => {
    if (outer.current) easing.dampC(outer.current.color, dimmed ? colors.dim : colors.base, 0.25, dt)
    if (inner.current) easing.dampC(inner.current.color, dimmed ? colors.dimIn : colors.baseIn, 0.25, dt)
  })
  return (
    <group position={[0, g.center, 0]}>
      <mesh>
        <cylinderGeometry args={[g.rTop, g.rBottom, spec.bandH, 64, 1, true]} />
        <meshBasicMaterial ref={outer} color={RAMP[index]} side={THREE.FrontSide} />
      </mesh>
      <mesh scale={[0.998, 1, 0.998]}>
        <cylinderGeometry args={[g.rTop, g.rBottom, spec.bandH, 64, 1, true]} />
        <meshBasicMaterial ref={inner} color={RAMP[index]} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

export function SolidFunnel({
  spec,
  focusBand = null,
  dimAll = false,
  labels = false,
  labelSize = 0.3,
  hideLabels = false,
}: {
  spec: FunnelSpec
  /** when set, every OTHER band dims toward cream */
  focusBand?: number | null
  /** dim the whole funnel (another funnel has the stage) */
  dimAll?: boolean
  labels?: boolean
  labelSize?: number
  /** fade labels to zero (stays mounted so the SDF atlas stays warm) */
  hideLabels?: boolean
}) {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <SolidBand
          key={i}
          spec={spec}
          index={i}
          dimmed={dimAll || (focusBand !== null && focusBand !== i)}
        />
      ))}
      {[0, 1, 2, 3].map((i) => {
        const g = bandGeom(spec, i)
        return (
          <Line
            key={`rim${i}`}
            points={circlePoints(g.rTop, g.top + 0.002)}
            color={CREAM}
            lineWidth={1.4}
          />
        )
      })}
      {labels &&
        [0, 1, 2, 3].map((i) => {
          const g = bandGeom(spec, i)
          return (
            <BandLabel
              key={`l${i}`}
              y={g.center}
              towardCamera={g.rCenter + 0.55}
              text={STAGE_NAMES[i]}
              size={labelSize}
              dimmed={dimAll || (focusBand !== null && focusBand !== i)}
              hidden={hideLabels}
            />
          )
        })}
    </group>
  )
}

function BandLabel({
  y,
  towardCamera,
  text,
  size,
  dimmed,
  hidden = false,
}: {
  y: number
  /** how far the glyphs float off the band surface, toward the viewer */
  towardCamera: number
  text: string
  size: number
  dimmed: boolean
  hidden?: boolean
}) {
  const ref = useRef<any>(null)
  useFrame((_, dt) => {
    const t = ref.current
    if (!t) return
    const target = hidden ? 0 : dimmed ? 0.16 : 1
    t.fillOpacity = THREE.MathUtils.damp(t.fillOpacity ?? 1, target, 8, dt)
    t.outlineOpacity = THREE.MathUtils.damp(t.outlineOpacity ?? 1, target, 8, dt)
  })
  // Billboard pivots on the funnel axis; the offset lives INSIDE it, so the
  // label projects dead-center on its band from every camera angle (a world-z
  // offset drifted labels sideways at oblique stops).
  return (
    <Billboard position={[0, y, 0]}>
      <Text
        ref={ref}
        position={[0, 0, towardCamera]}
        font={FONT_DISPLAY_URL}
        fontSize={size}
        color={INK}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        outlineWidth={0.014}
        outlineColor={CREAM}
      >
        {text}
      </Text>
    </Billboard>
  )
}

/* ── ghost funnel (YOURS) — dashed rims, faint fill, live labeling ── */

function circlePoints(r: number, y: number, segments = 72): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    pts.push([Math.cos(a) * r, y, Math.sin(a) * r])
  }
  return pts
}

function GhostBand({
  spec,
  index,
  label,
  hideLabel = false,
  dimmed = false,
}: {
  spec: FunnelSpec
  index: number
  label: string
  hideLabel?: boolean
  /** another funnel has the stage — fade the ghost right down, filled or not */
  dimmed?: boolean
}) {
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const text = useRef<any>(null)
  const g = bandGeom(spec, index)
  const filled = label.trim().length > 0
  // Shrink-to-fit: volunteer answers must read as neat annotations inside their
  // band, not headline type. The billboard floats toward the camera, so it
  // projects larger than band-space math — budget conservatively and wrap.
  const labelW = Math.max(2 * g.rCenter * 0.72, 1.35)
  const labelSize = THREE.MathUtils.clamp(2.2 / Math.max(label.trim().length, 1), 0.09, 0.135)
  const target = useMemo(
    () => ({ ghost: new THREE.Color('#EDE4CE'), live: new THREE.Color(RAMP[index]) }),
    [index],
  )
  useFrame((_, dt) => {
    if (mat.current) {
      const o = dimmed ? (filled ? 0.1 : 0.06) : filled ? 0.85 : 0.15
      easing.damp(mat.current, 'opacity', o, 0.3, dt)
      easing.dampC(mat.current.color, filled && !dimmed ? target.live : target.ghost, 0.3, dt)
    }
    if (text.current) {
      text.current.fillOpacity = THREE.MathUtils.damp(
        text.current.fillOpacity ?? 0,
        filled && !hideLabel && !dimmed ? 1 : 0,
        8,
        dt,
      )
    }
  })
  return (
    <group>
      <mesh position={[0, g.center, 0]}>
        <cylinderGeometry args={[g.rTop, g.rBottom, spec.bandH, 64, 1, true]} />
        <meshBasicMaterial
          ref={mat}
          color="#EDE4CE"
          transparent
          opacity={0.15}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Line points={circlePoints(g.rTop, g.top)} color={INK} transparent opacity={dimmed ? 0.1 : 0.4} lineWidth={1.5} dashed dashSize={0.18} gapSize={0.12} />
      <Line points={circlePoints(g.rBottom, g.bottom)} color={INK} transparent opacity={dimmed ? 0.1 : 0.4} lineWidth={1.5} dashed dashSize={0.18} gapSize={0.12} />
      {/* offset inside the billboard → label stays centered on the band from
          every camera angle (world-z offset drifted it sideways at the YOURS
          close-up) */}
      <Billboard position={[0, g.center, 0]}>
        <Text
          ref={text}
          position={[0, 0, g.rCenter + 0.28]}
          font={FONT_MONO_URL}
          fontSize={labelSize}
          color={INK}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0}
          maxWidth={labelW}
          textAlign="center"
        >
          {label.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  )
}

export function GhostFunnel({
  spec,
  labels,
  hideLabels = false,
  dimmed = false,
}: {
  spec: FunnelSpec
  labels: [string, string, string, string]
  hideLabels?: boolean
  dimmed?: boolean
}) {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <GhostBand key={i} spec={spec} index={i} label={labels[i]} hideLabel={hideLabels} dimmed={dimmed} />
      ))}
    </group>
  )
}

/* ── the conversion drip — booked customers leaving the spout ────── */

export function Drip({ fromY, toY, count = 4 }: { fromY: number; toY: number; count?: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        offset: i / count,
        x: Math.sin(i * 12.9898) * 0.08,
        z: Math.sin(i * 78.233) * 0.08,
      })),
    [count],
  )
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    seeds.forEach((s, i) => {
      const m = meshes.current[i]
      const mat = mats.current[i]
      if (!m || !mat) return
      const p = (t * 0.5 + s.offset) % 1
      const k = p * p
      m.position.set(s.x, fromY + (toY - fromY) * k, s.z)
      // fade out sooner — drips were photobombing the progress rail at the
      // low-camera stops
      mat.opacity = p < 0.1 ? p / 0.1 : p > 0.68 ? Math.max(0, (1 - p) / 0.32) : 1
    })
  })
  return (
    <>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el
          }}
          position={[s.x, fromY, s.z]}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial
            ref={(el) => {
              mats.current[i] = el
            }}
            color={AMBER_DK}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </>
  )
}
