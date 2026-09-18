<div align="center">

# José Mário — Portfólio

### Desenvolvedor Full Stack

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![GSAP](https://img.shields.io/badge/GSAP_3.15-88CE02?style=flat&logo=greensock&logoColor=white)](https://gsap.com)
[![Tailwind](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

[![Português](https://img.shields.io/badge/PT--BR-fallback-gray)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Juholiver)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/junior_oli_)

</div>

---

## Visão Geral

Portfólio pessoal com estética **futurista HUD** e identidade visual **dark luxury** em tons de dourado. A interface combina animações cinematográficas por scroll, avatar 3D interativo e uma assistente virtual com inteligência artificial — tudo construído para demonstrar competência técnica e atenção a detalhes.

---

## Funcionalidades

| Recurso | Descrição |
|:--------|:----------|
| **Hero Cinematográfico** | Sequência de 239 frames (.webp) sincronizados com scroll, criando efeito de animação contínua |
| **Scroll-Driven Animations** | Cada seção entra com transições suaves via GSAP ScrollTrigger |
| **Avatar 3D Interativo** | 80 frames PNG animados com interpolação de lerp baseada no movimento do mouse |
| **Gabizinha AI** | Assistente virtual com personalidade carismática, integrada ao NVIDIA Nemotron 3.5 Lightning 30B |
| **Memory System** | Sistema de memória local com 8 respostas pré-definidas como fallback quando a IA não está disponível |
| **Galeria de Projetos** | Carousel auto-scroll com cards glassmorphism e links para demo/repositório |
| **Seção de Habilidades** | Carousel auto-scroll com badges de tecnologias e cards interativos |
| **Formulário de Contato** | Layout HUD com campos validados e links sociais |
| **Download de Currículo** | Botão "BAIXAR CURRÍCULO" que faz download do PDF diretamente |
| **Design Responsivo** | Layout adaptável para desktop, tablet e mobile |
| **Acessibilidade** | Skip-links, aria-labels, roles ARIA e navegação por teclado |

---

## Stack Tecnológica

```
Frontend
├── React 19 .................. UI library
├── TypeScript 5.9 ........... Type safety
├── Vite 7 ................... Build tool & dev server
├── GSAP 3.15 ................ ScrollTrigger, tweens, animações
├── Framer Motion 13.3 ....... Animações declarativas
├── React Three Fiber ........ Renderização 3D (Three.js)
├── React Icons .............. Ícones (Fa*, Io5)
└── React Router DOM 7.8 ..... Navegação entre páginas

AI / Chatbot
├── NVIDIA Nemotron 3.5 Lightning 30B A3B ... Modelo de linguagem
├── System Prompt ............. Personalidade Gabizinha
└── Local Memory .............. Fallback offline

Deploy
├── Vercel .............. Hospedagem estática
└── GitHub .............. Controle de versão
```

---

## Estrutura do Projeto

```
portfolio-jose-mario/
├── public/
│   └── Shanallote.glb          # Modelo 3D
├── src/
│   ├── assets/
│   │   ├── imagens/
│   │   │   ├── hero/            # 239 frames .webp (cinematográfico)
│   │   │   ├── chatbot/         # 80 frames .png (avatar)
│   │   │   └── about/           # Imagens da seção Sobre
│   │   ├── PerfilTerno.png      # Foto de perfil
│   │   └── Shanallote.glb       # Modelo 3D
│   ├── components/
│   │   ├── CinematicScrollCanvas/  # Canvas de frames do hero
│   │   ├── Header/                 # Navegação fixa
│   │   ├── Hero/                   # Seção principal
│   │   ├── About/                  # Sobre + download currículo
│   │   ├── Skills/                 # Habilidades (carousel)
│   │   ├── Projects/               # Projetos (carousel)
│   │   ├── Chatbot/                # Gabizinha AI
│   │   ├── Contact/                # Formulário de contato
│   │   ├── Footer/                 # Rodapé
│   │   └── ui/                     # Button, Field, Section
│   ├── pages/
│   │   └── Home.tsx              # Página principal
│   ├── styles/
│   │   ├── tokens.css            # Design tokens (cores, tipografia)
│   │   └── global.css            # Reset global
│   ├── data/                     # Dados dos projetos e habilidades
│   ├── hooks/                    # Custom hooks
│   └── utils/                    # Utilitários
├── .env.example                  # Variáveis de ambiente (referência)
├── index.html                    # Entry point HTML
├── vite.config.ts                # Configuração Vite
├── tsconfig.json                 # Configuração TypeScript
└── package.json                  # Dependências e scripts
```

---

## getting Started

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Juholiver/portifolioreact.git
# Entre na pasta
cd portfolio-jose-mario

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env e adicione sua VITE_NVIDIA_API_KEY (opcional)

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

### Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|:---------|:-----------:|:----------|
| `VITE_NVIDIA_API_KEY` | Não | Chave da API NVIDIA para ativar a Gabizinha AI |

> Se a chave não for configurada, o chatbot funciona com respostas locais pré-definidas.

---

## Scripts Disponíveis

| Comando | Descrição |
|:--------|:----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite |
| `npm run build` | Compila TypeScript e gera build de produção em `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |

---

## Deploy no Vercel

1. Faça push do repositório para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Adicione a variável `VITE_NVIDIA_API_KEY` nas Environment Variables (opcional)
5. Deploy!

---

## Design System

### Paleta de Cores

| Cor | Hex | Uso |
|:----|:----|:----|
| Ouro Forja | `#c9a227` | Acentos principais, borders, badges |
| Ouro Brilhante | `#e3c15c` | Hover states, destaques |
| Ouro Areia | `#d8c5a0` | Texto secundário |
| Tinta Noite | `#0d0c0a` | Background principal |
| Superfície | `#1d1915` | Cards, painéis |
| Pergaminho | `#ece5d8` | Texto principal |
| Azul Gelo | `#7dd3ff` | Acentos complementares |

### Tipografia

| Elemento | Fonte | Tamanho |
|:---------|:------|:--------|
| Título Hero | Cinzel | `clamp(48px, 5.8vw, 72px)` |
| Headlines | Cinzel | `clamp(2rem, 4.5vw, 3rem)` |
| Corpo | Inter | `1rem` |
| Kicker | Inter | `0.75rem` uppercase |

---

## Contato

| Canal | Link |
|:------|:-----|
| WhatsApp | `(15) 99191-5880` |
| LinkedIn | [José Oliveira](https://www.linkedin.com/in/jos%C3%A9-oliveira-desenvolvedor/) |
| GitHub | [Juholiver](https://github.com/Juholiver) |
| Instagram | [@junior_oli_](https://www.instagram.com/junior_oli_) |

---

<div align="center">

Feito com dedicação por **José Mário** — Sorocaba, SP

</div>
