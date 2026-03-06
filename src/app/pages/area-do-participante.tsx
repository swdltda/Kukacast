import { useState } from "react";
import { 
  Home, 
  GraduationCap, 
  BookOpen, 
  FolderOpen, 
  User, 
  LogOut,
  Play,
  Download,
  Clock,
  CheckCircle,
  Award,
  TrendingUp,
  Menu,
  X
} from "lucide-react";

export function AreaParticipante() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "inicio", label: "Início", icon: Home },
    { id: "workshops", label: "Meus Workshops", icon: GraduationCap },
    { id: "aulas", label: "Aulas", icon: BookOpen },
    { id: "materiais", label: "Materiais", icon: FolderOpen },
    { id: "perfil", label: "Perfil", icon: User },
  ];

  const workshops = [
    {
      id: 1,
      titulo: "Introdução à Comunicação Digital",
      progresso: 75,
      status: "Em andamento",
      proximaAula: "Estratégias de Comunicação Online",
    },
    {
      id: 2,
      titulo: "Sistemas Tecnológicos Modernos",
      progresso: 100,
      status: "Concluído",
      proximaAula: null,
    },
    {
      id: 3,
      titulo: "Desenvolvendo Inteligência Digital",
      progresso: 30,
      status: "Em andamento",
      proximaAula: "Pensamento Crítico Digital",
    },
  ];

  const aulas = [
    {
      id: 1,
      titulo: "Fundamentos da Comunicação Digital",
      duracao: "45 min",
      concluida: true,
      workshop: "Comunicação Digital",
    },
    {
      id: 2,
      titulo: "Redes Sociais e Presença Online",
      duracao: "50 min",
      concluida: true,
      workshop: "Comunicação Digital",
    },
    {
      id: 3,
      titulo: "Estratégias de Comunicação Online",
      duracao: "55 min",
      concluida: false,
      workshop: "Comunicação Digital",
    },
    {
      id: 4,
      titulo: "Ética na Comunicação Digital",
      duracao: "40 min",
      concluida: false,
      workshop: "Comunicação Digital",
    },
  ];

  const materiais = [
    {
      id: 1,
      nome: "Guia Completo de Comunicação Digital.pdf",
      tipo: "PDF",
      tamanho: "2.5 MB",
      workshop: "Comunicação Digital",
    },
    {
      id: 2,
      nome: "Slides - Introdução à Tecnologia.pdf",
      tipo: "PDF",
      tamanho: "1.8 MB",
      workshop: "Sistemas Tecnológicos",
    },
    {
      id: 3,
      nome: "Exercícios Práticos - Inteligência Digital.pdf",
      tipo: "PDF",
      tamanho: "950 KB",
      workshop: "Inteligência Digital",
    },
    {
      id: 4,
      nome: "Checklist de Segurança Digital.pdf",
      tipo: "PDF",
      tamanho: "720 KB",
      workshop: "Uso Responsável",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">Kuka Cast</h1>
          <p className="text-sm text-gray-600 mt-1">Área do Participante</p>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 lg:p-12">
          {/* Início */}
          {activeSection === "inicio" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Bem-vindo de volta! 👋
                </h2>
                <p className="text-gray-600">
                  Continue sua jornada de aprendizado
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
                  <div className="text-sm text-gray-600">Workshops ativos</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                  <div className="text-sm text-gray-600">Aulas concluídas</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-purple-600" size={24} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">12h</div>
                  <div className="text-sm text-gray-600">Horas de estudo</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Award className="text-orange-600" size={24} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
                  <div className="text-sm text-gray-600">Certificados</div>
                </div>
              </div>

              {/* Continue Aprendendo */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Continue aprendendo
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {workshops
                    .filter((w) => w.status === "Em andamento")
                    .map((workshop) => (
                      <div
                        key={workshop.id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {workshop.titulo}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Próxima aula: {workshop.proximaAula}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {workshop.progresso}%
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${workshop.progresso}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Play size={16} />
                          Continuar
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Progresso */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Seu progresso esta semana</h3>
                    <p className="text-blue-100">Você está indo muito bem!</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <div className="text-3xl font-bold mb-1">5</div>
                    <div className="text-blue-100">Aulas assistidas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">3.5h</div>
                    <div className="text-blue-100">Tempo de estudo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-blue-100">Presença</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Meus Workshops */}
          {activeSection === "workshops" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Meus Workshops
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {workshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {workshop.titulo}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            workshop.status === "Concluído"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {workshop.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {workshop.progresso}%
                        </div>
                        <div className="text-sm text-gray-600">Completo</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            workshop.status === "Concluído"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${workshop.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                    {workshop.proximaAula && (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            Próxima aula:
                          </div>
                          <div className="font-medium text-gray-900">
                            {workshop.proximaAula}
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Continuar
                        </button>
                      </div>
                    )}
                    {workshop.status === "Concluído" && (
                      <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        <Award size={20} />
                        Baixar Certificado
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aulas */}
          {activeSection === "aulas" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Aulas</h2>
              <div className="grid grid-cols-1 gap-4">
                {aulas.map((aula) => (
                  <div
                    key={aula.id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-6"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        aula.concluida
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {aula.concluida ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <Play className="text-blue-600" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {aula.titulo}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{aula.workshop}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {aula.duracao}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        aula.concluida
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {aula.concluida ? "Revisar" : "Assistir"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materiais */}
          {activeSection === "materiais" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Materiais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materiais.map((material) => (
                  <div
                    key={material.id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="text-red-600" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {material.nome}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <span>{material.workshop}</span>
                          <span>•</span>
                          <span>{material.tamanho}</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          <Download size={16} />
                          Baixar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perfil */}
          {activeSection === "perfil" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfil</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      JD
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      João da Silva
                    </h3>
                    <p className="text-gray-600 mb-6">joao@email.com</p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Editar Perfil
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Informações Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="João da Silva"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="joao@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="(11) 98765-4321"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="São Paulo, SP"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Salvar Alterações
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Conquistas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                          <Award className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Primeiro Workshop
                          </div>
                          <div className="text-sm text-gray-600">
                            Concluído em Mar 2026
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <TrendingUp className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Estudante Dedicado
                          </div>
                          <div className="text-sm text-gray-600">
                            10 horas de estudo
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
