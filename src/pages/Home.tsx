import { useEffect } from 'react'
import { About } from '../components/About/About'
import { Chatbot } from '../components/Chatbot/Chatbot'
import { CinematicScrollCanvas } from '../components/CinematicScrollCanvas/CinematicScrollCanvas'
import { Contact } from '../components/Contact/Contact'

import { Hero } from '../components/Hero/Hero'
import { ProjectsGallery } from '../components/Projects/ProjectsGallery'
import { Skills } from '../components/Skills/Skills'

import { ErrorBoundary } from '../components/ui/ErrorBoundary/ErrorBoundary'
import './Home.css'

export function Home(): React.JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Canvas cinematográfico fixo — background global */}
      <CinematicScrollCanvas />

      {/* Vinheta atmosférica global */}
      <div className="global-vignette" aria-hidden="true" />

      <a href="#sobre" className="skip-link">Pular para conteúdo</a>

      <main className="portfolio-content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProjectsGallery />
        </ErrorBoundary>
        <ErrorBoundary>
          <Chatbot />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
        
      </main>
    </>
  )
}
