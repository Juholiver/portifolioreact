import { useState, useRef, useEffect, type FormEvent } from 'react'
import { buildWhatsAppUrl, getValidationErrors, WHATSAPP_LIMITS } from '../../utils/whatsapp'
import { Section } from '../ui/Section/Section'
import { FieldGroup, FieldInput, FieldTextarea, FormError } from '../ui/Field/Field'
import { Button } from '../ui/Button/Button'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import './Contact.css'

const NOME_MAX = WHATSAPP_LIMITS.nomeMax
const MENSAGEM_MAX = WHATSAPP_LIMITS.mensagemMax

function truncateDisplay(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

export function Contact(): React.JSX.Element {
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ nome?: string; mensagem?: string }>({})
  const [invalidField, setInvalidField] = useState<'nome' | 'mensagem' | null>(null)
  const [sending, setSending] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nomeCount = nome.length
  const mensagemCount = mensagem.length
  const nomeRemaining = NOME_MAX - nomeCount
  const mensagemRemaining = MENSAGEM_MAX - mensagemCount

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('contact--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()
    if (sending) return

    const errors = getValidationErrors(nome, mensagem)
    if (errors.nome || errors.mensagem) {
      setFieldErrors(errors)
      const first: 'nome' | 'mensagem' | null = errors.nome ? 'nome' : errors.mensagem ? 'mensagem' : null
      setInvalidField(first)
      setErro(errors.nome ?? errors.mensagem ?? 'Corrija os campos destacados.')
      setSucesso('')
      setFallbackUrl(null)
      if (first) document.getElementById(first)?.focus()
      return
    }

    const nomeTrim = nome.trim().replace(/[\u0000-\u001F\u007F]/g, '')
    const mensagemTrim = mensagem.trim().replace(/[\u0000-\u001F\u007F]/g, '')

    setFieldErrors({})
    setErro('')
    setInvalidField(null)
    setSending(true)
    const url = buildWhatsAppUrl(nomeTrim, mensagemTrim)
    const win = window.open(url, '_blank', 'noopener,noreferrer')

    if (!win) {
      setErro('Seu navegador bloqueou a abertura do WhatsApp. Use o botão abaixo para abrir manualmente.')
      setFallbackUrl(url)
      setSucesso('')
      setSending(false)
      return
    }

    const nomeDisplay = truncateDisplay(nomeTrim, 32)
    setSucesso(`Obrigado, ${nomeDisplay}! Sua mensagem foi preparada para o WhatsApp.`)
    setFallbackUrl(null)
    setNome('')
    setMensagem('')
    window.setTimeout(() => setSending(false), 800)
  }

  return (
    <Section id="contato" title="Contato">
      <div ref={containerRef} className="contact__wrapper">
      <div className="contact__layout">
        <div className="contact__info">
          <p className="contact__intro">Prefere WhatsApp direto? Preencha e abra a conversa em um toque — respondo em até 24h.</p>
          <div className="contact__details">
            <div className="contact__detail-item">
              <span className="contact__detail-label">WhatsApp</span>
              <span className="contact__detail-value">(15) 99191-5880</span>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-label">Localização</span>
              <span className="contact__detail-value">Sorocaba, SP — Brasil</span>
            </div>
          </div>
          <div className="contact__socials">
            <a href="https://github.com/Juholiver" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/junior_oli_?igsh=MW00MTNpOXlkaDM5dQ==" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="contact__form-wrap">
          <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby={erro ? 'contact-error' : sucesso ? 'contact-success' : undefined}>
            <FieldGroup label="Nome" htmlFor="nome" error={fieldErrors.nome}>
              <FieldInput
                type="text"
                id="nome"
                name="nome"
                required
                autoComplete="name"
                placeholder="Seu nome"
                value={nome}
                maxLength={NOME_MAX}
                minLength={2}
                aria-invalid={Boolean(fieldErrors.nome) || invalidField === 'nome'}
                aria-describedby={`${invalidField === 'nome' || fieldErrors.nome ? 'contact-error' : ''} nome-counter`.trim() || undefined}
                invalid={Boolean(fieldErrors.nome) || invalidField === 'nome'}
                disabled={sending}
                onChange={(e) => {
                  setNome(e.target.value.slice(0, NOME_MAX))
                  if (fieldErrors.nome) setFieldErrors((p) => ({ ...p, nome: undefined }))
                  if (invalidField === 'nome' && e.target.value.trim() !== '') setInvalidField(null)
                  if (erro) setErro('')
                  if (fallbackUrl) setFallbackUrl(null)
                }}
              />
              <span id="nome-counter" className={`field-counter ${nomeRemaining < 12 ? 'field-counter--warn' : ''}`} aria-live="polite">
                {nomeCount}/{NOME_MAX}
              </span>
            </FieldGroup>
            <FieldGroup label="Mensagem" htmlFor="mensagem" error={fieldErrors.mensagem}>
              <FieldTextarea
                id="mensagem"
                name="mensagem"
                required
                placeholder="Como posso ajudar? Descreva seu projeto ou oportunidade…"
                rows={4}
                value={mensagem}
                maxLength={MENSAGEM_MAX}
                minLength={10}
                aria-invalid={Boolean(fieldErrors.mensagem) || invalidField === 'mensagem'}
                aria-describedby={`${invalidField === 'mensagem' || fieldErrors.mensagem ? 'contact-error' : ''} mensagem-counter`.trim() || undefined}
                invalid={Boolean(fieldErrors.mensagem) || invalidField === 'mensagem'}
                disabled={sending}
                onChange={(e) => {
                  setMensagem(e.target.value.slice(0, MENSAGEM_MAX))
                  if (fieldErrors.mensagem) setFieldErrors((p) => ({ ...p, mensagem: undefined }))
                  if (invalidField === 'mensagem' && e.target.value.trim() !== '') setInvalidField(null)
                  if (erro) setErro('')
                  if (fallbackUrl) setFallbackUrl(null)
                }}
              />
              <span id="mensagem-counter" className={`field-counter ${mensagemRemaining < 40 ? 'field-counter--warn' : ''}`} aria-live="polite">
                {mensagemCount}/{MENSAGEM_MAX} {mensagemRemaining < 50 && mensagemRemaining >= 0 ? `· restam ${mensagemRemaining}` : ''}
              </span>
            </FieldGroup>
            {erro !== '' && (
              <FormError id="contact-error">
                {erro}
                {fallbackUrl && (
                  <>
                    {' '}
                    <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="contact-fallback-link">
                      Abrir WhatsApp manualmente
                    </a>
                  </>
                )}
              </FormError>
            )}
            {sucesso !== '' && (
              <p id="contact-success" className="contact-success" role="status" aria-live="polite">
                {sucesso}
              </p>
            )}
            <Button type="submit" variant="submit" size="md" block disabled={sending || nomeRemaining < 0 || mensagemRemaining < 0} aria-busy={sending}>
              {sending ? 'Abrindo WhatsApp…' : 'Enviar Mensagem'}
            </Button>
            <p className="contact-meta">Ao enviar, você abrirá o WhatsApp com a mensagem pré-preenchida — nenhum dado é armazenado neste site.</p>
          </form>
        </div>
      </div>
      </div>
    </Section>
  )
}
