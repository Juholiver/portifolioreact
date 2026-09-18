import { useEffect, useRef } from 'react'
import './CinematicScrollCanvas.css'

const frameModules = import.meta.glob('../../assets/imagens/hero/ezgif-frame-*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function pad3(n: number): string {
  return String(n).padStart(3, '0')
}

function buildSortedUrls(): string[] {
  const entries = Object.entries(frameModules).sort(([a], [b]) => a.localeCompare(b))
  const urls: string[] = []
  for (let i = 1; i <= 239; i++) {
    const key = entries.find(([k]) => k.includes(`ezgif-frame-${pad3(i)}.webp`))
    if (key) urls.push(key[1] as string)
  }
  return urls
}

const FRAME_URLS = buildSortedUrls()
const FRAME_COUNT = FRAME_URLS.length
const SMOOTHING = 0.10
const IMAGE_W = 1920
const IMAGE_H = 1080

export function CinematicScrollCanvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isReduced = (): boolean => mqlReduced.matches

    const images = new Array<HTMLImageElement | null>(FRAME_COUNT).fill(null)
    let currentFrame = 0
    let targetFrame = 0
    let lastRendered = -1
    let rafId: number | null = null

    const updateSize = (): void => {
      const dprRaw = window.devicePixelRatio || 1
      const maxUpscale = 1.2
      const dpr = Math.min(
        dprRaw,
        (IMAGE_W * maxUpscale) / window.innerWidth,
        (IMAGE_H * maxUpscale) / window.innerHeight,
      )
      const finalDpr = Math.max(dpr, 1)
      canvas.width = Math.round(window.innerWidth * finalDpr)
      canvas.height = Math.round(window.innerHeight * finalDpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      lastRendered = -1
    }
    updateSize()

    const loadFrame = (idx: number): void => {
      if (idx >= FRAME_COUNT || images[idx]) return
      const img = new Image()
      img.decoding = 'async'
      img.src = FRAME_URLS[idx]
      img.onload = () => {
        images[idx] = img
        if (idx === 0 && lastRendered === -1) {
          drawCover(img)
          lastRendered = 0
        }
      }
    }

    for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) loadFrame(i)

    let batchIdx = 10
    const loadBatch = (): void => {
      for (let b = 0; b < 4 && batchIdx < FRAME_COUNT; b++, batchIdx++) {
        loadFrame(batchIdx)
      }
      if (batchIdx < FRAME_COUNT) {
        const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number }
        if (w.requestIdleCallback) w.requestIdleCallback(loadBatch)
        else setTimeout(loadBatch, 100)
      }
    }
    const batchTimer = setTimeout(loadBatch, 300)

    const drawCover = (img: HTMLImageElement): void => {
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth || img.width
      const ih = img.naturalHeight || img.height
      if (!iw || !ih) return

      const scale = Math.max(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2

      ctx.fillStyle = '#02060e'
      ctx.fillRect(0, 0, cw, ch)

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, dx, dy, dw, dh)

      // Vignette cinematografico — sutil
      const grad = ctx.createRadialGradient(
        cw * 0.5, ch * 0.5, Math.min(cw, ch) * 0.65,
        cw * 0.5, ch * 0.5, Math.max(cw, ch) * 0.85,
      )
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.12)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, cw, ch)
    }

    const nearest = (idx: number): HTMLImageElement | null => {
      const r = Math.round(idx)
      if (images[r]) return images[r]
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (images[r - d]) return images[r - d]
        if (images[r + d]) return images[r + d]
      }
      for (const img of images) if (img) return img
      return null
    }

    const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi)

    const onScroll = (): void => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollH > 0 ? clamp(window.scrollY / scrollH, 0, 1) : 0
      targetFrame = progress * (FRAME_COUNT - 1)
    }

    const tick = (): void => {
      rafId = requestAnimationFrame(tick)
      onScroll()

      if (isReduced()) {
        const idx = clamp(Math.round(targetFrame), 0, FRAME_COUNT - 1)
        if (idx !== lastRendered) {
          const img = nearest(idx)
          if (img) {
            drawCover(img)
            lastRendered = idx
            currentFrame = targetFrame
          }
        }
        return
      }

      const diff = targetFrame - currentFrame
      if (Math.abs(diff) < 0.001) {
        currentFrame = targetFrame
      } else {
        currentFrame += diff * SMOOTHING
      }

      const idx = clamp(Math.round(currentFrame), 0, FRAME_COUNT - 1)
      if (idx !== lastRendered) {
        const img = nearest(idx)
        if (img) {
          drawCover(img)
          lastRendered = idx
        }
      }
    }

    onScroll()
    tick()

    const onResize = (): void => {
      updateSize()
      const img = nearest(Math.round(currentFrame))
      if (img) drawCover(img)
    }
    const onOrientation = (): void => {
      setTimeout(() => {
        updateSize()
        const img = nearest(Math.round(currentFrame))
        if (img) drawCover(img)
      }, 250)
    }
    const onMql = (): void => { lastRendered = -1 }

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrientation)
    if (mqlReduced.addEventListener) mqlReduced.addEventListener('change', onMql)
    else mqlReduced.addListener(onMql)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrientation)
      clearTimeout(batchTimer)
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (mqlReduced.removeEventListener) mqlReduced.removeEventListener('change', onMql)
      else mqlReduced.removeListener(onMql)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cinematic-bg"
      aria-hidden="true"
    />
  )
}
