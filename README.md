# JK Advocacia — site institucional

Next.js 14 (App Router) · TypeScript · Tailwind CSS · sem dependências extras.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm run typecheck  # checagem de tipos
npm run export     # versão 100% estática na pasta /out
```

## Onde editar o conteúdo

Praticamente tudo vive em **um único arquivo**:

```
src/content/site.ts
```

Lá ficam textos, telefone, endereço, horários, links, nomes de imagens e as
perguntas frequentes. Nenhum outro arquivo precisa ser tocado para atualizar o site.

### Reels do Instagram

A seção "Conteúdo em vídeo" fica oculta até você adicionar links em
`reels.itens`, em `src/content/site.ts`:

```ts
itens: [
  { url: 'https://www.instagram.com/reel/XXXXXXXXXXX/', legenda: 'O que é guarda compartilhada?' },
]
```

Copie o link de cada reel no próprio Instagram (botão "..." → "Copiar link").
O vídeo é incorporado com o embed oficial da Meta — sem raspagem de dados,
aparece com curtidas e legenda originais.

### Campos que aguardam confirmação

Nada foi inventado. Os campos abaixo estão **vazios de propósito** e, enquanto
vazios, **não aparecem em lugar nenhum do site** — não há placeholder visível
para o visitante. Basta preencher e o bloco correspondente passa a ser exibido:

| Onde | Campo |
|---|---|
| `site.oab` | número de inscrição na OAB |
| `sobre.credenciais[]` | formação, especializações, experiência, propósito do atendimento |
| `avaliacoes.depoimentos[]` | depoimentos (só com autorização, máximo 3) |
| `areas.lista[].assuntosPublicados` | `false` até a confirmação dos assuntos atendidos |
| `conteudo.artigos[].href` | link do artigo, quando publicado |

Enquanto `assuntosPublicados` for `false`, o card da área exibe apenas a
descrição geral e uma nota neutra. Mudando para `true`, a lista aparece sozinha.

## Imagens

Substitua os arquivos de `public/images` mantendo os nomes. Tamanhos e
orientações sugeridas estão em `public/images/LEIA-ME.txt`.

A hero faz uma transição lenta e cruzada entre as fotos de `imagens.hero`.
Com uma única foto na lista, a transição é desativada automaticamente.

## Endereço final

Antes de publicar, ajuste `site.url` em `src/content/site.ts` para o domínio
real. Ele alimenta canonical, Open Graph, sitemap e dados estruturados.

## Estrutura

```
src/
  app/
    layout.tsx                 metadados, JSON-LD LegalService, fontes
    page.tsx                   ordem das seções + JSON-LD FAQPage
    globals.css                tokens visuais e animações
    sitemap.ts / robots.ts
    politica-de-privacidade/
    aviso-legal/
  components/                  uma seção por arquivo
    ui/Reveal.tsx              animação de entrada por scroll
    ui/Icones.tsx              ícones de traço (sem martelo/balança)
  content/site.ts              ← todo o conteúdo
  lib/links.ts                 WhatsApp, telefone, rota e mapa
```

## Decisões que valem registro

- **Ética:** sem promessa de resultado, percentual de êxito, comparação com
  outros escritórios, consulta grátis ou linguagem de urgência. Os botões
  convidam a "entrar em contato", nunca a "contratar agora".
- **Movimento:** apenas fade + deslocamento curto, transição de imagens na hero,
  cabeçalho que reduz no scroll e accordion suave. Tudo é neutralizado quando o
  sistema pede `prefers-reduced-motion: reduce`.
- **Acessibilidade:** navegação por teclado, foco visível, link de pular para o
  conteúdo, accordion com `aria-expanded`/`aria-controls`, hierarquia H1→H2→H3.
- **Formulário:** valida os campos e protege contra spam com honeypot invisível
  e tempo mínimo de preenchimento. Por padrão ele **não armazena nada** — apenas
  monta a mensagem no WhatsApp do próprio usuário. Para enviar por e-mail
  (Formspree, Resend, rota de API), troque o corpo de `enviar` em
  `src/components/Formulario.tsx` — e revise a Política de Privacidade, que hoje
  descreve exatamente o comportamento atual.
- **SEO local:** title, description, Open Graph, sitemap, robots, dados
  estruturados `LegalService` com nota e endereço, e `FAQPage`. As expressões de
  busca (Jardim Novo Horizonte, Grajaú, São Paulo) aparecem no texto corrido, sem
  repetição artificial.
- Nenhum símbolo oficial da OAB é utilizado.

## Publicar

`npm run export` gera a pasta `/out`, que pode ir para qualquer hospedagem
estática (Vercel, Netlify, Cloudflare Pages, hospedagem tradicional). Para
Vercel, o deploy direto do repositório também funciona sem configuração.
