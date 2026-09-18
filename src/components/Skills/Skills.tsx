import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  icon: IconType
  iconColor: string
  category: string
  levelLabel: string
  level: number
  description: string
  tags: string[]
  accent: string
}

const SKILLS: Skill[] = [
  {
    name: 'React',
    icon: SiReact,
    iconColor: '#4FD1F5',
    category: 'Frontend',
    levelLabel: 'Avançado',
    level: 5,
    description: 'Biblioteca para interfaces interativas e performáticas.',
    tags: ['Components', 'Hooks', 'Context'],
    accent: '#d8c5a0',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    iconColor: '#4B9CD3',
    category: 'Frontend / Backend',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Linguagem tipada para aplicações modernas.',
    tags: ['TS', 'Type Safety', 'OOP', 'Modern JS'],
    accent: '#c9a227',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    iconColor: '#E8C547',
    category: 'Frontend / Backend',
    levelLabel: 'Avançado',
    level: 5,
    description: 'Base dinâmica de interfaces e APIs web.',
    tags: ['ES2020', 'DOM', 'Async'],
    accent: '#67E8F9',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    iconColor: '#EAF6FF',
    category: 'Frontend',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Framework React para apps de alta performance.',
    tags: ['SSR', 'SSG', 'App Router'],
    accent: '#EAF6FF',
  },
  {
    name: 'Angular',
    icon: SiAngular,
    iconColor: '#D96C85',
    category: 'Frontend',
    levelLabel: 'Intermediário',
    level: 3,
    description: 'Framework completo para SPAs corporativas.',
    tags: ['Components', 'RxJS', 'CLI'],
    accent: '#d8c5a0',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    iconColor: '#7BC96F',
    category: 'Backend',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Ambiente de execução JavaScript no servidor.',
    tags: ['Express', 'APIs', 'Middleware'],
    accent: '#d8c5a0',
  },
  {
    name: '.NET',
    icon: SiDotnet,
    iconColor: '#8B7CF6',
    category: 'Backend',
    levelLabel: 'Intermediário',
    level: 3,
    description: 'Framework robusto para aplicações corporativas.',
    tags: ['C#', 'ASP.NET Core', 'APIs'],
    accent: '#c9a227',
  },
  {
    name: 'Python',
    icon: SiPython,
    iconColor: '#7FB3D5',
    category: 'Backend',
    levelLabel: 'Intermediário',
    level: 3,
    description: 'Scripts, automações e backends versáteis.',
    tags: ['Scripts', 'APIs', 'Automação'],
    accent: '#d8c5a0',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    iconColor: '#5B8DD9',
    category: 'Banco de Dados',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Banco relacional poderoso e confiável.',
    tags: ['SQL', 'Modelagem', 'Performance'],
    accent: '#d8c5a0',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    iconColor: '#5FB768',
    category: 'Banco de Dados',
    levelLabel: 'Intermediário',
    level: 3,
    description: 'NoSQL flexível para dados dinâmicos.',
    tags: ['Atlas', 'Aggregations', 'ODM'],
    accent: '#67E8F9',
  },
  {
    name: 'Git / GitHub',
    icon: SiGithub,
    iconColor: '#EAF6FF',
    category: 'Ferramentas',
    levelLabel: 'Avançado',
    level: 5,
    description: 'Controle de versão e colaboração em equipe.',
    tags: ['Git', 'GitHub', 'CI/CD'],
    accent: '#EAF6FF',
  },
  {
    name: 'REST API',
    icon: TbApi,
    iconColor: '#67E8F9',
    category: 'Backend',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Integração e contratos HTTP bem definidos.',
    tags: ['REST', 'JWT', 'Docs'],
    accent: '#d8c5a0',
  },
  {
    name: 'Vercel',
    icon: SiVercel,
    iconColor: '#EAF6FF',
    category: 'Deploy',
    levelLabel: 'Avançado',
    level: 4,
    description: 'Deploy contínuo e previews para apps web.',
    tags: ['Deploy', 'Preview', 'Edge'],
    accent: '#67E8F9',
  },
  {
    name: 'Docker',
    icon: SiDocker,
    iconColor: '#4FA8E8',
    category: 'DevOps',
    levelLabel: 'Intermediário',
    level: 3,
    description: 'Containers para ambientes consistentes.',
    tags: ['Containers', 'Compose', 'Images'],
    accent: '#d8c5a0',
  },
]

function offsetOf(index: number, active: number, total: number): number {
  let d = (index - active) % total
  if (d > total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

function SkillCard({
  skill,
  offset,
  zIndex,
  onSelect,
}: {
  skill: Skill
  offset: number
  zIndex: number
  onSelect: () => void
}): React.JSX.Element {
  const Icon = skill.icon
  const cls =
    offset === 0 ? 'is-center' : Math.abs(offset) === 1 ? 'is-near' : Math.abs(offset) === 2 ? 'is-far' : 'is-hidden'
  return (
    <article
      className={`skill3d-card ${cls}`}
      data-offset={offset}
      style={{ zIndex }}
      aria-hidden={offset !== 0}
      onClick={() => offset !== 0 && onSelect()}
    >
      <span className="skill3d-pill">{skill.category}</span>
      <div
        className="skill3d-badge"
        style={{ '--accent': skill.accent } as CSSProperties}
        aria-hidden="true"
      >
        <Icon className="skill3d-icon" style={{ color: skill.iconColor }} />
      </div>
      <h3 className="skill3d-name">{skill.name}</h3>
      <p className="skill3d-desc">{skill.description}</p>
      <div className="skill3d-level" aria-label={`Nível ${skill.levelLabel}`}>
        <div className="skill3d-bars">
          {[1, 2, 3, 4, 5].map((bar) => (
            <span key={bar} className={bar <= skill.level ? 'on' : ''} />
          ))}
        </div>
        <span className="skill3d-level-label">{skill.levelLabel}</span>
      </div>
      <div className="skill3d-tags">
        {skill.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  )
}

export function Skills(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(2)
  const total = SKILLS.length

  const goTo = useCallback(
    (index: number) => setActive(((index % total) + total) % total),
    [total],
  )
  const prev = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => prev - 1)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills3d-bg',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      )
      gsap.fromTo(
        '.skill3d-card',
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
      id="skills"
      className="skills3d"
      aria-label="Habilidades"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="skills3d-bg" aria-hidden="true" />
      <div className="skills3d-veil" aria-hidden="true" />

      <div className="skills3d-content">
        <div className="skills3d-header-box">
          <p className="skills3d-kicker">SKILLS</p>
          <h2 className="skills3d-title">Minhas <span className="skills3d-title-accent">habilidades</span></h2>
          <p className="skills3d-sub">Tecnologias que utilizo para construir aplicações modernas.</p>
          <p className="skills3d-formation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{verticalAlign: '-2px', marginRight: '6px'}}>
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor" opacity="0.7"/>
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="currentColor" opacity="0.5"/>
            </svg>
            Tecnólogo em <strong>Análise e Desenvolvimento de Sistemas</strong>
          </p>
        </div>

        <div className="skills3d-stage">
          <button type="button" className="skills3d-arrow skills3d-arrow--prev" onClick={prev} aria-label="Tecnologia anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="skills3d-track">
            {SKILLS.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                offset={offsetOf(index, active, total)}
                zIndex={20 - Math.abs(offsetOf(index, active, total))}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>

          <button type="button" className="skills3d-arrow skills3d-arrow--next" onClick={next} aria-label="Próxima tecnologia">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="skills3d-indicator">
          <div className="skills3d-dots" role="tablist" aria-label="Selecionar tecnologia">
            {SKILLS.map((skill, index) => (
              <button
                key={skill.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={skill.name}
                className={index === active ? 'on' : ''}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <span className="skills3d-counter">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
