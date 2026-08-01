'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Vector3 } from 'three'
import { DEFAULT_FOV, STOPS } from './stops'

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Fixed-duration eased tween between authored stops. Always retargets from the
 * CURRENT interpolated pose, so a keypress mid-flight banks smoothly instead of
 * queueing or dropping.
 */
export default function CameraRig({
  stopIndex,
  reducedMotion,
  onArrive,
}: {
  stopIndex: number
  reducedMotion: boolean
  onArrive: () => void
}) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera
  const look = useRef(new Vector3(...STOPS[0].camera.lookAt))
  const tw = useRef({
    fromPos: new Vector3(),
    toPos: new Vector3(),
    fromLook: new Vector3(),
    toLook: new Vector3(),
    fromFov: DEFAULT_FOV,
    toFov: DEFAULT_FOV,
    start: 0,
    duration: 0,
    done: true,
  })
  const mounted = useRef(false)
  const arrive = useRef(onArrive)
  useEffect(() => {
    arrive.current = onArrive
  })

  useEffect(() => {
    const s = STOPS[stopIndex]
    const t = tw.current
    t.fromPos.copy(camera.position)
    t.fromLook.copy(look.current)
    t.fromFov = camera.fov
    t.toPos.set(...s.camera.position)
    t.toLook.set(...s.camera.lookAt)
    t.toFov = s.camera.fov ?? DEFAULT_FOV
    t.start = performance.now()
    t.duration = !mounted.current || reducedMotion ? 0 : (s.duration ?? 1.5) * 1000
    t.done = false
    mounted.current = true
  }, [stopIndex, reducedMotion, camera])

  useFrame(() => {
    const t = tw.current
    if (t.done) return
    const raw = t.duration === 0 ? 1 : Math.min((performance.now() - t.start) / t.duration, 1)
    const k = ease(raw)
    camera.position.lerpVectors(t.fromPos, t.toPos, k)
    look.current.lerpVectors(t.fromLook, t.toLook, k)
    camera.lookAt(look.current)
    const fov = t.fromFov + (t.toFov - t.fromFov) * k
    if (fov !== camera.fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
    if (raw >= 1) {
      t.done = true
      arrive.current()
    }
  })

  return null
}
