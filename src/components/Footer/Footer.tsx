import { useRef, useEffect } from 'react'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import './Footer.css'

export function Footer(): React.JSX.Element {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('footer--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">José Mário</span>
          <span className="footer__role">Desenvolvedor Full Stack Júnior</span>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/Juholiver" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://www.instagram.com/junior_oli_?igsh=MW00MTNpOXlkaDM5dQ==" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">&copy; {new Date().getFullYear()} José Mário. Todos os direitos reservados.</p>
          <p className="footer__build">Construído com React, TypeScript e muita dedicação.</p>
        </div>
      </div>
    </footer>
  )
}
