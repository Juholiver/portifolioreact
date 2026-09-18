export const WHATSAPP_PHONE = '5515991915880'
export const WHATSAPP_LIMITS = {
  nomeMax: 80,
  mensagemMax: 600,
  urlMax: 4000,
} as const

function sanitizeForWhatsApp(input: string): string {
  return input.replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim()
}

function truncateForDisplay(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

export function buildWhatsAppUrl(nome: string, mensagem: string): string {
  const telefone = WHATSAPP_PHONE
  const nomeSafe = truncateForDisplay(sanitizeForWhatsApp(nome), WHATSAPP_LIMITS.nomeMax)
  const mensagemSafe = truncateForDisplay(sanitizeForWhatsApp(mensagem), WHATSAPP_LIMITS.mensagemMax)
  const texto = `Olá, meu nome é ${nomeSafe}, ${mensagemSafe}`
  let mensagemFormatada = encodeURIComponent(texto)
  let url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagemFormatada}`
  if (url.length > WHATSAPP_LIMITS.urlMax) {
    const budget = WHATSAPP_LIMITS.urlMax - `https://api.whatsapp.com/send?phone=${telefone}&text=`.length
    while (mensagemFormatada.length > budget && mensagemSafe.length > 40) {
      const shorter = truncateForDisplay(mensagemSafe.slice(0, -20), WHATSAPP_LIMITS.mensagemMax)
      mensagemFormatada = encodeURIComponent(`Olá, meu nome é ${nomeSafe}, ${shorter}`)
      if (mensagemFormatada.length <= budget) break
      // safety escape if still too long
      if (shorter.length <= 40) break
    }
    url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagemFormatada}`
  }
  return url
}

export function getValidationErrors(nome: string, mensagem: string): { nome?: string; mensagem?: string } {
  const errors: { nome?: string; mensagem?: string } = {}
  const n = sanitizeForWhatsApp(nome)
  const m = sanitizeForWhatsApp(mensagem)
  if (n.length < 2) errors.nome = 'Informe seu nome (mín. 2 caracteres).'
  else if (n.length > WHATSAPP_LIMITS.nomeMax) errors.nome = `Nome muito longo — máx. ${WHATSAPP_LIMITS.nomeMax} caracteres.`
  if (m.length < 10) errors.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  else if (m.length > WHATSAPP_LIMITS.mensagemMax) errors.mensagem = `Mensagem muito longa — máx. ${WHATSAPP_LIMITS.mensagemMax} caracteres.`
  return errors
}
