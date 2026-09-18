import type { ReactNode, HTMLAttributes } from 'react'
import './Section.css'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string
  kicker?: string
  children: ReactNode
  maxWidth?: 'default' | 'narrow' | 'full'
}

export function Section({ title, kicker, children, maxWidth = 'default', className = '', id, ...rest }: SectionProps): React.JSX.Element {
  const classes = ['ui-section', `ui-section--${maxWidth}`, className].filter(Boolean).join(' ')
  return (
    <section id={id} className={classes} {...rest}>
      {kicker && <span className="ui-section__kicker">{kicker}</span>}
      {title && <h2 className="ui-section__title">{title}</h2>}
      <div className="ui-section__content">{children}</div>
    </section>
  )
}

export function Grid({ children, min = '200px', gap = '1.5rem', className = '' }: { children: ReactNode; min?: string; gap?: string; className?: string }): React.JSX.Element {
  return (
    <div className={`ui-grid ${className}`.trim()} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`, gap }}>
      {children}
    </div>
  )
}
