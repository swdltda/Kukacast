import { useEffect, useState } from 'react';
import { HeroPrincipal } from '@/components/HeroPrincipal';
import { CardWorkshop } from '@/components/CardWorkshop';
import { SecaoCTA } from '@/components/SecaoCTA';
import { SecaoSobreProjeto } from '@/components/SecaoSobreProjeto';
import { SecaoOuvirAgora } from '@/components/SecaoOuvirAgora';
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
      <HeroPrincipal configuracoes={configuracoes} />

      <section className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <SecaoSobreProjeto texto={configuracoes.texto_sobre_projeto} />
        <article className="editorial-surface space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200/70">Comunidade</p>
          <h3 className="text-2xl font-bold text-orange-50">Rede viva Kuka Cast</h3>
          <p className="text-sm leading-relaxed text-orange-100/75">{configuracoes.texto_comunidade}</p>
          <a
            className="button-secondary inline-flex px-4 py-2"
            href="https://chat.whatsapp.com/G5pgNz1V1aOBuhJMOrjM0o"
            target="_blank"
            rel="noreferrer"
          >
            Entrar no grupo
          </a>
        </article>
      </section>

      <div className="soft-divider" />
      <SecaoOuvirAgora episodios={episodios} />
      <div className="soft-divider" />

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="editorial-title text-3xl font-black text-orange-50">Workshops e experiências</h2>
          <p className="text-sm text-orange-100/65">Formações práticas conectadas aos episódios</p>
        </div>
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
