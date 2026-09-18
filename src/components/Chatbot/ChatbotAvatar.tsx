import { useRef, useEffect, useState, useMemo } from 'react'

const frameModules = import.meta.glob('../../assets/imagens/chatbot/ezgif-frame-*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const MOBILE_STEP = 4
const TOTAL_FRAMES = 80
const LERP_FACTOR = 0.12

function pad3(n: number): string {
  return String(n).padStart(3, '0')
}

function buildSortedUrls(step: number): string[] {
  const entries = Object.entries(frameModules).sort(([a], [b]) => a.localeCompare(b))
  const urls: string[] = []
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if (step > 1 && (i - 1) % step !== 0) continue
    const key = entries.find(([k]) => k.includes(`ezgif-frame-${pad3(i)}.webp`))
    if (key) urls.push(key[1] as string)
  }
  return urls
}

interface ChatbotAvatarProps {
  className?: string
}

export function ChatbotAvatar({ className }: ChatbotAvatarProps): React.JSX.Element {
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const step = mobile ? MOBILE_STEP : 1
  const sortedFrames = useMemo(() => buildSortedUrls(step), [step])
  const frameCount = sortedFrames.length
  const mid = Math.floor(frameCount / 2)

  const [frameIndex, setFrameIndex] = useState(mid)
  const targetFrame = useRef(mid)
  const currentFrame = useRef(mid)
  const mouseX = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const rafId = useRef(0)
  const lastFrame = useRef(mid)

  useEffect(() => {
    if (sortedFrames.length === 0) return
    if (mobile) {
      setFrameIndex(mid)
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const tick = () => {
      const normalizedX = mouseX.current / window.innerWidth
      targetFrame.current = normalizedX * (frameCount - 1)
      targetFrame.current = Math.max(0, Math.min(frameCount - 1, targetFrame.current))

      currentFrame.current += (targetFrame.current - currentFrame.current) * LERP_FACTOR

      const idx = Math.round(currentFrame.current)
      const clampedIndex = Math.max(0, Math.min(frameCount - 1, idx))

      if (clampedIndex !== lastFrame.current) {
        lastFrame.current = clampedIndex
        setFrameIndex(clampedIndex)
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [sortedFrames, mobile, mid, frameCount])

  if (sortedFrames.length === 0) {
    return <div className={className} />
  }

  return (
    <img
      className={className}
      src={sortedFrames[frameIndex]}
      alt="Gabizinha — assistente virtual"
      draggable={false}
      loading={mobile ? 'eager' : 'eager'}
    />
  )
}
