'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, BookOpen, ExternalLink } from 'lucide-react'

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  videoUrl?: string;
  externalLinks?: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const response = await fetch('/api/modules');
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando módulos...</p>
        </div>
      </div>
    );
  }

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Módulos de Ensino</h1>
          <p className="text-gray-600">
            Explore nossos módulos de alfabetização digital para professores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const externalLinks = module.externalLinks ? JSON.parse(module.externalLinks) : [];
            
            return (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {module.description}
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <Link href={`/modules/${module.slug}`}>
                      <button className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ver Conteúdo
                      </button>
                    </Link>
                    
                    {module.videoUrl && (
                      <a 
                        href={module.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Assistir Vídeo
                      </a>
                    )}
                  </div>

                  {externalLinks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Links Úteis:</h4>
                      <div className="space-y-1">
                        {externalLinks.map((link: any, index: number) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {modules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum módulo encontrado</h3>
            <p className="text-gray-600">Os módulos serão carregados em breve.</p>
          </div>
        )}
      </main>
    </div>
  );
}
