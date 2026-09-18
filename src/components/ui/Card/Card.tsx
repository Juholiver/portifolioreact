import { forwardRef, type ReactNode, type HTMLAttributes } from 'react'
import './Card.css'

type Variant = 'skill' | 'project' | 'glass' | 'formacao'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant
  interact?: boolean
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'skill', interact = true, children, className = '', ...rest },
  ref,
) {
  const classes = ['ui-card', `ui-card--${variant}`, interact ? 'ui-card--interact' : '', className].filter(Boolean).join(' ')
  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  )
})

interface CardMediaProps { children: ReactNode; className?: string }
export function CardMedia({ children, className = '' }: CardMediaProps): React.JSX.Element {
  return <div className={`ui-card__media ${className}`.trim()} aria-hidden="true">{children}</div>
}

interface CardBodyProps { children: ReactNode; className?: string }
export function CardBody({ children, className = '' }: CardBodyProps): React.JSX.Element {
  return <div className={`ui-card__body ${className}`.trim()}>{children}</div>
}

interface CardTitleProps { children: ReactNode; as?: 'h3' | 'h2' | 'p' }
export function CardTitle({ children, as: Tag = 'h3' }: CardTitleProps): React.JSX.Element {
  return <Tag className="ui-card__title">{children}</Tag>
}

export function CardText({ children }: { children: ReactNode }): React.JSX.Element {
  return <p className="ui-card__text">{children}</p>
}
