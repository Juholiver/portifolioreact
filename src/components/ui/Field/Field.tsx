import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import './Field.css'

interface FieldGroupProps {
  label: string
  htmlFor: string
  children: ReactNode
  error?: string
}

export function FieldGroup({ label, htmlFor, children, error }: FieldGroupProps): React.JSX.Element {
  return (
    <div className="ui-field-group">
      <label htmlFor={htmlFor} className="ui-field__label">{label}</label>
      {children}
      {error && <p className="ui-field__error" role="alert">{error}</p>}
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
export function FieldInput({ invalid, className = '', ...rest }: InputProps): React.JSX.Element {
  return <input className={`ui-field ${invalid ? 'ui-field--invalid' : ''} ${className}`.trim()} aria-invalid={invalid} {...rest} />
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
export function FieldTextarea({ invalid, className = '', ...rest }: TextareaProps): React.JSX.Element {
  return <textarea className={`ui-field ui-field--textarea ${invalid ? 'ui-field--invalid' : ''} ${className}`.trim()} aria-invalid={invalid} {...rest} />
}

export function FormError({ children, id }: { children: ReactNode; id?: string }): React.JSX.Element {
  return <p id={id} className="ui-form-error" role="alert">{children}</p>
}
