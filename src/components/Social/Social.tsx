import { Button } from '../ui/Button/Button'
import './Social.css'

export function Social(): React.JSX.Element {
  return (
    <section className="social-media" aria-label="Redes sociais">
      <Button as="a" href="https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/" target="_blank" variant="pill" size="md">
        LinkedIn
      </Button>
      <Button as="a" href="https://github.com/Juholiver" target="_blank" variant="pill" size="md">
        GitHub
      </Button>
      <Button as="a" href="https://www.instagram.com/junior_oli_?igsh=MW00MTNpOXlkaDM5dQ==" target="_blank" variant="pill" size="md">
        Instagram
      </Button>
    </section>
  )
}
