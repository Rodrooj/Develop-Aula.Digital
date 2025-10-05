# Aula.Digital - Plataforma de Alfabetização Digital

Uma plataforma web desenvolvida para apoiar a alfabetização digital de professores, ensinando o uso de tecnologias em sala de aula.

## 🎯 Visão Geral

O **Aula.Digital** é uma aplicação web completa que oferece módulos de ensino tecnológico para educadores, incluindo conteúdo teórico, atividades práticas e links para ferramentas externas.

### Funcionalidades Principais

- **Módulos de Ensino**: 6 módulos completos sobre tecnologias educacionais
- **Conteúdo Interativo**: Textos formatados em Markdown, vídeos e links externos
- **Atividades Práticas**: Quizzes, simuladores e exercícios de upload
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **API RESTful**: Backend robusto com banco de dados SQLite

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **React Markdown** - Renderização de conteúdo Markdown

### Backend
- **Next.js API Routes** - API RESTful integrada
- **SQLite** - Banco de dados leve e eficiente
- **Node.js** - Runtime JavaScript

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Turbopack** - Bundler rápido para desenvolvimento

## 📚 Módulos de Ensino

1. **Slides Atrativos** - Criação de apresentações com Canva
2. **Quiz Dinâmicos** - Desenvolvimento de quizzes com Kahoot
3. **Boas Anotações** - Técnicas eficientes de anotação
4. **Google Docs** - Uso colaborativo de documentos
5. **Pesquisas** - Estratégias de pesquisa acadêmica
6. **IA Eficiente** - Uso pedagógico do ChatGPT

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Rodrooj/Develop-Aula.Digital.git
cd aula-digital
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
aula-digital/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── modules/          # API routes para módulos
│   │   ├── modules/              # Páginas dos módulos
│   │   ├── globals.css           # Estilos globais
│   │   ├── layout.tsx            # Layout principal
│   │   └── page.tsx              # Página inicial
│   ├── assets/                   # Assets estáticos (SVGs)
│   └── lib/
│       └── database.ts           # Configuração do banco de dados
├── public/                       # Arquivos públicos
├── database.sqlite              # Banco de dados SQLite
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🗄️ Banco de Dados

O projeto utiliza SQLite com duas tabelas principais:

### Tabela `modules`
- `id` - Identificador único
- `title` - Título do módulo
- `description` - Descrição breve
- `content` - Conteúdo em Markdown
- `slug` - URL amigável
- `videoUrl` - Link para vídeo (opcional)
- `externalLinks` - Links externos em JSON
- `createdAt` / `updatedAt` - Timestamps

### Tabela `activities`
- `id` - Identificador único
- `moduleId` - Referência ao módulo
- `title` - Título da atividade
- `type` - Tipo (quiz, upload, simulator)
- `content` - Conteúdo da atividade em JSON
- `createdAt` - Timestamp

## 🎨 Design

O design foi baseado em um protótipo do Figma, mantendo:
- **Paleta de cores**: Verde esmeralda (#10B981) e tons de cinza
- **Tipografia**: Fontes system-ui para legibilidade
- **Layout responsivo**: Grid adaptável para diferentes telas
- **Componentes interativos**: Hover effects e transições suaves

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar versão de produção
npm start

# Linting
npm run lint
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Rodrigo** - Desenvolvimento inicial - [@Rodrooj](https://github.com/Rodrooj)

## 🙏 Agradecimentos

- Design baseado em protótipo Figma
- Inspiração em plataformas educacionais modernas
- Comunidade Next.js e React

---

**Aula.Digital** - Transformando a educação através da tecnologia 🚀
