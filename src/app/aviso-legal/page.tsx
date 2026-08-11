import type { Metadata } from 'next';
import PaginaTexto from '@/components/PaginaTexto';
import { site } from '@/content/site';
import { enderecoLinha } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description:
    'Informações sobre o caráter informativo do conteúdo publicado no site da JK Advocacia.',
  alternates: { canonical: '/aviso-legal' },
  robots: { index: true, follow: true },
};

export default function Pagina() {
  return (
    <PaginaTexto titulo="Aviso legal">
      <p>
        Este site pertence à {site.nome}, sob responsabilidade de {site.profissional}
        {site.oab ? `, ${site.oab}` : ''}, com endereço em {enderecoLinha}.
      </p>

      <h2>Finalidade do conteúdo</h2>
      <p>
        As informações aqui publicadas têm caráter exclusivamente informativo. Não
        constituem consulta, parecer ou orientação jurídica aplicável a um caso concreto e
        não substituem a análise individual realizada por profissional habilitado.
      </p>

      <h2>Ausência de garantia de resultado</h2>
      <p>
        Nenhum resultado jurídico pode ser garantido. Cada situação depende de suas
        particularidades, dos documentos e provas disponíveis, do entendimento aplicável e
        das decisões das autoridades competentes.
      </p>

      <h2>Relação entre advogado e cliente</h2>
      <p>
        O envio de mensagem por este site, por telefone ou por aplicativo de mensagens não
        estabelece automaticamente uma relação entre advogado e cliente. Essa relação
        depende de contratação formal.
      </p>

      <h2>Publicidade e ética profissional</h2>
      <p>
        A comunicação deste site observa o caráter informativo, discreto e sóbrio exigido
        das publicações da advocacia. Não são veiculadas promessas de resultado,
        percentuais de êxito, comparações com outros profissionais, valores promocionais
        ou estímulo ao litígio.
      </p>

      <h2>Links externos</h2>
      <p>
        Este site pode conter links para páginas de terceiros, como perfis em redes
        sociais e serviços de mapa. A {site.nome} não se responsabiliza pelo conteúdo ou
        pelas políticas dessas páginas.
      </p>

      <h2>Propriedade do conteúdo</h2>
      <p>
        Textos, imagens e elementos visuais deste site são de titularidade da {site.nome},
        salvo indicação em contrário, e não podem ser reproduzidos sem autorização.
      </p>
    </PaginaTexto>
  );
}
