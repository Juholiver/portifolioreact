import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons'
import {
  FaAppleAlt,
  FaCloudSun,
  FaCode,
  FaComments,
  FaDatabase,
  FaDumbbell,
  FaHamburger,
  FaHeartbeat,
  FaLanguage,
  FaPalette,
  FaPaw,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaStore,
  FaTasks,
  FaUtensils,
} from 'react-icons/fa'
import { backEndProjects, frontEndProjects, type Project } from '../../data/projects'
import './ProjectsGallery.css'

gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  project: Project
  icon: IconType
  category: string
}

function find(id: string): Project {
  const all = [...frontEndProjects, ...backEndProjects]
  const found = all.find((p) => p.id === id)
  if (!found) throw new Error(`Projeto não encontrado: ${id}`)
  return found
}

const GALLERY: GalleryItem[] = [
  { project: find('winterforge'), icon: FaDumbbell, category: 'Full Stack' },
  { project: find('sfp'), icon: FaStore, category: 'Full Stack' },
  { project: find('provet'), icon: FaPaw, category: 'SaaS' },
  { project: find('analisador'), icon: FaCode, category: 'IA' },
  { project: find('academia-ia'), icon: FaHeartbeat, category: 'IA' },
  { project: find('api-auth-academia'), icon: FaShieldAlt, category: 'Backend' },
  {
    project: {
      id: 'gabizinha-ia',
      title: 'Gabizinha IA',
      description: 'Assistente inteligente com IA para atendimento e respostas automáticas.',
      technologies: 'IA, Chat, Automação',
      link: '',
      linkLabel: 'Ver Projeto',
      icon: 'robot',
    },
    icon: FaRobot,
    category: 'IA',
  },
  {
    project: {
      id: 'chatbox',
      title: 'ChatBox',
      description: 'Interface de chat em tempo real com experiência fluida e responsiva.',
      technologies: 'Chat, Tempo real, UI',
      link: '',
      linkLabel: 'Ver Projeto',
      icon: 'chat',
    },
    icon: FaComments,
    category: 'Frontend',
  },
  {
    project: {
      id: 'dieta-ia',
      title: 'Dieta com IA',
      description: 'Planos alimentares personalizados gerados por inteligência artificial.',
      technologies: 'IA, Nutrição, UI',
      link: '',
      linkLabel: 'Ver Projeto',
      icon: 'food',
    },
    icon: FaAppleAlt,
    category: 'IA',
  },
  { project: find('hamburgueria'), icon: FaHamburger, category: 'Frontend' },
  { project: find('kanban'), icon: FaTasks, category: 'Frontend' },
  { project: find('cardapio'), icon: FaUtensils, category: 'Frontend' },
  { project: find('previsao'), icon: FaCloudSun, category: 'Frontend' },
  { project: find('translator'), icon: FaLanguage, category: 'Frontend' },
  { project: find('fundo'), icon: FaPalette, category: 'IA' },
  { project: find('api-auth'), icon: FaServer, category: 'Backend' },
  { project: find('api-exercicios'), icon: FaDatabase, category: 'Backend' },
]

function offsetOf(index: number, active: number, total: number): number {
  let d = (index - active) % total
  if (d > total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

function isGithubLink(link: string): boolean {
  return link.includes('github.com')
}

function ProjectCard({
  item,
  offset,
  zIndex,
  onSelect,
}: {
  item: GalleryItem
  offset: number
  zIndex: number
  onSelect: () => void
}): React.JSX.Element {
  const Icon = item.icon
  const { project } = item
  const hasLink = project.link.length > 0
  const github = hasLink && isGithubLink(project.link)
  const tags = project.technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4)
  const cls =
    offset === 0 ? 'is-center' : Math.abs(offset) === 1 ? 'is-near' : Math.abs(offset) === 2 ? 'is-far' : 'is-hidden'
  return (
    <article
      className={`project3d-card ${cls}`}
      data-offset={offset}
      style={{ zIndex }}
      aria-hidden={offset !== 0}
      aria-label={project.title}
      onClick={() => offset !== 0 && onSelect()}
    >
      <span className="project3d-pill">{item.category}</span>
      <div
        className="project3d-badge"
        style={{ '--accent': item.category === 'IA' ? '#c9a227' : '#d8c5a0' } as CSSProperties}
        aria-hidden="true"
      >
        <Icon className="project3d-icon" />
      </div>
      <h3 className="project3d-name">{project.title}</h3>
      <p className="project3d-desc">{project.description}</p>
      <div className="project3d-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className={`project3d-status ${hasLink ? 'done' : 'soon'}`}>
        <span className="project3d-status-dot" aria-hidden="true" />
        {hasLink ? 'Concluído' : 'Em breve'}
      </p>
      {hasLink && (
        <div className="project3d-actions">
          {!github && (
            <a
              className="project3d-btn project3d-btn--primary"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {project.linkLabel}
            </a>
          )}
          {github && (
            <a
              className="project3d-btn project3d-btn--ghost"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Código de ${project.title} no GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export function ProjectsGallery(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const touchX = useRef<number | null>(null)
  const [active, setActive] = useState(0)
  const total = GALLERY.length

  const goTo = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total],
  )
  const prev = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => prev + 1)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects3d-bg',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
      gsap.fromTo(
        '.project3d-card',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="projects3d"
      aria-label="Projetos"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="projects3d-bg" aria-hidden="true" />
      <div className="projects3d-veil" aria-hidden="true" />

      <div className="projects3d-content">
        <div className="projects3d-header-box">
          <p className="projects3d-kicker">PROJETOS</p>
          <h2 className="projects3d-title">Meus <span className="projects3d-title-accent">projetos</span></h2>
          <p className="projects3d-sub">
            Projetos desenvolvidos para transformar ideias em aplicações modernas, funcionais e escaláveis.
          </p>
          <p className="projects3d-context">Full Stack • Frontend • Backend • APIs • IA</p>
        </div>

        <div className="projects3d-stage">
          <button type="button" className="projects3d-arrow projects3d-arrow--prev" onClick={prev} aria-label="Projeto anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="projects3d-track"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              touchX.current = null
              if (dx > 40) prev()
              else if (dx < -40) next()
            }}
          >
            {GALLERY.map((item, index) => (
              <ProjectCard
                key={item.project.id}
                item={item}
                offset={offsetOf(index, active, total)}
                zIndex={30 - Math.abs(offsetOf(index, active, total))}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>

          <button type="button" className="projects3d-arrow projects3d-arrow--next" onClick={next} aria-label="Próximo projeto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="projects3d-indicator">
          <div className="projects3d-dots" role="tablist" aria-label="Selecionar projeto">
            {GALLERY.map((item, index) => (
              <button
                key={item.project.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={item.project.title}
                className={index === active ? 'on' : ''}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <span className="projects3d-counter">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
