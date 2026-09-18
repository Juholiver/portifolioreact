import { useReducedMotion, useScroll, useTransform, type MotionStyle } from 'framer-motion'
import type { RefObject } from 'react'

export interface HeroAboutTransitionStyles {
  stickyStyle: MotionStyle
  canvasStyle: MotionStyle
  aboutBgStyle: MotionStyle
}

/**
 * Transição cinematográfica Hero → About, vinculada ao scroll.
 *
 * Usa o scroll da section About como relógio único (Framer Motion):
 * - a Hero encolhe/desloca/desvanece enquanto o usuário sai dela;
 * - o background da About surge por trás antes da Hero sumir (crossfade real).
 *
 * Divisão de responsabilidades com o GSAP (sem conflito):
 * - Framer Motion: opacity/scale do sticky + canvas, opacity/scale das
 *   camadas de background da About.
 * - GSAP/ScrollTrigger: parallax `y` das camadas da About + entradas do
 *   card/ações (propriedades e elementos diferentes).
 */
export function useHeroAboutTransition(target: RefObject<HTMLElement | null>): HeroAboutTransitionStyles {
  const reduceMotion = useReducedMotion() ?? false
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'start start'],
  })

  const stickyOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const stickyOpacityReduced = useTransform(scrollYProgress, [0.55, 1], [1, 0])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.02 : 1.04])
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -14 : -30])
  const canvasOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])
  const aboutScale = useTransform(scrollYProgress, [0.15, 1], [isMobile ? 1.03 : 1.06, 1])

  if (reduceMotion) {
    return {
      stickyStyle: { opacity: stickyOpacityReduced },
      canvasStyle: {},
      aboutBgStyle: {},
    }
  }

  return {
    stickyStyle: { opacity: stickyOpacity },
    canvasStyle: { scale: canvasScale, y: canvasY, opacity: canvasOpacity },
    aboutBgStyle: { opacity: aboutOpacity, scale: aboutScale },
  }
}
