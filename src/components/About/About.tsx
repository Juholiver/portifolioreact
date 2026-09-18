import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedinIn, FaCode } from 'react-icons/fa'
import { Button } from '../ui/Button/Button'
import perfilImg from '../../assets/PerfilTerno.png'
import curriculoPdf from '../../doc/curriculo-attt-2026.pdf'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export function About(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const bgFrontRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const bgFront = bgFrontRef.current
    const photo = photoRef.current
    const content = contentRef.current
    const card = cardRef.current
    const actions = actionsRef.current

    if (!section || !bg || !bgFront || !photo || !content || !card || !actions) {
      return
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([bg, bgFront], { x: 0, y: 0, scale: 1, opacity: 1 })
        gsap.set([photo, content, card, actions], { x: 0, y: 0, opacity: 1 })
        return
      }

      const isMobile = window.innerWidth <= 768
      const backMovement = isMobile ? 4 : 7
      const frontMovement = isMobile ? 7 : 12

      gsap.fromTo(bg,
        { yPercent: -backMovement },
        {
          yPercent: backMovement,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      )

      gsap.fromTo(bgFront,
        { yPercent: -frontMovement },
        {
          yPercent: frontMovement,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      )

      gsap.fromTo(photo,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(actions,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="about-hud"
      aria-label="Sobre mim"
    >
      <div ref={bgRef} className="about-hud__parallax-bg" aria-hidden="true" />
      <div ref={bgFrontRef} className="about-hud__parallax-fg" aria-hidden="true" />
      <div className="about-hud__overlay" aria-hidden="true" />

      <div className="about-hud__layout">
        {/* FOTO + SOCIAL */}
        <div ref={photoRef} className="about-hud__photo-area">
          <div className="about-hud__social">
            <a href="https://github.com/Juholiver" target="_blank" rel="noopener noreferrer" className="about-hud__social-link" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/" target="_blank" rel="noopener noreferrer" className="about-hud__social-link" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <span className="about-hud__social-link about-hud__social-link--code" aria-label="Code">
              <FaCode />
            </span>
            <span className="about-hud__social-label">FULL STACK DEVELOPER</span>
          </div>

          <div className="about-hud__photo-frame">
            <span className="about-hud__photo-corner about-hud__photo-corner--tl" />
            <span className="about-hud__photo-corner about-hud__photo-corner--tr" />
            <span className="about-hud__photo-corner about-hud__photo-corner--bl" />
            <span className="about-hud__photo-corner about-hud__photo-corner--br" />
            <img
              src={perfilImg}
              alt="José Mário — Desenvolvedor FullStack"
              className="about-hud__photo"
              loading="lazy"
            />
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div ref={contentRef} className="about-hud__content">
          <span className="about-hud__kicker">SOBRE MIM</span>

          <h2 className="about-hud__title">
            Transformando ideias
            <br />
            <span className="about-hud__title-accent">em soluções digitais.</span>
          </h2>

          

          <div className="about-hud__techs">
            <div className="about-hud__tech">
              <FaCode className="about-hud__tech-icon" />
              <div className="about-hud__tech-info">
                <span className="about-hud__tech-label">Full Stack</span>
                <span className="about-hud__tech-value">Developer</span>
              </div>
            </div>
            <div className="about-hud__tech">
              <FaCode className="about-hud__tech-icon" />
              <div className="about-hud__tech-info">
                <span className="about-hud__tech-label">React / Angular</span>
                <span className="about-hud__tech-value">Next.js</span>
              </div>
            </div>
            <div className="about-hud__tech">
              <FaCode className="about-hud__tech-icon" />
              <div className="about-hud__tech-info">
                <span className="about-hud__tech-label">Node.js / Express</span>
                <span className="about-hud__tech-value">.NET / ASP.NET</span>
              </div>
            </div>
            <div className="about-hud__tech">
              <FaCode className="about-hud__tech-icon" />
              <div className="about-hud__tech-info">
                <span className="about-hud__tech-label">Databases</span>
                <span className="about-hud__tech-value">MongoDB / PostgreSQL</span>
              </div>
            </div>
          </div>

          <div ref={actionsRef} className="about-hud__actions">
            <Button
              as="a"
              href="#projetos"
              variant="primary"
              size="md"
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              rightIcon={null}
            >
              VER PROJETOS
            </Button>

            <Button
              as="a"
              href={curriculoPdf}
              download="Curriculo-Jose-Mario-2026.pdf"
              variant="ghost"
              size="md"
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              rightIcon={null}
            >
              BAIXAR CURRÍCULO
            </Button>
          </div>
        </div>

        {/* CARD SOBRE MIM */}
        <div ref={cardRef} className="about-hud__card">
          <div className="about-hud__card-header">
            <span className="about-hud__card-kicker">SOBRE MIM</span>
            <span className="about-hud__card-deco" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
          </div>

          <div className="about-hud__card-body">
            <p>
              Sou José Oliveira, Desenvolvedor Full Stack Júnior,
              apaixonado por tecnologia e pela criação de aplicações
              que transformam ideias em experiências digitais
              funcionais, modernas e escaláveis.
            </p>
            <p>
              Minha trajetória na tecnologia foi construída através
              de muita prática, estudo e resolução de problemas.
              Antes de entrar no desenvolvimento de software, atuei
              em áreas que exigiam disciplina, atenção aos detalhes,
              responsabilidade e capacidade de resolver problemas
              sob pressão.
            </p>
            <p>
              Hoje, direciono essa experiência para o desenvolvimento
              de software, trabalhando principalmente com React,
              TypeScript, JavaScript, Node.js e .NET, além de bancos
              de dados relacionais e NoSQL.
            </p>
            <p>
              Tenho formação em Análise e Desenvolvimento de Sistemas
              e atualmente continuo evoluindo meus conhecimentos em
              Engenharia de Software, buscando escrever código cada
              vez mais limpo e organizado.
            </p>
          </div>

          <div className="about-hud__card-footer">
            <span className="about-hud__card-divider" />
            <span className="about-hud__card-tag">FULL STACK · SOFTWARE · INOVAÇÃO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
