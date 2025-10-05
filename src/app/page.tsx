'use client'

import { Play } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
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
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Inscreva-se
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seja bem-vindo(a)!</h1>
          <Link href="/modules">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
              Acesse documentos
            </button>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Slides atrativos */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Slides atrativos</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a fazer slides com a plataforma Canva
            </p>
            <Link href="/modules/slides-atrativos">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>

          {/* Quiz dinâmicos */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Quiz dinâmicos</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a fazer quiz do tipo Kahoot para a sala de aula
            </p>
            <Link href="/modules/quiz-dinamicos">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>

          {/* Boas anotações */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Boas anotações</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a tomar notas de maneira eficiente
            </p>
            <Link href="/modules/boas-anotacoes">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>

          {/* Google Docs */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Google Docs</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a usar o Google Docs, o substituto do Word
            </p>
            <Link href="/modules/google-docs">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>

          {/* Pesquisas */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Pesquisas</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a fazer boas pesquisas utilizando palavras chave
            </p>
            <Link href="/modules/pesquisas">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>

          {/* IA eficiente */}
          <div className="bg-slate-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">IA eficiente</h3>
            <p className="text-gray-300 text-sm mb-4">
              Aprenda a fazer boas perguntas para o ChatGPT
            </p>
            <Link href="/modules/ia-eficiente">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                Ver conteúdo
              </button>
            </Link>
          </div>
        </div>

        {/* Video Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Slides atrativos video */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Slides atrativos</h2>
              <Link href="/modules/slides-atrativos">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                  Acessar documento
                </button>
              </Link>
            </div>
            <p className="text-gray-600">Aprenda a fazer slides com a plataforma Canva</p>
            <div className="bg-slate-800 rounded-lg aspect-video flex items-center justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 rounded-full p-4 transition-colors">
                <Play className="w-8 h-8 text-white" fill="white" />
              </button>
            </div>
          </div>

          {/* Quiz dinâmicos video */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quiz dinâmicos</h2>
              <Link href="/modules/quiz-dinamicos">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm">
                  Acessar documento
                </button>
              </Link>
            </div>
            <p className="text-gray-600">Aprenda a fazer quiz do tipo Kahoot para a sala de aula</p>
            <div className="bg-slate-800 rounded-lg aspect-video flex items-center justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 rounded-full p-4 transition-colors">
                <Play className="w-8 h-8 text-white" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
