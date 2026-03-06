import { useEffect, useState } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { CardEpisodio } from '@/components/CardEpisodio';
import { CardWorkshop } from '@/components/CardWorkshop';
import { SecaoCTA } from '@/components/SecaoCTA';
import { SecaoSobre } from '@/components/SecaoSobre';
import { SecaoTemporada } from '@/components/SecaoTemporada';
import { SecaoComunidade } from '@/components/SecaoComunidade';
import { listarEpisodios, listarWorkshops, obterConfiguracoesHome } from '@/services/api';
import type { ConfiguracoesHome, Episodio, Workshop } from '@/types/dominio';

export function HomePage() {
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesHome | null>(null);

  useEffect(() => {
    void Promise.all([listarEpisodios(), listarWorkshops(), obterConfiguracoesHome()]).then(([eps, wks, cfg]) => {
      setEpisodios(eps);
      setWorkshops(wks);
      setConfiguracoes(cfg);
    });
  }, []);

  if (!configuracoes) return <section className="section-card">Carregando...</section>;

  return (
    <>
      <HeroBanner configuracoes={configuracoes} />

      <section className="grid gap-4 md:grid-cols-3">
        <SecaoSobre texto={configuracoes.texto_sobre_projeto} />
        <SecaoTemporada />
        <SecaoComunidade texto={configuracoes.texto_comunidade} />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Episódios em destaque</h2>
          <p className="text-sm text-zinc-400">Conteúdo atualizado</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {episodios.slice(0, 6).map((ep) => (
            <CardEpisodio key={ep.id} episodio={ep} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Workshops</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {workshops.map((wk) => (
            <CardWorkshop key={wk.id} workshop={wk} />
          ))}
        </div>
      </section>

      <SecaoCTA />
    </>
  );
}
