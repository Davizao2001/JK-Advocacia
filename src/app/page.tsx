import Hero from '@/components/Hero';
import FaixaConfianca from '@/components/FaixaConfianca';
import Acolhimento from '@/components/Acolhimento';
import Areas from '@/components/Areas';
import Sobre from '@/components/Sobre';
import Atendimento from '@/components/Atendimento';
import Agendamento from '@/components/Agendamento';
import Avaliacoes from '@/components/Avaliacoes';
import Diferenciais from '@/components/Diferenciais';
import Conteudo from '@/components/Conteudo';
import Duvidas from '@/components/Duvidas';
import Localizacao from '@/components/Localizacao';
import ChamadaFinal from '@/components/ChamadaFinal';
import TransicaoNarrativa from '@/components/ui/TransicaoNarrativa';
import { duvidas, transicoes } from '@/content/site';

/** Dados estruturados das perguntas frequentes. */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: duvidas.itens.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: item.resposta },
  })),
};

export default function Pagina() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <FaixaConfianca />
      <Acolhimento />
      <Areas />
      {transicoes.areasParaSobre && (
        <TransicaoNarrativa>{transicoes.areasParaSobre}</TransicaoNarrativa>
      )}
      <Sobre />
      {transicoes.sobreParaAtendimento && (
        <TransicaoNarrativa>{transicoes.sobreParaAtendimento}</TransicaoNarrativa>
      )}
      <Atendimento />
      <Agendamento />
      {transicoes.atendimentoParaAvaliacoes && (
        <TransicaoNarrativa>{transicoes.atendimentoParaAvaliacoes}</TransicaoNarrativa>
      )}
      <Avaliacoes />
      <Diferenciais />
      {transicoes.diferenciaisParaConteudo && (
        <TransicaoNarrativa>{transicoes.diferenciaisParaConteudo}</TransicaoNarrativa>
      )}
      <Conteudo />
      {transicoes.reelsParaDuvidas && (
        <TransicaoNarrativa>{transicoes.reelsParaDuvidas}</TransicaoNarrativa>
      )}
      <Duvidas />
      {transicoes.duvidasParaLocalizacao && (
        <TransicaoNarrativa>{transicoes.duvidasParaLocalizacao}</TransicaoNarrativa>
      )}
      <Localizacao />
      <ChamadaFinal />
    </>
  );
}
