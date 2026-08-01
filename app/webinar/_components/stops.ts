import type { Vector3Tuple } from 'three'

export type PanelId =
  | 'lobby'
  | 'title'
  | 'expect'
  | 'bio'
  | 'thesis'
  | 'studio'
  | 'textbook'
  | 'royal-numbers'
  | 'inside'
  | 'stage-marketing'
  | 'stage-onboarding'
  | 'stage-fulfillment'
  | 'stage-retention'
  | 'human'
  | 'qa'
  | 'mango'
  | 'yours'
  | 'offer'
  | 'close'

export type Emphasis =
  | 'none'
  | 'all'
  | 'royal'
  | 'mango'
  | 'yours'
  | 'royal.0'
  | 'royal.1'
  | 'royal.2'
  | 'royal.3'

export interface Stop {
  id: string
  camera: { position: Vector3Tuple; lookAt: Vector3Tuple; fov?: number }
  panel: PanelId | null
  emphasis: Emphasis
  /** transition duration in seconds; default 1.5 */
  duration?: number
}

export const DEFAULT_FOV = 45

// Poses are authored against the world layout in Scene.tsx:
// Royal Pawz funnel at origin (height ~4.34, top ≈ y 5.2), mango at [-7.5,0,-3],
// YOURS at [7.5,0,-3], sky title y 7.7–11.3 at z=-2, human-truth text at [-13, ~2.2, 2].
// Stops 1–5 hold the reveal: sky/plain framings that keep every funnel out of
// frame until the studio wide shot. Thesis/textbook/royal-numbers push the hero
// funnel right of center so their tall LEFT panels never cover it.
export const STOPS: Stop[] = [
  { id: 'lobby', camera: { position: [0, 10.1, 10.5], lookAt: [0, 10.9, -2] }, panel: 'lobby', emphasis: 'none', duration: 1.8 },
  { id: 'title', camera: { position: [0, 9.7, 9.2], lookAt: [0, 10.55, -2] }, panel: 'title', emphasis: 'none', duration: 1.6 },
  { id: 'expect', camera: { position: [0, 10.3, 9.8], lookAt: [0, 10.7, -2] }, panel: 'expect', emphasis: 'none', duration: 1.4 },
  { id: 'bio', camera: { position: [-18, 2.8, 9.5], lookAt: [-21, 2.3, 0] }, panel: 'bio', emphasis: 'none', duration: 1.8 },
  { id: 'human', camera: { position: [-13, 2.2, 8], lookAt: [-13, 2.2, 2] }, panel: 'human', emphasis: 'none', duration: 1.8 },
  { id: 'studio', camera: { position: [0, 5.6, 17], lookAt: [0, 2.1, -1] }, panel: 'studio', emphasis: 'all', duration: 2.2 },
  { id: 'thesis', camera: { position: [-2.6, 3.7, 11.5], lookAt: [-1.2, 3.1, 0] }, panel: 'thesis', emphasis: 'royal', duration: 2.0 },
  { id: 'textbook', camera: { position: [-3.6, 4.2, 10.0], lookAt: [-1.2, 3.2, 0] }, panel: 'textbook', emphasis: 'royal', duration: 1.4 },
  { id: 'royal-numbers', camera: { position: [1.6, 4.0, 10.4], lookAt: [-1.8, 3.15, 0] }, panel: 'royal-numbers', emphasis: 'royal', duration: 1.6 },
  { id: 'inside', camera: { position: [3.4, 4.4, 7.2], lookAt: [-0.3, 3.6, 0] }, panel: 'inside', emphasis: 'royal.1', duration: 1.2 },
  { id: 'stage-marketing', camera: { position: [4.6, 5.6, 8.2], lookAt: [-0.2, 4.6, 0] }, panel: 'stage-marketing', emphasis: 'royal.0', duration: 1.2 },
  // right-side pose keeps marketing → onboarding → fulfillment one smooth
  // descending orbit and opens the left cream for the stat annotation
  { id: 'stage-onboarding', camera: { position: [3.9, 4.1, 6.9], lookAt: [0.0, 3.5, 0] }, panel: 'stage-onboarding', emphasis: 'royal.1', duration: 1.2 },
  { id: 'stage-fulfillment', camera: { position: [3.6, 3.0, 6.4], lookAt: [0.15, 2.3, 0] }, panel: 'stage-fulfillment', emphasis: 'royal.2', duration: 1.2 },
  { id: 'stage-retention', camera: { position: [-3.0, 1.9, 5.6], lookAt: [0.9, 1.35, 0] }, panel: 'stage-retention', emphasis: 'royal.3', duration: 1.2 },
  { id: 'qa', camera: { position: [-3, 5.2, 16], lookAt: [0, 2.4, -1] }, panel: 'qa', emphasis: 'all', duration: 1.8 },
  { id: 'mango', camera: { position: [-10.1, 2.9, 2.5], lookAt: [-7.5, 2.15, -3] }, panel: 'mango', emphasis: 'mango' },
  { id: 'yours', camera: { position: [10.1, 2.7, 2.7], lookAt: [7.5, 2.0, -3] }, panel: 'yours', emphasis: 'yours' },
  { id: 'offer', camera: { position: [0, 8, 20], lookAt: [0, 3.1, -2] }, panel: 'offer', emphasis: 'all', duration: 1.8 },
  { id: 'close', camera: { position: [0, 11, 24], lookAt: [0, 4, -4] }, panel: 'close', emphasis: 'all', duration: 2 },
]
