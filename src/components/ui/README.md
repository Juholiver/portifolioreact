# Design System — Forja & Pergaminho

Extraído em 2026-09-11 via `impeccable extract`. Consolidado de `src/styles/tokens.css` + `DESIGN.md` + uso real em 14 project cards + 6 skill cards.

## Tokens

Fonte única: `src/styles/tokens.css`

| Categoria | Tokens | Uso |
|---|---|---|
| Superfície | `--bg`, `--bg-secondary`, `--bg-deep`, `--bg-alternate*`, `--surface`, `--field`, `--surface-glass` | fundos, cards, inputs |
| Texto | `--text`, `--text-muted`, `--gold`, `--gold-bright`, `--gold-sand`, `--ink-on-gold`, `--blue-ice`, `--blue-cinematic`, `--ice-white` | contraste AA 15.6:1 / 8.1:1 |
| Borda | `--border`, `--border-strong`, `--border-glass*`, `--border-hairline*` | hairline 1px |
| Sombra | `--shadow`, `--shadow-text`, `--glow-gold`, `--shadow-glass`, `--shadow-blue`, `--glow-ice` | depth premium |
| Raio | `--radius-sm` 2px, `--radius-md` 8px, `--radius-lg` 10px, `--radius-xl` 16px, `--radius-pill` 50px | hierarquia de canto |
| Espaço | `--space-sm/md/lg/xl/2xl/3xl`, `--section-pad-y/x` | ritmo 80px entre seções |
| Tipo | `--font-display` Cinzel 700, `--font-body` Inter, `--tracking-*`, `--text-*` | display/headline/title/body/label |
| Layout | `--header-h` 72px, `--content-max` 1200px, `--about-max` 760px | header fixo + container |
| Motion | `--ease-out`, `--dur-fast/normal/slow` | GSAP power2/3.out |

**Regras nomeadas (DESIGN.md):**
- Ouro contido ≤10% viewport
- No neon — brasa/sangue terrosos
- Tracking é hierarquia (0.06→0.38em)
- Cinzel sempre uppercase + tracking

## Components

### Button `src/components/ui/Button/Button.tsx`
```tsx
import { Button, EosaiCTA } from '@/components/ui/Button/Button'
<Button variant="primary" size="lg">Ver Projetos</Button>
<Button variant="project" size="sm" as="a" href={url} target="_blank">Ver Projeto</Button>
<Button variant="submit" block type="submit">Enviar Mensagem</Button>
<Button variant="blue" size="md" leftIcon={<>‹/›</>} rightIcon="→">VER PROJETOS</Button>
<Button variant="ghost" size="md">BAIXAR CURRÍCULO</Button>
<Button variant="pill" size="md" as="a" href="...">LinkedIn</Button>
<EosaiCTA href="#projetos-front" hint="Role para explorar">VER PROJETOS</EosaiCTA>
```
Variants: `primary` (transparent→gold), `project` (card CTA), `submit` (gradient block), `ghost` (glass blue), `blue` (gradient cyan), `pill` (social). Sizes `sm` 40px, `md` 38px, `lg` 48px.
A11y: focus-visible 3px `--gold-bright`, disabled opacity 0.5, external `rel` auto.

### Card `src/components/ui/Card/Card.tsx`
```tsx
import { Card, CardMedia, CardBody, CardTitle, CardText } from '@/components/ui/Card/Card'
<Card variant="skill"><CardTitle>Front-end</CardTitle><CardText>React...</CardText></Card>
<Card variant="project" ref={fadeRef}><CardMedia>🛠️</CardMedia><CardBody>…</CardBody></Card>
<Card variant="glass">…</Card> // About — blur 14px + blue glow
<Card variant="formacao"><CardTitle>Tecnólogo…</CardTitle></Card>
```
Interação: `interact` lift `-6px` + `--shadow`. Glass usa `--shadow-glass` + `backdrop-filter`.

### Field `src/components/ui/Field/Field.tsx`
```tsx
import { FieldGroup, FieldInput, FieldTextarea, FormError } from '@/components/ui/Field/Field'
<FieldGroup label="Nome" htmlFor="nome"><FieldInput invalid={…} /></FieldGroup>
<FieldTextarea invalid={…} />
<FormError>Por favor, preencha…</FormError>
```
Estilo: `background: --field`, `border: --border`, focus `--gold`, caret `--gold-bright`, selection `--gold`, autofill preservado.

### Section / Grid `src/components/ui/Section/Section.tsx`
```tsx
import { Section, Grid } from '@/components/ui/Section/Section'
<Section id="habilidades" title="Habilidades"><Grid min="200px" gap="1.5rem">…</Grid></Section>
<Section id="projetos-front" title="Projetos Front-End"><Grid min="300px" gap="1.75rem">…</Grid></Section>
```
Reutiliza `.section` full-bleed + `scroll-margin-top` + faixas alternadas; título com risco 130px gold.

## Migração

| Antes | Depois |
|---|---|
| `.skill-card` + `.project-card` em `global.css` ×18 | `<Card variant="skill|project">` |
| 6 botões CSS (`.btn`, `.submit-btn`, `.about-card__btn*`, `.social-media a`, `.project-card a`) | `<Button variant="…">` |
| `.form-group input/textarea` duplicado | `<FieldInput/FieldTextarea>` |
| `.section/.skills-grid/.projects-grid` repetidos | `<Section><Grid>` |

Legacy `global.css` mantido como fallback — não removido para evitar regressão; novos imports preferem `ui/*`.

## Quando extrair vs duplicar

- ≥3 usos com mesma intenção → extrair (feito para Button/Card).
- 2 usos ou intenção distinta (ex. `jm-cta` vs `project` CTA) → manter separado (`EosaiCTA`).
- Valor hard-coded aparece ≥3× com semântica → token (ex. `2px` → `--radius-sm`).

## Próximos candidatos (não extraídos agora)

- Header nav link (3 estados) — extrair quando surgir 2º header.
- `about-full__parallax-bg` — composição única, manter fora do DS.
- Ícones emoji → substituir por SVG stroke consistente (craft-floor ban).

## Verificação

`npm run build` passa (114 módulos, 37.19 kB CSS). Tokens AA medidos mantidos. `prefers-reduced-motion` preservado em todos os componentes.
