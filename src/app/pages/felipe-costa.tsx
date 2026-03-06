import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GraduationCap, Award, Users, BookOpen, Linkedin, Twitter, Mail } from "lucide-react";

export function FelipeCosta() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Felipe Costa</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Fundador do Kuka Cast e especialista em educação digital
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Mail className="text-white" size={20} />
                </a>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758685848177-93817e9ad5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlZHVjYXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjgwMzg2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Felipe Costa"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Biografia</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Felipe Costa é educador, tecnólogo e empreendedor social dedicado a
              democratizar o acesso à educação digital no Brasil. Com mais de 10 anos
              de experiência em tecnologia e educação, Felipe fundou o Kuka Cast em 2020
              com a missão de tornar o letramento digital acessível para todos.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Formado em Ciência da Computação pela Universidade Federal de São Paulo
              e Mestre em Educação pela USP, Felipe combina conhecimento técnico profundo
              com metodologias pedagógicas inovadoras, criando experiências de aprendizado
              que realmente transformam vidas.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Antes de fundar o Kuka Cast, Felipe trabalhou como desenvolvedor de software
              em empresas de tecnologia e como professor universitário, experiências que
              o prepararam para criar uma plataforma de educação que conecta teoria e
              prática de forma única.
            </p>
            <p className="text-lg text-gray-600">
              Palestrante em eventos de tecnologia e educação, Felipe é reconhecido como
              uma das vozes mais importantes no movimento de inclusão digital no Brasil.
              Seu trabalho já impactou diretamente mais de 500 pessoas e continua crescendo
              a cada dia.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
            Conquistas e Reconhecimentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Pessoas impactadas</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-purple-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Workshops ministrados</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
              <div className="text-gray-600">Prêmios de inovação</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-orange-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
              <div className="text-gray-600">Livros publicados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
            Áreas de Especialização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border-l-4 border-blue-600 bg-blue-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Educação Digital
              </h3>
              <p className="text-gray-600">
                Metodologias inovadoras para ensino de tecnologia e desenvolvimento
                de competências digitais.
              </p>
            </div>
            <div className="p-6 border-l-4 border-purple-600 bg-purple-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Letramento Digital
              </h3>
              <p className="text-gray-600">
                Desenvolvimento de alfabetização tecnológica e pensamento crítico
                no uso de ferramentas digitais.
              </p>
            </div>
            <div className="p-6 border-l-4 border-green-600 bg-green-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Inclusão Social
              </h3>
              <p className="text-gray-600">
                Projetos de impacto social que utilizam a tecnologia como ferramenta
                de transformação.
              </p>
            </div>
            <div className="p-6 border-l-4 border-orange-600 bg-orange-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Design Instrucional
              </h3>
              <p className="text-gray-600">
                Criação de experiências de aprendizado eficazes e engajadoras.
              </p>
            </div>
            <div className="p-6 border-l-4 border-red-600 bg-red-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Gestão de Projetos
              </h3>
              <p className="text-gray-600">
                Liderança e coordenação de iniciativas educacionais e tecnológicas.
              </p>
            </div>
            <div className="p-6 border-l-4 border-blue-600 bg-blue-50">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Desenvolvimento Web
              </h3>
              <p className="text-gray-600">
                Expertise técnica em desenvolvimento de aplicações e plataformas
                educacionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Visão para o Futuro</h2>
          <p className="text-xl text-gray-300 mb-8">
            "Acredito em um futuro onde todas as pessoas, independentemente de sua
            origem ou formação, tenham acesso ao conhecimento tecnológico necessário
            para prosperar na era digital. O Kuka Cast é apenas o começo dessa jornada."
          </p>
          <p className="text-lg text-gray-400">
            - Felipe Costa
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
