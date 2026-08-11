'use client';

import { useRef, useState, type FormEvent } from 'react';
import { localizacao } from '@/content/site';
import { whatsappUrl } from '@/lib/links';

type Erros = Partial<Record<'nome' | 'contato' | 'mensagem', string>>;

/**
 * Formulário de contato com validação e proteção básica contra spam
 * (campo honeypot invisível + verificação de tempo mínimo de preenchimento).
 *
 * Por padrão o envio abre uma conversa no WhatsApp já com o texto redigido —
 * nenhum dado é armazenado ou enviado a terceiros. Para usar um serviço de
 * e-mail (Formspree, Resend, rota de API própria etc.), troque o corpo de
 * `enviar` pelo fetch correspondente.
 */
export default function Formulario() {
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const montadoEm = useRef(Date.now());

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);

    // Proteções anti-spam: campo oculto preenchido ou envio quase instantâneo.
    if (String(dados.get('site') || '') !== '') return;
    if (Date.now() - montadoEm.current < 2500) return;

    const nome = String(dados.get('nome') || '').trim();
    const contato = String(dados.get('contato') || '').trim();
    const mensagem = String(dados.get('mensagem') || '').trim();

    const novosErros: Erros = {};
    if (nome.length < 2) novosErros.nome = 'Informe seu nome.';
    if (contato.length < 8)
      novosErros.contato = 'Informe um telefone ou e-mail para retorno.';
    if (mensagem.length < 10)
      novosErros.mensagem = 'Escreva uma breve descrição do motivo do contato.';

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const texto = [
      'Olá, encontrei o contato da JK Advocacia pelo site e gostaria de receber informações sobre o atendimento.',
      '',
      `Nome: ${nome}`,
      `Contato: ${contato}`,
      `Mensagem: ${mensagem}`,
    ].join('\n');

    setEnviado(true);
    window.open(
      `${whatsappUrl('padrao').split('?')[0]}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  const classeCampo =
    'mt-2 w-full rounded-none border border-tinta-400/25 bg-areia-50 px-4 py-3 text-[0.95rem] text-tinta-700 ' +
    'placeholder:text-tinta-400/70 transition-colors duration-300 focus:border-marinho-600 focus:outline-none';

  return (
    <form onSubmit={enviar} noValidate>
      <h3 className="font-serif text-[1.16rem] text-tinta-800">
        {localizacao.formulario.titulo}
      </h3>
      <p className="mt-3 max-w-prose text-[0.92rem] leading-relaxed text-tinta-500">
        {localizacao.formulario.texto}
      </p>

      {/* Honeypot — invisível para pessoas, atrativo para robôs */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="site">Não preencher</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="text-[0.82rem] text-tinta-600">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? 'erro-nome' : undefined}
            placeholder="Como podemos chamar você"
            className={classeCampo}
          />
          {erros.nome && (
            <p id="erro-nome" role="alert" className="mt-1.5 text-[0.8rem] text-marinho-600">
              {erros.nome}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contato" className="text-[0.82rem] text-tinta-600">
            Telefone ou e-mail
          </label>
          <input
            id="contato"
            name="contato"
            type="text"
            autoComplete="tel"
            required
            aria-invalid={Boolean(erros.contato)}
            aria-describedby={erros.contato ? 'erro-contato' : undefined}
            placeholder="Para retorno do contato"
            className={classeCampo}
          />
          {erros.contato && (
            <p
              id="erro-contato"
              role="alert"
              className="mt-1.5 text-[0.8rem] text-marinho-600"
            >
              {erros.contato}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="mensagem" className="text-[0.82rem] text-tinta-600">
          Motivo do contato
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          required
          aria-invalid={Boolean(erros.mensagem)}
          aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
          placeholder="Descreva brevemente o assunto, sem incluir dados sensíveis."
          className={`${classeCampo} resize-y`}
        />
        {erros.mensagem && (
          <p
            id="erro-mensagem"
            role="alert"
            className="mt-1.5 text-[0.8rem] text-marinho-600"
          >
            {erros.mensagem}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primario mt-7 w-full sm:w-auto">
        Enviar mensagem
      </button>

      <p aria-live="polite" className="sr-only">
        {enviado ? 'Mensagem preparada. Uma nova janela foi aberta.' : ''}
      </p>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-tinta-400">
        {localizacao.formulario.aviso}
      </p>
    </form>
  );
}
