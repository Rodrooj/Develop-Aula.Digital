import sqlite3 from 'sqlite3';
import { open, type Database } from 'sqlite';
import path from 'path';

export interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  videoUrl?: string;
  externalLinks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: number;
  moduleId: number;
  title: string;
  type: 'quiz' | 'upload' | 'simulator';
  content: string;
  createdAt: string;
}

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'database.sqlite');

    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const database = db;

    // Criar tabelas se não existirem
    await database.exec(`
      CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        videoUrl TEXT,
        externalLinks TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        moduleId INTEGER NOT NULL,
        title TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('quiz', 'upload', 'simulator')),
        content TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (moduleId) REFERENCES modules (id) ON DELETE CASCADE
      );
    `);

    // Inserir dados iniciais se a tabela estiver vazia
    const moduleCount = await database.get<{ count: number }>('SELECT COUNT(*) as count FROM modules');
    if ((moduleCount?.count ?? 0) === 0) {
      await seedDatabase(database);
    }
  }

  return db as Database;
}

async function seedDatabase(database: Database) {
  const modules = [
    {
      title: 'Slides atrativos',
      description: 'Aprenda a fazer slides com a plataforma Canva',
      content: `
        # Slides Atrativos com Canva

        ## Introdução
        Neste módulo, você aprenderá a criar apresentações visuais atrativas usando a plataforma Canva, uma ferramenta online gratuita e intuitiva.

        ## Objetivos de Aprendizagem
        - Conhecer a interface do Canva
        - Criar slides com design profissional
        - Utilizar templates e elementos visuais
        - Exportar e compartilhar apresentações

        ## Conteúdo Teórico

        ### 1. Introdução ao Canva
        O Canva é uma plataforma de design gráfico que permite criar apresentações, infográficos, posts para redes sociais e muito mais, sem necessidade de conhecimento técnico em design.

        ### 2. Criando sua primeira apresentação
        - Acesse canva.com
        - Escolha "Apresentação" 
        - Selecione um template ou comece do zero
        - Personalize cores, fontes e imagens

        ### 3. Elementos essenciais de um slide atrativo
        - **Hierarquia visual**: Use tamanhos diferentes para títulos e texto
        - **Cores harmoniosas**: Escolha uma paleta de 2-3 cores
        - **Imagens de qualidade**: Use fotos em alta resolução
        - **Espaço em branco**: Não sobrecarregue o slide

        ## Atividades Práticas
        1. Crie uma apresentação de 5 slides sobre um tema de sua escolha
        2. Use pelo menos 3 elementos visuais diferentes (ícones, imagens, gráficos)
        3. Aplique uma paleta de cores consistente
      `,
      slug: 'slides-atrativos',
      videoUrl: 'https://www.youtube.com/watch?v=exemplo1',
      externalLinks: JSON.stringify([
        { title: 'Canva', url: 'https://canva.com' },
        { title: 'Templates gratuitos', url: 'https://canva.com/templates' }
      ])
    },
    {
      title: 'Quiz dinâmicos',
      description: 'Aprenda a fazer quiz do tipo Kahoot para a sala de aula',
      content: `
        # Quiz Dinâmicos com Kahoot

        ## Introdução
        Aprenda a criar quizzes interativos e envolventes para suas aulas usando o Kahoot, uma plataforma que gamifica o aprendizado.

        ## Objetivos de Aprendizagem
        - Criar conta no Kahoot
        - Desenvolver quizzes educativos
        - Configurar jogos ao vivo
        - Analisar resultados dos alunos

        ## Conteúdo Teórico

        ### 1. O que é o Kahoot?
        O Kahoot é uma plataforma de aprendizado baseada em jogos que permite criar quizzes, pesquisas e discussões interativas.

        ### 2. Tipos de atividades
        - **Quiz**: Perguntas de múltipla escolha
        - **Jumble**: Colocar itens em ordem
        - **Poll**: Pesquisas de opinião
        - **Survey**: Questionários mais longos

        ### 3. Criando um quiz eficaz
        - Perguntas claras e objetivas
        - Alternativas plausíveis
        - Tempo adequado para resposta
        - Imagens e vídeos para ilustrar

        ## Dicas Pedagógicas
        - Use o Kahoot como revisão de conteúdo
        - Crie competições saudáveis entre grupos
        - Analise os erros mais comuns para reforçar o aprendizado
        - Varie os tipos de perguntas para manter o interesse
      `,
      slug: 'quiz-dinamicos',
      videoUrl: 'https://www.youtube.com/watch?v=exemplo2',
      externalLinks: JSON.stringify([
        { title: 'Kahoot', url: 'https://kahoot.com' },
        { title: 'Kahoot Academy', url: 'https://kahoot.com/academy' }
      ])
    },
    {
      title: 'Boas anotações',
      description: 'Aprenda a tomar notas de maneira eficiente',
      content: `
        # Técnicas de Anotações Eficientes

        ## Introdução
        Desenvolva habilidades para tomar notas de forma organizada e eficiente, tanto para estudo quanto para ensino.

        ## Métodos de Anotação

        ### 1. Método Cornell
        - Divida a página em 3 seções
        - Notas principais, palavras-chave e resumo
        - Ideal para aulas expositivas

        ### 2. Mapas Mentais
        - Conceito central no meio
        - Ramificações com subtópicos
        - Use cores e símbolos

        ### 3. Método Outline
        - Estrutura hierárquica
        - Tópicos e subtópicos numerados
        - Fácil de revisar

        ## Ferramentas Digitais
        - **Notion**: Organização completa
        - **Obsidian**: Conexões entre notas
        - **OneNote**: Integração com Office
        - **Evernote**: Captura multiplataforma

        ## Dicas Práticas
        - Use abreviações consistentes
        - Destaque informações importantes
        - Revise e organize regularmente
        - Faça conexões entre conceitos
      `,
      slug: 'boas-anotacoes',
      externalLinks: JSON.stringify([
        { title: 'Notion', url: 'https://notion.so' },
        { title: 'Obsidian', url: 'https://obsidian.md' }
      ])
    },
    {
      title: 'Google Docs',
      description: 'Aprenda a usar o Google Docs, o substituto do Word',
      content: `
        # Google Docs para Educadores

        ## Introdução
        Domine o Google Docs para criar, editar e compartilhar documentos de forma colaborativa na educação.

        ## Funcionalidades Principais

        ### 1. Criação e Formatação
        - Estilos de texto e parágrafos
        - Inserção de imagens e tabelas
        - Cabeçalhos e rodapés
        - Numeração de páginas

        ### 2. Colaboração em Tempo Real
        - Compartilhamento com permissões
        - Comentários e sugestões
        - Histórico de versões
        - Chat integrado

        ### 3. Ferramentas Educacionais
        - **Explore**: Pesquisa integrada
        - **Corretor ortográfico**: Múltiplos idiomas
        - **Voz para texto**: Ditado por voz
        - **Complementos**: Extensões úteis

        ## Casos de Uso na Educação
        - Criação colaborativa de textos
        - Correção de trabalhos com comentários
        - Elaboração de projetos em grupo
        - Documentação de atividades

        ## Dicas Avançadas
        - Use modelos para padronizar documentos
        - Configure notificações de alterações
        - Aproveite os atalhos de teclado
        - Integre com outras ferramentas Google
      `,
      slug: 'google-docs',
      externalLinks: JSON.stringify([
        { title: 'Google Docs', url: 'https://docs.google.com' },
        { title: 'Templates', url: 'https://docs.google.com/document/u/0/?ftv=1&folder=0AHVGZGONnHGRUk9PVA' }
      ])
    },
    {
      title: 'Pesquisas',
      description: 'Aprenda a fazer boas pesquisas utilizando palavras chave',
      content: `
        # Técnicas de Pesquisa Eficiente

        ## Introdução
        Desenvolva habilidades para realizar pesquisas acadêmicas e educacionais de qualidade usando estratégias e ferramentas adequadas.

        ## Estratégias de Busca

        ### 1. Palavras-chave Eficazes
        - Use termos específicos e relevantes
        - Combine sinônimos e variações
        - Utilize aspas para frases exatas
        - Experimente diferentes idiomas

        ### 2. Operadores Booleanos
        - **AND**: Ambos os termos devem aparecer
        - **OR**: Qualquer um dos termos
        - **NOT**: Excluir termos específicos
        - **Parênteses**: Agrupar operações

        ### 3. Filtros e Refinamentos
        - Data de publicação
        - Tipo de arquivo (PDF, DOC, etc.)
        - Domínio específico (.edu, .gov)
        - Idioma do conteúdo

        ## Fontes Confiáveis
        - **Google Scholar**: Artigos acadêmicos
        - **JSTOR**: Periódicos científicos
        - **ResearchGate**: Rede de pesquisadores
        - **Biblioteca Digital**: Acervos institucionais

        ## Avaliação de Fontes
        - Verifique a autoridade do autor
        - Analise a data de publicação
        - Confirme com múltiplas fontes
        - Observe possíveis vieses

        ## Organização da Pesquisa
        - Use gerenciadores de referência (Zotero, Mendeley)
        - Mantenha anotações organizadas
        - Cite adequadamente as fontes
        - Crie um sistema de arquivamento
      `,
      slug: 'pesquisas',
      externalLinks: JSON.stringify([
        { title: 'Google Scholar', url: 'https://scholar.google.com' },
        { title: 'Zotero', url: 'https://zotero.org' }
      ])
    },
    {
      title: 'IA eficiente',
      description: 'Aprenda a fazer boas perguntas para o ChatGPT',
      content: `
        # IA Eficiente: Maximizando o ChatGPT na Educação

        ## Introdução
        Aprenda a utilizar inteligência artificial, especialmente o ChatGPT, como ferramenta pedagógica eficaz.

        ## Princípios de Prompts Eficazes

        ### 1. Clareza e Especificidade
        - Seja específico sobre o que deseja
        - Forneça contexto adequado
        - Defina o formato da resposta
        - Estabeleça limitações quando necessário

        ### 2. Estrutura de Prompts
        - **Papel**: "Atue como um professor de..."
        - **Contexto**: "Para alunos do ensino médio..."
        - **Tarefa**: "Crie um plano de aula sobre..."
        - **Formato**: "Em formato de lista numerada..."

        ### 3. Técnicas Avançadas
        - **Chain of Thought**: Peça para explicar o raciocínio
        - **Few-shot**: Forneça exemplos
        - **Iteração**: Refine as respostas gradualmente
        - **Verificação**: Peça para revisar e corrigir

        ## Aplicações Educacionais

        ### Planejamento de Aulas
        - Criação de objetivos de aprendizagem
        - Desenvolvimento de atividades
        - Sugestões de recursos
        - Avaliações formativas

        ### Criação de Conteúdo
        - Exercícios e questões
        - Explicações simplificadas
        - Analogias e exemplos
        - Material de apoio

        ### Feedback e Avaliação
        - Análise de textos dos alunos
        - Sugestões de melhoria
        - Rubrica de avaliação
        - Feedback personalizado

        ## Limitações e Cuidados
        - Sempre verifique as informações
        - Não substitua o julgamento pedagógico
        - Respeite direitos autorais
        - Mantenha a transparência com os alunos

        ## Exemplos Práticos
        
        **Prompt para criar exercícios:**
        "Atue como um professor de matemática. Crie 5 exercícios de nível médio sobre equações do segundo grau, incluindo as respostas e explicações passo a passo."

        **Prompt para simplificar conceitos:**
        "Explique o conceito de fotossíntese para alunos de 10 anos, usando analogias simples e linguagem acessível."
      `,
      slug: 'ia-eficiente',
      externalLinks: JSON.stringify([
        { title: 'ChatGPT', url: 'https://chat.openai.com' },
        { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai' }
      ])
    }
  ];

  for (const m of modules) {
    await database.run(
      `INSERT INTO modules (title, description, content, slug, videoUrl, externalLinks) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [m.title, m.description, m.content, m.slug, m.videoUrl, m.externalLinks]
    );
  }

  // Inserir algumas atividades de exemplo
  const activities = [
    {
      moduleId: 1,
      title: 'Quiz: Elementos de Design',
      type: 'quiz',
      content: JSON.stringify({
        questions: [
          {
            question: 'Qual é a regra básica para escolher cores em um slide?',
            options: ['Usar muitas cores', 'Usar 2-3 cores harmoniosas', 'Usar apenas preto e branco', 'Cores não importam'],
            correct: 1
          },
          {
            question: 'O que é hierarquia visual?',
            options: ['Ordem alfabética', 'Tamanhos diferentes para diferentes níveis de informação', 'Usar apenas maiúsculas', 'Centralizar tudo'],
            correct: 1
          }
        ]
      })
    },
    {
      moduleId: 2,
      title: 'Criar seu primeiro Kahoot',
      type: 'simulator',
      content: JSON.stringify({
        instructions: 'Acesse kahoot.com, crie uma conta e desenvolva um quiz com 5 perguntas sobre um tema de sua escolha.',
        deliverables: ['Link do Kahoot criado', 'Screenshot das perguntas']
      })
    }
  ];

  for (const a of activities) {
    await database.run(
      `INSERT INTO activities (moduleId, title, type, content) VALUES (?, ?, ?, ?)`,
      [a.moduleId, a.title, a.type, a.content]
    );
  }
}

export async function getAllModules(): Promise<Module[]> {
  const database = await getDatabase();
  return await database.all<Module[]>('SELECT * FROM modules ORDER BY createdAt ASC');
}

export async function getModuleBySlug(slug: string): Promise<Module | null> {
  const database = await getDatabase();
  const row = await database.get<Module | undefined>('SELECT * FROM modules WHERE slug = ?', [slug]);
  return row ?? null;
}

export async function getActivitiesByModuleId(moduleId: number): Promise<Activity[]> {
  const database = await getDatabase();
  return await database.all<Activity[]>('SELECT * FROM activities WHERE moduleId = ? ORDER BY createdAt ASC', [moduleId]);
}
