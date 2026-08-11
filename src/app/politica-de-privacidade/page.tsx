import type { Metadata } from 'next';
import PaginaTexto from '@/components/PaginaTexto';
import { site } from '@/content/site';
import { telUrl } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Como a JK Advocacia trata os dados informados por quem entra em contato pelo site.',
  alternates: { canonical: '/politica-de-privacidade' },
  robots: { index: true, follow: true },
};

export default function Pagina() {
  return (
    <PaginaTexto titulo="Política de Privacidade">
      <p>
        Esta política descreve como a {site.nome} trata as informações fornecidas por
        quem entra em contato por meio deste site. O objetivo é ser claro sobre quais
        dados são coletados, para que servem e por quanto tempo permanecem em nosso
        alcance.
      </p>

      <h2>Quais dados são coletados</h2>
      <p>
        O formulário de contato solicita apenas o essencial para retornar a mensagem:
        nome, um meio de contato (telefone ou e-mail) e uma breve descrição do motivo do
        contato. Não são solicitados documentos, dados de processos ou informações
        sensíveis por esse canal.
      </p>

      <h2>Como os dados são utilizados</h2>
      <p>
        Ao enviar o formulário, as informações preenchidas são utilizadas para compor uma
        mensagem no aplicativo de mensagens do próprio usuário, que decide se deseja ou
        não enviá-la. Isso significa que os dados não ficam armazenados em banco de dados
        deste site.
      </p>
      <p>
        Recebida a mensagem, as informações são utilizadas exclusivamente para responder
        ao contato e prestar orientações sobre o atendimento. Não há venda,
        compartilhamento comercial ou uso publicitário dos dados.
      </p>

      <h2>Serviços de terceiros</h2>
      <ul>
        <li>
          <strong>WhatsApp:</strong> o envio de mensagens ocorre na plataforma do próprio
          aplicativo, sujeita às políticas do seu fornecedor.
        </li>
        <li>
          <strong>Google Maps:</strong> o mapa exibido na seção de localização é
          incorporado pelo Google e pode registrar dados de navegação conforme as
          políticas do serviço.
        </li>
        <li>
          <strong>Google Fonts:</strong> as fontes tipográficas são carregadas a partir de
          servidores do Google.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Este site não utiliza cookies próprios de rastreamento ou de publicidade. Serviços
        incorporados de terceiros, como o mapa, podem utilizar seus próprios cookies.
      </p>

      <h2>Sigilo profissional</h2>
      <p>
        As informações compartilhadas no contato com a advocacia são tratadas com
        discrição e observância do dever de sigilo profissional aplicável à atividade
        advocatícia.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode
        solicitar confirmação de tratamento, acesso, correção ou eliminação dos dados
        informados. Para isso, entre em contato pelo telefone{' '}
        <a href={telUrl}>{site.contato.telefoneExibicao}</a>.
      </p>

      <h2>Alterações</h2>
      <p>
        Esta política pode ser atualizada para refletir mudanças no site ou na legislação
        aplicável. A versão vigente é sempre a publicada nesta página.
      </p>
    </PaginaTexto>
  );
}
