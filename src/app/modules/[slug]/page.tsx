'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, ExternalLink, BookOpen, CheckCircle, Upload, Brain } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  videoUrl?: string;
  externalLinks?: string;
  activities: Activity[];
}

interface Activity {
  id: number;
  moduleId: number;
  title: string;
  type: 'quiz' | 'upload' | 'simulator';
  content: string;
}

export default function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        const { slug } = await params;
        const response = await fetch(`/api/modules/${slug}`);
        if (!response.ok) {
          throw new Error('Módulo não encontrado');
        }
        const data = await response.json();
        setModule(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao carregar módulo');
      } finally {
        setLoading(false);
      }
    }

    fetchModule();
  }, [params]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <CheckCircle className="w-5 h-5" />;
      case 'upload':
        return <Upload className="w-5 h-5" />;
      case 'simulator':
        return <Brain className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'Quiz';
      case 'upload':
        return 'Upload de Arquivo';
      case 'simulator':
        return 'Simulador';
      default:
        return 'Atividade';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando módulo...</p>
        </div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Módulo não encontrado</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/modules">
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
              Voltar aos Módulos
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const externalLinks: { title: string; url: string }[] = module.externalLinks
    ? JSON.parse(module.externalLinks)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-semibold text-gray-900">
                Aula.<span className="text-emerald-500">Digital</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="/modules" className="text-emerald-600 font-medium">Módulos</Link>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Inscreva-se
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/modules" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Módulos
          </Link>
        </div>

        {/* Module Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
          <p className="text-gray-600 mb-4">{module.description}</p>
          
          <div className="flex flex-wrap gap-3">
            {module.videoUrl && (
              <a 
                href={module.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Assistir Vídeo
              </a>
            )}
            
            {externalLinks.map((link: { title: string; url: string }, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Module Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{module.content}</ReactMarkdown>
          </div>
        </div>

        {/* Activities */}
        {module.activities && module.activities.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Atividades Práticas</h2>
            <div className="space-y-4">
              {module.activities.map((activity: Activity) => (
                <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="text-emerald-500 mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      <span className="text-sm text-gray-500">{getActivityTypeLabel(activity.type)}</span>
                    </div>
                  </div>
                  
                  {activity.type === 'quiz' && (
                    <div className="mt-3">
                      {(() => {
                        try {
                          const quizData = JSON.parse(activity.content);
                          return (
                            <div className="space-y-3">
                              {quizData.questions?.map((question: { question: string; options?: string[]; correct?: number }, index: number) => (
                                <div key={index} className="bg-gray-50 p-3 rounded">
                                  <p className="font-medium mb-2">{question.question}</p>
                                  <ul className="space-y-1">
                                    {question.options?.map((option: string, optIndex: number) => (
                                      <li 
                                        key={optIndex} 
                                        className={`text-sm ${optIndex === question.correct ? 'text-emerald-600 font-medium' : 'text-gray-600'}`}
                                      >
                                        {optIndex + 1}. {option}
                                        {optIndex === question.correct && ' ✓'}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        } catch {
                          return <p className="text-gray-600">{activity.content}</p>;
                        }
                      })()}
                    </div>
                  )}
                  
                  {activity.type === 'simulator' && (
                    <div className="mt-3">
                      {(() => {
                        try {
                          const simData = JSON.parse(activity.content) as { instructions?: string; deliverables?: string[] };
                          return (
                            <div>
                              <p className="text-gray-700 mb-2">{simData.instructions}</p>
                              {simData.deliverables && (
                                <div>
                                  <p className="font-medium text-gray-900 mb-1">Entregáveis:</p>
                                  <ul className="list-disc list-inside text-sm text-gray-600">
                                    {simData.deliverables.map((item: string, index: number) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          );
                        } catch {
                          return <p className="text-gray-600">{activity.content}</p>;
                        }
                      })()}
                    </div>
                  )}
                  
                  {activity.type === 'upload' && (
                    <div className="mt-3">
                      <p className="text-gray-600">{activity.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
