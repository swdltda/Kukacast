import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { participantesAPI } from "../lib/api";
import {
  MessageSquare,
  Cpu,
  Brain,
  Shield,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export function PaginaInicial() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    cidade: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await participantesAPI.register(formData);
      navigate(`/confirmacao?nome=${encodeURIComponent(formData.nome)}`);
    } catch (err: any) {
      setError(err.message || "Falha ao registrar. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Kuka Cast
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Tecnologia, comunicação e letramento digital para transformar realidades.
              </p>
              <Link
                to="/workshops"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
              >
                Participar do workshop gratuito
                <ArrowRight size={20} />
              </Link>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-blue-200">Participantes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-200">Workshops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="text-blue-200">Avaliação</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771765780945-c788a6ce4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZWR1Y2F0aW9uJTIwdGVjaG5vbG9neSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MjgwMzg2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Education"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Projeto Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Sobre o Projeto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O Kuka Cast é uma plataforma de educação digital que capacita pessoas
              a compreender e utilizar a tecnologia de forma consciente e responsável.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusão Digital</h3>
              <p className="text-gray-600">
                Democratizando o acesso ao conhecimento tecnológico para todos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aprendizado Prático</h3>
              <p className="text-gray-600">
                Workshops hands-on com aplicação real dos conceitos aprendidos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificação</h3>
              <p className="text-gray-600">
                Certificados de conclusão reconhecidos e validados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Felipe Costa Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758685848177-93817e9ad5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjgwMzg2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Felipe Costa"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Sobre Felipe Costa
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fundador do Kuka Cast e especialista em educação digital, Felipe Costa
                dedica sua carreira a tornar a tecnologia acessível para todos.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Com mais de 10 anos de experiência em educação e tecnologia, Felipe
                desenvolveu metodologias inovadoras que combinam teoria e prática,
                preparando milhares de pessoas para os desafios do mundo digital.
              </p>
              <Link
                to="/felipe-costa"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Saiba mais sobre Felipe
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai aprender Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O que você vai aprender</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desenvolva habilidades essenciais para prosperar no mundo digital
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunicação digital</h3>
              <p className="text-gray-300">
                Aprenda a se comunicar de forma eficaz no ambiente digital e
                construir sua presença online.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sistemas tecnológicos</h3>
              <p className="text-gray-300">
                Compreenda como funcionam os sistemas e ferramentas que usamos
                no dia a dia.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inteligência digital</h3>
              <p className="text-gray-300">
                Desenvolva pensamento crítico para navegar e prosperar no mundo
                digital.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Uso responsável da tecnologia</h3>
              <p className="text-gray-300">
                Aprenda sobre privacidade, segurança e ética no uso de tecnologias
                digitais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo do Workshop Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Conteúdo do Workshop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um programa completo dividido em módulos práticos e interativos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Introdução à tecnologia
                  </h3>
                  <p className="text-gray-700">
                    Fundamentos da tecnologia digital e seu impacto na sociedade
                    moderna.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Comunicação digital
                  </h3>
                  <p className="text-gray-700">
                    Técnicas e melhores práticas para comunicação efetiva online.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Como funcionam os sistemas
                  </h3>
                  <p className="text-gray-700">
                    Entenda a arquitetura e funcionamento de sistemas digitais.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Inteligência digital
                  </h3>
                  <p className="text-gray-700">
                    Desenvolva habilidades críticas para o mundo digital.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Inscreva-se no Workshop Gratuito
            </h2>
            <p className="text-xl text-blue-100">
              Transforme sua relação com a tecnologia
            </p>
          </div>
          <form className="bg-white rounded-2xl p-8 text-gray-900" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                  required
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="data_nascimento" className="block text-sm font-medium mb-2">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="data_nascimento"
                  name="data_nascimento"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  value={formData.data_nascimento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="cidade" className="block text-sm font-medium mb-2">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua cidade"
                required
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>
            {error && (
              <div className="mb-6 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Quero participar do workshop"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}