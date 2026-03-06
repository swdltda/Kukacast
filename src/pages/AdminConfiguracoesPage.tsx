import { useEffect, useState } from 'react';
import { FormularioConfiguracaoSite } from '@/components/FormularioConfiguracaoSite';
import { obterConfiguracoesHome, salvarConfiguracoesHome } from '@/services/api';
import type { ConfiguracoesHome } from '@/types/dominio';

export function AdminConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesHome | null>(null);

  useEffect(() => {
    void obterConfiguracoesHome().then(setConfiguracoes);
  }, []);

  if (!configuracoes) return <section className="section-card">Carregando configurações...</section>;

  return (
    <section className="section-card space-y-4">
      <h2 className="text-xl font-semibold">Configurações da Home</h2>
      <FormularioConfiguracaoSite
        configuracoes={configuracoes}
        onSave={async (dados) => {
          await salvarConfiguracoesHome(dados);
          setConfiguracoes(dados);
        }}
      />
    </section>
  );
}
