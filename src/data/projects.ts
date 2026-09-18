export interface Project {
  id: string
  title: string
  description: string
  technologies: string
  link: string
  linkLabel: string
  icon: string
}

export const frontEndProjects: Project[] = [
  {
    id: 'winterforge',
    title: 'WinterForge',
    description:
      'Sistema completo para gerenciamento de academia, com autenticação de usuários, exercícios e criação de fichas de treino personalizadas.',
    technologies: 'React, TypeScript, Vite, C#, .NET 10, PostgreSQL, JWT',
    link: 'https://winterforge-rho.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'winterforge',
  },
  {
    id: 'sfp',
    title: 'São Francisco Personalizados',
    description: 'Loja online de produtos personalizados com foco em UX moderno.',
    technologies: 'Next.js, TypeScript, MongoDB, JWT',
    link: 'https://sfp-nine.vercel.app/login',
    linkLabel: 'Ver Projeto',
    icon: 'gift',
  },
  {
    id: 'provet',
    title: 'Provet Itape Saas',
    description: 'SaaS para gestão de clínicas veterinárias com dashboard completo.',
    technologies: 'Next.js, TypeScript, Tailwind CSS, Supabase',
    link: 'https://provet-itape.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'paw',
  },
  {
    id: 'hamburgueria',
    title: 'Hamburgueria Express',
    description: 'E-commerce para pedidos rápidos com gestão de estado no carrinho.',
    technologies: 'React, JavaScript, CSS',
    link: 'https://express-hamburgueria.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'burger',
  },
  {
    id: 'analisador',
    title: 'Analisador de códigos com IA',
    description: 'Ferramenta que utiliza IA para feedback em tempo real sobre código.',
    technologies: 'React, Vite, API Gemini',
    link: 'https://analisador-de-codigo-com-ia-nine.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'code',
  },
  {
    id: 'previsao',
    title: 'Previsão do Tempo',
    description: 'Aplicação de consumo de API climática com interface responsiva.',
    technologies: 'React, Vite, API Weather',
    link: 'https://previsao-react.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'weather',
  },
  {
    id: 'translator',
    title: 'MyTranslator',
    description: 'Tradutor multilingue com suporte a reconhecimento de voz.',
    technologies: 'JavaScript, API MyMemory',
    link: 'https://juholiver.github.io/MyTranslator/',
    linkLabel: 'Ver Projeto',
    icon: 'globe',
  },
  {
    id: 'kanban',
    title: 'Kanban com React',
    description: 'Gerenciador de tarefas arrastável para organização de fluxo.',
    technologies: 'React, JavaScript, CSS',
    link: 'https://kanban-react-eight-opal.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'kanban',
  },
  {
    id: 'cardapio',
    title: 'Cardápio Digital',
    description: 'Sistema dinâmico para visualização de menus em restaurantes.',
    technologies: 'React, Vite, CSS Modules',
    link: 'https://cardapio-react-kappa.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'chef',
  },
  {
    id: 'fundo',
    title: 'Fundo Mágico',
    description: 'Criação de backgrounds personalizados via automação IA.',
    technologies: 'JavaScript, N8N',
    link: 'https://juholiver.github.io/fundomagico/',
    linkLabel: 'Ver Projeto',
    icon: 'palette',
  },
  {
    id: 'academia-ia',
    title: 'Academia IA (Solo Leveling)',
    description: 'Gerador de treinos temáticos utilizando inteligência artificial.',
    technologies: 'React, OpenAI API',
    link: 'https://academia-sololeving-ia.vercel.app/',
    linkLabel: 'Ver Projeto',
    icon: 'dumbbell',
  },
]

export const backEndProjects: Project[] = [
  {
    id: 'api-auth',
    title: 'API de Autenticação',
    description: 'Backend robusto para gestão de usuários e segurança com JWT.',
    technologies: 'Node.js, MongoDB Atlas',
    link: 'https://github.com/Juholiver/appLoginNodeJs',
    linkLabel: 'Ver Código',
    icon: 'database',
  },
  {
    id: 'api-exercicios',
    title: 'ApiExercicios',
    description:
      'API REST para gerenciamento de exercícios físicos, permitindo consultar e organizar exercícios por grupo muscular e nível.',
    technologies: 'C#, .NET 10, PostgreSQL, Entity Framework Core',
    link: 'https://github.com/Juholiver/ApiAcademia',
    linkLabel: 'Ver Código',
    icon: 'database',
  },
  {
    id: 'api-auth-academia',
    title: 'ApiAuthAcademia',
    description:
      'API de autenticação e gerenciamento de treinos para a aplicação WinterForge, com segurança baseada em JWT.',
    technologies: 'C#, .NET 10, PostgreSQL, Entity Framework Core, JWT',
    link: 'https://github.com/Juholiver/ApiAuthAcademia',
    linkLabel: 'Ver Código',
    icon: 'database',
  },
]

export const skills = [
  { title: 'Front-end', description: 'HTML, CSS, JavaScript, TypeScript, Angular, React, Next.js' },
  { title: 'Back-end', description: 'Node.js, Python, C#, .NET' },
  { title: 'Design', description: 'UI/UX, Figma' },
  { title: 'Ferramentas', description: 'Git, VS Code, n8n, JWT, Cookies' },
  { title: 'Banco de Dados', description: 'MySQL, MongoDB, Supabase' },
]
