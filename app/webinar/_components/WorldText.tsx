'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { AMBER_DK, FONT_MONO_URL } from './theme'

/**
 * In-world text that fades with the active stop. Mounted permanently so
 * troika builds every SDF atlas behind the loading screen — no mid-show pops.
 */
export function FadeText({
  position,
  text,
  visible,
  size = 0.55,
  color = AMBER_DK,
  font = FONT_MONO_URL,
  billboard = true,
  letterSpacing = 0,
  maxWidth,
  align = 'center',
}: {
  position: [number, number, number]
  text: string
  visible: boolean
  size?: number
  color?: string
  font?: string
  billboard?: boolean
  letterSpacing?: number
  maxWidth?: number
  align?: 'left' | 'center' | 'right'
}) {
  const ref = useRef<any>(null)
  useFrame((_, dt) => {
    const t = ref.current
    if (!t) return
    t.fillOpacity = THREE.MathUtils.damp(t.fillOpacity ?? 0, visible ? 1 : 0, 8, dt)
  })
  const inner = (
    <Text
      ref={ref}
      font={font}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      fillOpacity={0}
      letterSpacing={letterSpacing}
      maxWidth={maxWidth}
      textAlign={align}
    >
      {text}
    </Text>
  )
  return billboard ? (
    <Billboard position={position}>{inner}</Billboard>
  ) : (
    <group position={position}>{inner}</group>
  )
}

/** Always-visible world text (names, sky title). */
export function WorldLabel({
  position,
  text,
  size,
  color,
  font,
  billboard = true,
  letterSpacing = 0,
}: {
  position: [number, number, number]
  text: string
  size: number
  color: string
  font: string
  billboard?: boolean
  letterSpacing?: number
}) {
  const inner = (
    <Text
      font={font}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      letterSpacing={letterSpacing}
    >
      {text}
    </Text>
  )
  return billboard ? (
    <Billboard position={position}>{inner}</Billboard>
  ) : (
    <group position={position}>{inner}</group>
  )
}
