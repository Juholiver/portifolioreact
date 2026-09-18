import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export function Hero(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    const onClickOutside = (e: MouseEvent): void => {
      const target = e.target as Node
      if (drawerRef.current && !drawerRef.current.contains(target) && menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  return (
    <section className="jm-hero" aria-label="José Mário — Desenvolvedor FullStack">
      {/* Top Navigation - exactly as in reference */}
      <header className="jm-hero__top">
        <a href="/" className="jm-logo" aria-label="José Mário — início">
          <span className="jm-logo__text">JOSÉ MÁRIO</span>
        </a>

        <nav className="jm-nav" aria-label="Principal">
          <a href="#sobre" className="jm-nav__link jm-nav__link--active">
            SOBRE
            <span className="jm-nav__dot" aria-hidden="true" />
          </a>
          <a href="#skills" className="jm-nav__link">HABILIDADES</a>
          <a href="#projetos" className="jm-nav__link">PROJETOS</a>
          <a href="#contato" className="jm-nav__link">CONTATO</a>
        </nav>

        <button
          ref={menuRef}
          className="jm-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="jm-drawer"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {open && (
        <nav ref={drawerRef} id="jm-drawer" className="jm-drawer" aria-label="Navegação móvel">
          <a href="#sobre" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#skills" onClick={() => setOpen(false)}>Habilidades</a>
          <a href="#projetos" onClick={() => setOpen(false)}>Projetos</a>
          <a href="#contato" onClick={() => setOpen(false)}>Contato</a>
        </nav>
      )}

      {/* Main content - left copy + right visual structure */}
      <div className="jm-hero__inner">
        {/* LEFT COPY — personalizado para portfólio José Mário */}
        <div className="jm-hero__copy">
          <span className="jm-kicker">DISPONÍVEL PARA NOVOS PROJETOS — 2026</span>
          <h1 className="jm-title">
            Olá, eu sou
            <br />
            <span className="jm-title__accent">José Mário.</span>
          </h1>

          <div className="jm-rule" aria-hidden="true" />

          <p className="jm-desc">
            Desenvolvedor <strong>FullStack</strong> (React, TypeScript, Node.js,
            C#/.NET). Transformo ideias em produtos digitais performáticos
            e com acabamento premium — do front ao back, do detalhe ao deploy.
          </p>

          <a href="#projetos" className="jm-cta">
            <span className="jm-cta__circle" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H10.5M10.5 7L7.5 3.5M10.5 7L7.5 10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            VER PROJETOS
          </a>
          <span className="jm-cta__hint">Role para explorar — animação em 40 frames</span>
        </div>

        {/* RIGHT VISUAL STRUCTURE - pure CSS, no images, black background */}
        <div className="jm-visual" aria-hidden="true">
          {/* subtle horizon / mountains silhouettes */}
          <div className="jm-visual__sky" />
          <div className="jm-visual__mountains" />
          <div className="jm-visual__water" />

          {/* monolith arch - structure */}
          <div className="jm-visual__arch">
            <div className="jm-visual__arch-inner" />
            <div className="jm-visual__arch-face" />
          </div>

          {/* planets - CSS circles */}
          <div className="jm-visual__planet jm-visual__planet--lg" />
          <div className="jm-visual__planet jm-visual__planet--sm" />
          <div className="jm-visual__planet jm-visual__planet--xs" />
          <div className="jm-visual__planet jm-visual__planet--dot" />

          {/* orbital ring - thin ellipse */}
          <div className="jm-visual__ring" />

          {/* solitary figure silhouette on horizon */}
          <div className="jm-visual__figure">
            <span className="jm-visual__figure-head" />
            <span className="jm-visual__figure-body" />
            <span className="jm-visual__figure-shadow" />
          </div>

          {/* reflection of arch/planet on water */}
          <div className="jm-visual__reflection" />
        </div>
      </div>

      {/* SCROLL indicator - bottom left as in reference */}
      <div className="jm-scroll" aria-hidden="true">
        <span className="jm-scroll__label">SCROLL</span>
        <span className="jm-scroll__track">
          <span className="jm-scroll__thumb" />
        </span>
      </div>
    </section>
  )
}
