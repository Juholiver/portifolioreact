import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Variant = 'primary' | 'project' | 'submit' | 'ghost' | 'blue' | 'pill' | 'jm'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  block?: boolean
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps): React.JSX.Element {
  const { variant = 'primary', size = 'md', block = false, children, leftIcon, rightIcon, className = '', as, ...rest } = props as ButtonProps & { className?: string; as?: string }

  const classes = ['ui-btn', `ui-btn--${variant}`, `ui-btn--${size}`, block ? 'ui-btn--block' : '', className].filter(Boolean).join(' ')

  const content = (
    <>
      {leftIcon && <span className="ui-btn__icon" aria-hidden="true">{leftIcon}</span>}
      <span className="ui-btn__label">{children}</span>
      {rightIcon && <span className="ui-btn__icon" aria-hidden="true">{rightIcon}</span>}
    </>
  )

  if (as === 'a') {
    const { href, target, rel, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    const isExternal = target === '_blank'
    return (
      <a href={href} target={target} rel={isExternal ? 'noopener noreferrer' : rel} className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

/* EosAI circle CTA — kept as separate composition for hero semantics */
export function EosaiCTA({ href, children, hint }: { href: string; children: ReactNode; hint?: string }): React.JSX.Element {
  return (
    <div className="ui-jm-cta-wrap">
      <a href={href} className="ui-jm-cta">
        <span className="ui-jm-cta__circle" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H10.5M10.5 7L7.5 3.5M10.5 7L7.5 10.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {children}
      </a>
      {hint && <span className="ui-jm-cta__hint">{hint}</span>}
    </div>
  )
}
