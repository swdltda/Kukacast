import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  FolderOpen,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Calendar,
  Menu,
  X,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

export function PainelAdministrativo() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "workshops", label: "Workshops", icon: GraduationCap },
    { id: "aulas", label: "Aulas", icon: BookOpen },
    { id: "participantes", label: "Participantes", icon: Users },
    { id: "materiais", label: "Materiais", icon: FolderOpen },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  const statsData = [
    {
      label: "Total de Participantes",
      value: "523",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      label: "Workshops Ativos",
      value: "12",
      change: "+3",
      trend: "up",
      icon: GraduationCap,
      color: "purple",
    },
    {
      label: "Taxa de Conclusão",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "green",
    },
    {
      label: "Aulas Publicadas",
      value: "48",
      change: "+8",
      trend: "up",
      icon: BookOpen,
      color: "orange",
    },
  ];

  const workshops = [
    {
      id: 1,
      titulo: "Introdução à Comunicação Digital",
      participantes: 145,
      status: "Ativo",
      inicio: "15/03/2026",
      instrutor: "Felipe Costa",
    },
    {
      id: 2,
      titulo: "Sistemas Tecnológicos Modernos",
      participantes: 98,
      status: "Ativo",
      inicio: "22/03/2026",
      instrutor: "Ana Silva",
    },
    {
      id: 3,
      titulo: "Desenvolvendo Inteligência Digital",
      participantes: 167,
      status: "Ativo",
      inicio: "29/03/2026",
      instrutor: "Felipe Costa",
    },
    {
      id: 4,
      titulo: "Uso Responsável da Tecnologia",
      participantes: 113,
      status: "Em breve",
      inicio: "05/04/2026",
      instrutor: "Carlos Santos",
    },
  ];

  const participantes = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      workshops: 3,
      progresso: 75,
      inscricao: "10/02/2026",
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao@email.com",
      workshops: 2,
      progresso: 90,
      inscricao: "15/02/2026",
    },
    {
      id: 3,
      nome: "Ana Oliveira",
      email: "ana@email.com",
      workshops: 4,
      progresso: 65,
      inscricao: "20/02/2026",
    },
    {
      id: 4,
      nome: "Pedro Costa",
      email: "pedro@email.com",
      workshops: 1,
      progresso: 45,
      inscricao: "25/02/2026",
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
          <p className="text-sm text-gray-600 mt-1">Painel Administrativo</p>
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
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard
                </h2>
                <p className="text-gray-600">
                  Visão geral da plataforma Kuka Cast
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statsData.map((stat, index) => {
                  const Icon = stat.icon;
                  const TrendIcon =
                    stat.trend === "up" ? TrendingUp : TrendingDown;
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                        >
                          <Icon
                            className={`text-${stat.color}-600`}
                            size={24}
                          />
                        </div>
                        <div
                          className={`flex items-center gap-1 ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <TrendIcon size={16} />
                          <span className="text-sm font-medium">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Charts Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Novos Participantes (Últimos 30 dias)
                  </h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[45, 52, 48, 65, 72, 68, 80].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-blue-600 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 mt-2">
                          Sem {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Workshops Mais Populares
                  </h3>
                  <div className="space-y-4">
                    {workshops.slice(0, 4).map((workshop) => (
                      <div key={workshop.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {workshop.titulo}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {workshop.participantes}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{
                              width: `${(workshop.participantes / 200) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Atividade Recente
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-semibold">15 novos participantes</span>{" "}
                        se inscreveram hoje
                      </p>
                      <p className="text-sm text-gray-600">Há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        Workshop{" "}
                        <span className="font-semibold">
                          "Comunicação Digital"
                        </span>{" "}
                        foi concluído por 23 pessoas
                      </p>
                      <p className="text-sm text-gray-600">Há 5 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-purple-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-semibold">Nova aula publicada</span>{" "}
                        no workshop "Inteligência Digital"
                      </p>
                      <p className="text-sm text-gray-600">Há 1 dia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workshops */}
          {activeSection === "workshops" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Workshops
                  </h2>
                  <p className="text-gray-600">
                    Gerencie todos os workshops da plataforma
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Plus size={20} />
                  Novo Workshop
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Buscar workshops..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={20} />
                      Filtrar
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Workshop
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instrutor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Participantes
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Início
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workshops.map((workshop) => (
                        <tr key={workshop.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {workshop.titulo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {workshop.instrutor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {workshop.participantes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {workshop.inicio}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                workshop.status === "Ativo"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {workshop.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Eye size={18} className="text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Edit size={18} className="text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Trash2 size={18} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Aulas */}
          {activeSection === "aulas" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Aulas</h2>
                  <p className="text-gray-600">
                    Gerencie o conteúdo das aulas
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Plus size={20} />
                  Nova Aula
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gerencie suas aulas
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie, edite e organize o conteúdo das aulas dos workshops
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Adicionar primeira aula
                </button>
              </div>
            </div>
          )}

          {/* Participantes */}
          {activeSection === "participantes" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Participantes
                  </h2>
                  <p className="text-gray-600">
                    Gerencie todos os participantes da plataforma
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Buscar participantes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter size={20} />
                      Filtrar
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Workshops
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progresso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inscrição
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participantes.map((participante) => (
                        <tr key={participante.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {participante.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="font-medium text-gray-900">
                                {participante.nome}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {participante.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {participante.workshops}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${participante.progresso}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {participante.progresso}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {participante.inscricao}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Eye size={18} className="text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Edit size={18} className="text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Materiais */}
          {activeSection === "materiais" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Materiais
                  </h2>
                  <p className="text-gray-600">
                    Gerencie os materiais de apoio dos workshops
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Plus size={20} />
                  Novo Material
                </button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <FolderOpen className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Organize seus materiais
                </h3>
                <p className="text-gray-600 mb-6">
                  Faça upload e gerencie PDFs, slides e outros materiais de apoio
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Fazer upload de material
                </button>
              </div>
            </div>
          )}

          {/* Configurações */}
          {activeSection === "configuracoes" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Configurações
                </h2>
                <p className="text-gray-600">
                  Gerencie as configurações da plataforma
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Configurações Gerais
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Plataforma
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Kuka Cast"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email de Contato
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="contato@kukacast.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Tecnologia, comunicação e letramento digital para transformar realidades."
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
                    Notificações
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          Novos participantes
                        </div>
                        <div className="text-sm text-gray-600">
                          Receber notificação quando houver novas inscrições
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          Conclusão de workshops
                        </div>
                        <div className="text-sm text-gray-600">
                          Notificar quando participantes concluírem workshops
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        defaultChecked
                      />
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
