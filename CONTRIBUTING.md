# Contribuindo com o JK Advocacia

Este documento define o fluxo padrão de trabalho deste repositório. Ele vale
para qualquer pessoa — ou qualquer agente/modelo de IA — que for alterar o
código ou o conteúdo do site. Não é opcional: qualquer mudança de correção,
melhoria ou nova função deve seguir estes passos.

## 1. Toda mudança começa com uma issue

Antes de escrever código, abra (ou use uma já existente) uma issue descrevendo
o que precisa ser feito. Classifique com uma destas labels:

- `correção` — algo que está quebrado ou com comportamento errado.
- `melhoria` — um ajuste ou refinamento em algo que já existe.
- `nova função` — uma funcionalidade ou seção nova no site.

A issue deve conter, ao menos:

- **Contexto**: o que está acontecendo hoje e por quê isso precisa mudar.
- **O que fazer**: a ação esperada, em termos objetivos.
- **Arquivo(s)**: os arquivos envolvidos, quando já conhecidos.

## 2. O trabalho é feito em um branch

Crie um branch a partir de `main` com um nome curto e descritivo, prefixado
pelo tipo da mudança:

- `fix/nome-curto` — correção
- `feat/nome-curto` — nova função
- `chore/nome-curto` — melhoria, ajuste, documentação

## 3. O Pull Request referencia a issue

Ao abrir o Pull Request, a descrição deve citar a issue correspondente, para
que o GitHub feche a issue automaticamente quando o PR for mesclado:

```
Closes #<número da issue>
```

Se o PR resolver apenas parte da issue, use `Refs #<número>` em vez de
`Closes`.

O título do PR deve ser claro sobre o que muda, e a descrição deve explicar
o que foi feito e, quando fizer sentido, como testar.

## 4. Merge = deploy

O merge do Pull Request na branch `main` é o que representa a publicação da
mudança. Por isso:

- Revise o PR (mesmo que rapidamente) antes de mesclar.
- Prefira PRs pequenos e focados em uma única issue.
- Não empilhe várias mudanças não relacionadas no mesmo PR.

## Sobre o conteúdo do site

Todo o texto, contato, imagens e dados do site vivem em `src/content/site.ts`.
Nenhum dado é inventado: campos vazios ficam ocultos no site até serem
confirmados e preenchidos (veja o `README.md` para o detalhamento completo).
Isso também se aplica ao trabalho descrito neste documento — uma issue que
depende de uma informação real (número da OAB, credenciais, fotos, vídeos)
só deve ser fechada quando o dado real for de fato inserido, nunca com um
valor de exemplo ou placeholder.
