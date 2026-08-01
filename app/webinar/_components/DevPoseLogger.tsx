'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

/**
 * Mounted only with ?dev=1 — fly with OrbitControls, frame a shot, press P,
 * paste the logged pose into stops.ts. Pose authoring as photography.
 */
export default function DevPoseLogger() {
  const controls = useRef<OrbitControlsImpl>(null)
  const camera = useThree((s) => s.camera)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'p') return
      const c = controls.current
      if (!c) return
      const p = camera.position
      const t = c.target
      // eslint-disable-next-line no-console
      console.log(
        JSON.stringify({
          position: [+p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2)],
          lookAt: [+t.x.toFixed(2), +t.y.toFixed(2), +t.z.toFixed(2)],
          dist: +p.distanceTo(t).toFixed(2),
        }),
      )
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [camera])

  return <OrbitControls ref={controls} makeDefault />
}
