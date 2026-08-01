'use client'

import { useCallback, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import Overlay from './Overlay'
import { DEFAULT_FOV, STOPS } from './stops'
import { CREAM } from './theme'
import { useStopNavigation } from './useStopNavigation'

export default function Experience() {
  const [stopIndex, setStopIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'moving'>('idle')
  const [yoursLabels, setYoursLabels] = useState<[string, string, string, string]>(['', '', '', ''])
  const [glKey, setGlKey] = useState(0)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [devMode] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('dev'),
  )

  const indexRef = useRef(0)
  const goTo = useCallback((compute: (prev: number) => number) => {
    const next = Math.max(0, Math.min(STOPS.length - 1, compute(indexRef.current)))
    if (next === indexRef.current) return
    indexRef.current = next
    setStopIndex(next)
    setPhase('moving')
  }, [])

  const onArrive = useCallback(() => setPhase('idle'), [])

  useStopNavigation({ goTo, enabled: !devMode })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FBF7ED 0%, #F5EFE0 48%, #F1E9D4 100%)',
      }}
    >
      <Canvas
        key={glKey}
        flat
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: STOPS[0].camera.position, fov: DEFAULT_FOV, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (ev) => {
            ev.preventDefault()
            setTimeout(() => setGlKey((k) => k + 1), 100)
          })
        }}
      >
        <Scene
          stopIndex={stopIndex}
          reducedMotion={reducedMotion}
          onArrive={onArrive}
          yoursLabels={yoursLabels}
          devMode={devMode}
        />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 58%, rgba(201,112,32,0.055) 100%)',
        }}
      />
      <Overlay
        stopIndex={stopIndex}
        phase={phase}
        yoursLabels={yoursLabels}
        onYoursChange={setYoursLabels}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}
