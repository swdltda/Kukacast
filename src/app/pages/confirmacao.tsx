import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

export function Confirmacao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const nome = searchParams.get("nome") || "Participante";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Inscrição Confirmada!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Parabéns, {nome}! Você está oficialmente inscrito no Kuka Cast.
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-white" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Junte-se à nossa comunidade no WhatsApp
          </h2>
          
          <p className="text-gray-700 mb-6">
            Participe do nosso grupo no WhatsApp para receber atualizações sobre os
            workshops, materiais exclusivos e interagir com outros participantes!
          </p>
          
          <a
            href="https://chat.whatsapp.com/G5pgNz1V1aOBuhJMOrjM0o"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
          >
            <MessageCircle size={24} />
            Entrar no grupo do WhatsApp
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Em breve você receberá um email com mais informações sobre como acessar
            a plataforma e começar seus estudos.
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  );
}
