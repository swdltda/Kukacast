import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Target, Users, Heart, Lightbulb, Award, Globe } from "lucide-react";

export function SobreProjeto() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre o Projeto
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Transformando vidas através da educação digital
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-4">
                O Kuka Cast nasceu com a missão de democratizar o acesso ao conhecimento
                tecnológico, tornando a educação digital acessível para todas as pessoas,
                independentemente de sua formação ou experiência prévia.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Acreditamos que a alfabetização digital é fundamental para a inclusão
                social e o desenvolvimento profissional no século XXI.
              </p>
              <p className="text-lg text-gray-600">
                Através de workshops gratuitos e conteúdo de qualidade, capacitamos
                pessoas a compreenderem e utilizarem a tecnologia de forma consciente,
                crítica e responsável.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-2xl">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-700">Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-700">Workshops</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">20+</div>
                  <div className="text-gray-700">Cidades</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-gray-700">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Princípios que guiam nosso trabalho e compromisso
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusão</h3>
              <p className="text-gray-600">
                Acreditamos que todos têm o direito de aprender e se desenvolver,
                independentemente de sua origem ou experiência.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empatia</h3>
              <p className="text-gray-600">
                Colocamos as pessoas no centro de tudo o que fazemos, respeitando
                ritmos e necessidades individuais.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inovação</h3>
              <p className="text-gray-600">
                Buscamos constantemente novas formas de ensinar e facilitar o
                aprendizado da tecnologia.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excelência</h3>
              <p className="text-gray-600">
                Comprometidos com a qualidade em cada workshop, material e interação
                com nossos participantes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Propósito</h3>
              <p className="text-gray-600">
                Guiados pela missão de transformar realidades através da educação
                digital e tecnológica.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Acessibilidade</h3>
              <p className="text-gray-600">
                Tornamos o conhecimento tecnológico acessível, simples e aplicável
                ao dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nosso Impacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias de transformação através da educação digital
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <p className="text-lg text-gray-700 mb-4 italic">
                "O Kuka Cast mudou minha vida profissional. Consegui meu primeiro emprego
                na área de tecnologia após participar dos workshops."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold">Maria Silva</div>
                  <div className="text-sm text-gray-600">Participante 2025</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <p className="text-lg text-gray-700 mb-4 italic">
                "Finalmente entendi como funciona a tecnologia que uso todos os dias.
                Os workshops são práticos e fáceis de acompanhar."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <div className="font-semibold">João Santos</div>
                  <div className="text-sm text-gray-600">Participante 2025</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <p className="text-lg text-gray-700 mb-4 italic">
                "O Kuka Cast me deu confiança para usar ferramentas digitais no meu
                trabalho. Excelente metodologia!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold">Ana Oliveira</div>
                  <div className="text-sm text-gray-600">Participante 2026</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl border border-orange-200">
              <p className="text-lg text-gray-700 mb-4 italic">
                "Recomendo para todos! Aprendi mais em um workshop do que em meses
                tentando sozinho. Muito obrigado!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div>
                  <div className="font-semibold">Pedro Costa</div>
                  <div className="text-sm text-gray-600">Participante 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
