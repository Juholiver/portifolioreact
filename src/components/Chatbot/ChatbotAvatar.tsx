import { useRef, useEffect, useState, useMemo } from 'react'

const frameModules = import.meta.glob('../../assets/imagens/chatbot/ezgif-frame-*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const FRAME_COUNT = 80
const LERP_FACTOR = 0.12

function pad3(n: number): string {
  return String(n).padStart(3, '0')
}

function buildSortedUrls(): string[] {
  const entries = Object.entries(frameModules).sort(([a], [b]) => a.localeCompare(b))
  const urls: string[] = []
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const key = entries.find(([k]) => k.includes(`ezgif-frame-${pad3(i)}.png`))
    if (key) urls.push(key[1] as string)
  }
  return urls
}

interface ChatbotAvatarProps {
  className?: string
}

export function ChatbotAvatar({ className }: ChatbotAvatarProps): React.JSX.Element {
  const sortedFrames = useMemo(() => buildSortedUrls(), [])
  const [frameIndex, setFrameIndex] = useState(Math.floor(FRAME_COUNT / 2))
  const targetFrame = useRef(FRAME_COUNT / 2)
  const currentFrame = useRef(FRAME_COUNT / 2)
  const mouseX = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const rafId = useRef(0)
  const lastFrame = useRef(Math.floor(FRAME_COUNT / 2))

  useEffect(() => {
    if (sortedFrames.length === 0) return

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const tick = () => {
      const normalizedX = mouseX.current / window.innerWidth
      targetFrame.current = normalizedX * (FRAME_COUNT - 1)
      targetFrame.current = Math.max(0, Math.min(FRAME_COUNT - 1, targetFrame.current))

      currentFrame.current += (targetFrame.current - currentFrame.current) * LERP_FACTOR

      const frameIndex = Math.round(currentFrame.current)
      const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex))

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
  }, [sortedFrames])

  if (sortedFrames.length === 0) {
    return <div className={className} />
  }

  return (
    <img
      className={className}
      src={sortedFrames[frameIndex]}
      alt="Gabizinha — assistente virtual"
      draggable={false}
    />
  )
}
