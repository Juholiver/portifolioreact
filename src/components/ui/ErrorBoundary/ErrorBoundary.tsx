import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div
          role="alert"
          style={{
            maxWidth: 640,
            margin: '3rem auto',
            padding: '2rem 1.5rem',
            borderRadius: 10,
            border: '1px solid #3a3227',
            background: '#1d1915',
            color: '#ece5d8',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          <p style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 12 }}>
            Algo deu errado
          </p>
          <p style={{ color: '#a89e8d', fontSize: '0.92rem', marginBottom: 18, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            O conteúdo desta seção não pôde ser carregado. Tente recarregar a página.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: 2,
              border: '1px solid #6b5a33',
              background: 'transparent',
              color: '#e3c15c',
              fontFamily: 'Cinzel, serif',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontSize: '0.78rem',
              cursor: 'pointer',
            }}
          >
            Tentar novamente
          </button>
          {this.state.error?.message && (
            <p style={{ marginTop: 14, fontSize: '0.72rem', color: 'rgba(236,229,216,0.38)', overflowWrap: 'break-word' }}>
              {this.state.error.message.slice(0, 180)}
            </p>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
