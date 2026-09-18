import { useEffect, useRef, useState } from 'react'
import './Header.css'

export function Header(): React.JSX.Element {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = (): void => {
      const threshold = window.innerHeight * 0.82
      const shouldVisible = window.scrollY > threshold
      setVisible(shouldVisible)
      if (!shouldVisible) setMenuOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onClickOutside = (e: MouseEvent): void => {
      const target = e.target as Node
      if (navRef.current && !navRef.current.contains(target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    // prevent background scroll when drawer open (avoid layout shift)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  // close on resize to desktop
  useEffect(() => {
    const onResize = (): void => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <header className={`header ${visible ? 'header--visible' : 'header--hidden'}`} aria-hidden={visible ? undefined : true}>
      <nav ref={navRef} className="header__nav" aria-label="Navegação principal">
        <a href="/" className="header__logo" aria-label="José Mário — início">
          <span className="logo">José Mário</span>
        </a>

        <ul id="header-nav" className="nav-links" data-open={menuOpen ? 'true' : 'false'} aria-hidden={menuOpen ? undefined : visible ? undefined : true}>
          <li><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Habilidades</a></li>
          <li><a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos</a></li>
          <li><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></li>
        </ul>

        <button
          ref={menuButtonRef}
          className="header__menu"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="header-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="header__menu-bar" />
          <span className="header__menu-bar" />
          <span className="header__menu-bar" />
        </button>
      </nav>
    </header>
  )
}
