import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Clock, MapPin, Users, CheckCircle, Star } from "lucide-react";

const workshops = [
  {
    id: 1,
    titulo: "Introdução à Comunicação Digital",
    descricao: "Aprenda os fundamentos da comunicação no ambiente digital e como construir sua presença online.",
    data: "15 de Março, 2026",
    horario: "14:00 - 17:00",
    local: "Online",
    vagas: 30,
    nivel: "Iniciante",
    duracao: "3 horas",
  },
  {
    id: 2,
    titulo: "Sistemas Tecnológicos Modernos",
    descricao: "Entenda como funcionam os sistemas e plataformas digitais que utilizamos diariamente.",
    data: "22 de Março, 2026",
    horario: "10:00 - 13:00",
    local: "Online",
    vagas: 25,
    nivel: "Intermediário",
    duracao: "3 horas",
  },
  {
    id: 3,
    titulo: "Desenvolvendo Inteligência Digital",
    descricao: "Desenvolva pensamento crítico e habilidades essenciais para navegar no mundo digital.",
    data: "29 de Março, 2026",
    horario: "14:00 - 17:00",
    local: "Online",
    vagas: 30,
    nivel: "Iniciante",
    duracao: "3 horas",
  },
  {
    id: 4,
    titulo: "Uso Responsável da Tecnologia",
    descricao: "Aprenda sobre segurança, privacidade e ética no uso de tecnologias digitais.",
    data: "5 de Abril, 2026",
    horario: "10:00 - 13:00",
    local: "Online",
    vagas: 30,
    nivel: "Todos os níveis",
    duracao: "3 horas",
  },
];

export function Workshops() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nossos Workshops
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Participe de workshops gratuitos e transforme sua relação com a tecnologia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">100% Gratuito</div>
              <div className="text-blue-100">Acesso completo sem custos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">Online</div>
              <div className="text-blue-100">Participe de qualquer lugar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">Certificado</div>
              <div className="text-blue-100">Receba certificação ao concluir</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Próximos Workshops
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o workshop ideal para você e inscreva-se gratuitamente
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
                        {workshop.nivel}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {workshop.titulo}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                      <Star className="text-yellow-500" size={16} fill="currentColor" />
                      <span className="text-sm font-semibold text-yellow-700">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{workshop.descricao}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="text-blue-600" size={20} />
                      <span>{workshop.data}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="text-blue-600" size={20} />
                      <span>
                        {workshop.horario} ({workshop.duracao})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="text-blue-600" size={20} />
                      <span>{workshop.local}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="text-blue-600" size={20} />
                      <span>{workshop.vagas} vagas disponíveis</span>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Inscrever-se gratuitamente
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Por que participar dos nossos workshops?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Conteúdo Prático</h3>
                    <p className="text-gray-600">
                      Aprenda fazendo com exercícios práticos e aplicáveis ao dia a dia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Instrutores Experientes</h3>
                    <p className="text-gray-600">
                      Aprenda com profissionais qualificados e apaixonados por educação.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Certificado de Conclusão</h3>
                    <p className="text-gray-600">
                      Receba certificado digital validado ao concluir o workshop.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Material de Apoio</h3>
                    <p className="text-gray-600">
                      Acesso a materiais complementares, slides e recursos extras.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Comunidade Ativa</h3>
                    <p className="text-gray-600">
                      Faça parte de uma rede de pessoas aprendendo juntas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763310225230-6e15b125935a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc2hvcCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzI4MDM4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workshop"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Escolha um workshop acima e inscreva-se gratuitamente agora mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#workshops"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Ver workshops disponíveis
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold border border-white/30"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
