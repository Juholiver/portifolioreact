import type { Project } from '../../data/projects'
import { useIntersectionFadeIn } from '../../hooks/useIntersectionFadeIn'
import { Card, CardMedia, CardBody, CardTitle } from '../ui/Card/Card'
import { Button } from '../ui/Button/Button'
import { Icon, getIconName } from '../ui/Icon/Icon'
import { Section, Grid } from '../ui/Section/Section'
import './Projects.css'

interface ProjectCardProps {
  project: Project
  index: number
}

function hasValidLink(link: string): boolean {
  if (!link || typeof link !== 'string') return false
  try {
    const u = new URL(link)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

function ProjectCard({ project, index }: ProjectCardProps): React.JSX.Element {
  const ref = useIntersectionFadeIn<HTMLDivElement>()
  const linkOk = hasValidLink(project.link)
  return (
    <Card
      ref={ref as React.Ref<HTMLDivElement>}
      variant="project"
      aria-label={project.title}
      style={{ transitionDelay: `${Math.min(index * 70, 280)}ms` } as React.CSSProperties}
    >
      <CardMedia>
        <span className="project-icon-wrap" aria-hidden="true">
          <Icon name={getIconName(project.icon)} />
        </span>
      </CardMedia>
      <CardBody>
        <CardTitle>
          <span title={project.title}>{project.title}</span>
        </CardTitle>
        <p className="project-desc" title={project.description}>{project.description}</p>
        <p className="project-tech" aria-label={`Tecnologias: ${project.technologies}`}>
          <span className="project-tech__label">Stack</span>
          <span className="project-tech__value" title={project.technologies}>{project.technologies}</span>
        </p>
        {linkOk ? (
          <Button as="a" href={project.link} target="_blank" variant="project" size="sm" style={{ marginTop: '1rem' }}>
            {project.linkLabel}
          </Button>
        ) : (
          <Button as="a" href="#contato" variant="project" size="sm" style={{ marginTop: '1rem' }} aria-disabled="true">
            Em breve
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

function EmptyState({ kind }: { kind: 'front' | 'back' }): React.JSX.Element {
  return (
    <div className="projects-empty" role="status" aria-live="polite">
      <p className="projects-empty__title">Nenhum projeto {kind === 'front' ? 'front-end' : 'back-end'} disponível no momento.</p>
      <p className="projects-empty__text">Novos trabalhos estão a caminho — enquanto isso, entre em contato para conversar sobre o seu projeto.</p>
      <Button as="a" href="#contato" variant="primary" size="md">Falar no WhatsApp</Button>
    </div>
  )
}

interface ProjectsSectionProps {
  id: string
  title: string
  projects: Project[]
}

export function ProjectsSection({ id, title, projects }: ProjectsSectionProps): React.JSX.Element {
  const safeProjects = Array.isArray(projects) ? projects.filter((p) => p && p.id && p.title) : []
  const isEmpty = safeProjects.length === 0
  return (
    <Section id={id} title={title}>
      {isEmpty ? (
        <EmptyState kind={id.includes('back') ? 'back' : 'front'} />
      ) : (
        <Grid min="300px" gap="1.75rem">
          {safeProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </Grid>
      )}
    </Section>
  )
}
