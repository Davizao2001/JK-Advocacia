/**
 * ============================================================================
 * ARQUIVO CENTRAL DE CONTEÚDO — JK ADVOCACIA
 * ============================================================================
 * Todo o texto, contato, imagem e ajuste editorial do site fica aqui.
 * Nenhum outro arquivo precisa ser alterado para atualizar o conteúdo.
 *
 * REGRA IMPORTANTE:
 * Campos vazios ("") simplesmente NÃO aparecem no site. Nada de placeholder
 * visível para o visitante. Basta preencher quando a informação for confirmada
 * pela profissional responsável e o bloco correspondente passa a ser exibido.
 * ============================================================================
 */

export const site = {
  /** Endereço final do site (usado em SEO, sitemap e Open Graph). */
  url: 'https://www.jkadvocacia.adv.br',

  nome: 'JK Advocacia',
  profissional: 'Kerabe Assis Silva',

  /**
   * Preencha quando confirmado. Enquanto vazio, não é exibido em lugar nenhum.
   * Ex.: 'OAB/SP 000.000'
   */
  oab: '',

  contato: {
    telefoneExibicao: '(11) 91215-8114',
    /** Formato internacional, apenas dígitos — usado em tel: e wa.me */
    telefoneE164: '5511912158114',
    instagram: '@kerabeassis.adv',
    instagramUrl: 'https://www.instagram.com/kerabeassis.adv',
    email: '', // opcional — preencher se houver e-mail público
  },

  endereco: {
    logradouro: 'R. da Sereia, 61',
    bairro: 'Jardim Novo Horizonte',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04856-280',
    /** Usado no mapa e no botão de rota */
    buscaMapa: 'R. da Sereia, 61 - Jardim Novo Horizonte, São Paulo - SP, 04856-280',
    geo: { lat: -23.7856, lng: -46.6842 }, // aproximado — ajuste se desejar precisão
  },

  /** Editável livremente. Deixe a lista vazia para ocultar a seção de horários. */
  horarios: [
    { dia: 'Segunda a sexta', horario: '09h às 18h' },
    { dia: 'Sábado, domingo e feriados', horario: 'Mediante agendamento prévio' },
  ],
  horariosObservacao: 'Confirme previamente o horário e a modalidade de atendimento.',

  google: {
    nota: '5,0',
    quantidade: 47,
    /** Link do perfil no Google. Vazio = botão "Ver avaliações no Google" não aparece. */
    url: 'https://www.google.com/search?q=JK+Advocacia+Jardim+Novo+Horizonte+S%C3%A3o+Paulo',
  },

  /**
   * Mensagens iniciais do WhatsApp. Nenhuma contém dado sensível,
   * promessa de gratuidade ou detalhe de processo.
   */
  whatsapp: {
    padrao:
      'Olá, encontrei o contato da JK Advocacia pelo site e gostaria de receber informações sobre o atendimento.',
    familia:
      'Olá, encontrei o contato da JK Advocacia pelo site e gostaria de receber informações sobre o atendimento em Direito de Família.',
    trabalhista:
      'Olá, encontrei o contato da JK Advocacia pelo site e gostaria de receber informações sobre o atendimento em Direito Trabalhista.',
  },

  /**
   * Imagens. Substitua os arquivos dentro de /public/images mantendo os nomes,
   * ou troque os caminhos abaixo. O `alt` também é editável.
   */
  imagens: {
    /**
     * Fundo da hero em tela cheia. Com uma única imagem na lista, ela fica
     * estática; adicionando mais de uma, a hero volta a fazer a transição
     * lenta entre elas automaticamente. `textoPosicao` controla de qual lado
     * o texto aparece em cada foto — útil para nunca cobrir um elemento
     * importante da própria imagem (como um letreiro na parede).
     */
    hero: [
      {
        src: '/images/hero-escritorio.jpg',
        alt: 'Escritório da JK Advocacia',
        posicao: '58% 32%',
        // O letreiro "JK Advocacia" da parede fica do lado direito do
        // enquadramento nesta foto — o texto vai para a esquerda para não
        // disputar espaço com ele.
        textoPosicao: 'esquerda' as const,
      },
      {
        src: '/images/hero-1.jpg',
        alt: 'Kerabe Assis Silva, responsável pela JK Advocacia',
        posicao: '38% 28%',
        textoPosicao: 'direita' as const,
      },
    ],
    acolhimento: {
      src: '/images/acolhimento.jpg',
      alt: 'Pessoa analisando com atenção um documento em casa',
    },
    /**
     * Fotos que se revezam na seção "Sobre". Adicione ou remova itens
     * livremente — o carrossel se ajusta ao tamanho da lista.
     */
    sobre: [
      {
        src: '/images/kerab.jpg',
        alt: 'Kerabe Assis Silva, responsável pela JK Advocacia',
        // Foto horizontal com o rosto à esquerda do enquadramento — sem
        // isso o corte vertical do carrossel (4:5) cai no fundo vazio.
        posicao: '15% 50%',
      },
      {
        src: '/images/sobre-familia.jpg',
        alt: 'Kerabe Assis Silva com a família',
        posicao: '50% 50%',
      },
    ],
    familia: {
      src: '/images/area-familia.jpg',
      alt: 'Pai ajudando a filha a se preparar antes de sair de casa',
    },
    trabalhista: {
      src: '/images/area-trabalhista.jpg',
      alt: 'Trabalhador analisando documentos com atenção em casa',
    },
    /** Imagem usada quando o site é compartilhado em redes sociais (1200x630). */
    openGraph: '/images/og.jpg',
  },

  seo: {
    title: 'JK Advocacia | Direito de Família e Trabalhista em São Paulo',
    description:
      'JK Advocacia: orientação jurídica em Direito de Família e Direito Trabalhista, com escritório no Jardim Novo Horizonte, em São Paulo.',
  },
} as const;

/* ---------------------------------------------------------------------------
 * NAVEGAÇÃO
 * ------------------------------------------------------------------------ */
export const navegacao = [
  { label: 'Início', href: '#inicio' },
  { label: 'Áreas de atuação', href: '#areas' },
  { label: 'Conteúdo', href: '#conteudo-informativo' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Dúvidas frequentes', href: '#duvidas' },
  { label: 'Localização', href: '#localizacao' },
] as const;

/* ---------------------------------------------------------------------------
 * HERO
 * ------------------------------------------------------------------------ */
export const hero = {
  titulo: 'Orientação jurídica para proteger o que realmente importa.',
  texto:
    'Atuação em Direito de Família e Direito Trabalhista, com atendimento próximo, clareza e responsabilidade em cada etapa.',
  botaoPrimario: 'Entrar em contato',
  botaoSecundario: 'Conhecer áreas de atuação',
  observacao: 'Cada situação jurídica exige uma análise individual.',
};

/* ---------------------------------------------------------------------------
 * FAIXA DE CONFIANÇA
 * ------------------------------------------------------------------------ */
export const faixaConfianca = [
  {
    icone: 'conversa' as const,
    titulo: 'Atendimento próximo',
    texto: 'Orientação clara e cuidadosa durante todo o atendimento.',
  },
  {
    icone: 'lupa' as const,
    titulo: 'Atuação responsável',
    texto: 'Cada situação é analisada individualmente, com discrição e seriedade.',
  },
  {
    icone: 'estrela' as const,
    titulo: 'Escritório bem avaliado',
    texto: 'Nota 5,0 no Google com base em 47 avaliações.',
  },
];

/* ---------------------------------------------------------------------------
 * ACOLHIMENTO
 * ------------------------------------------------------------------------ */
export const acolhimento = {
  sobretitulo: 'Antes de decidir',
  titulo: 'Algumas decisões não precisam ser enfrentadas sem orientação.',
  texto:
    'Questões familiares e trabalhistas podem envolver insegurança, dúvidas e decisões importantes. A JK Advocacia oferece orientação jurídica para que cada pessoa compreenda sua situação, conheça os caminhos possíveis e possa tomar decisões com mais segurança.',
};

/* ---------------------------------------------------------------------------
 * ÁREAS DE ATUAÇÃO
 * ---------------------------------------------------------------------------
 * `assuntosPublicados` controla a exibição da lista de assuntos.
 * Mantenha `false` até a confirmação da profissional. Ao mudar para `true`,
 * a lista aparece automaticamente no card.
 *
 * Cada assunto pode ter `perguntas` — 1 a 2 perguntas curtas e não invasivas,
 * baseadas em dúvidas comuns de quem procura Direito de Família/Trabalhista,
 * usadas na triagem para chegar a uma mensagem mais objetiva. Nenhuma delas
 * pede documento, dado sensível ou promete um resultado — apenas ajuda a
 * situar o assunto antes da conversa.
 * ------------------------------------------------------------------------ */
export const areas = {
  sobretitulo: 'Áreas de atuação',
  titulo: 'Dois campos de atuação, o mesmo cuidado no atendimento.',
  texto:
    'A atuação da JK Advocacia se concentra em situações que envolvem a vida familiar e as relações de trabalho — contextos em que entender o próprio cenário costuma ser o passo mais difícil.',
  lista: [
    {
      id: 'familia',
      titulo: 'Direito de Família',
      texto:
        'Orientação jurídica para situações que envolvem relações familiares, responsabilidades, patrimônio e proteção dos interesses das pessoas envolvidas.',
      botao: 'Conversar sobre uma situação familiar',
      mensagem: 'familia' as const,
      imagem: 'familia' as const,
      assuntosPublicados: true, // usados também como opções da triagem de contato
      assuntos: [
        {
          titulo: 'Divórcio e separação',
          perguntas: [
            {
              pergunta: 'O divórcio seria de comum acordo ou existem pontos de divergência?',
              opcoes: ['De comum acordo', 'Existem divergências', 'Ainda não conversamos sobre isso'],
            },
            {
              pergunta: 'Há filhos menores de idade ou bens a partilhar?',
              opcoes: ['Só filhos menores', 'Só bens', 'Ambos', 'Nenhum dos dois'],
            },
          ],
        },
        {
          titulo: 'Guarda dos filhos',
          perguntas: [
            {
              pergunta: 'Já existe algum acordo, mesmo verbal, sobre a guarda ou convivência?',
              opcoes: ['Sim, já existe um acordo', 'Não, ainda não conversamos', 'Existe, mas não está sendo cumprido'],
            },
            {
              pergunta: 'O que você busca no momento?',
              opcoes: ['Definir a guarda pela primeira vez', 'Alterar uma guarda já definida', 'Regularizar a convivência'],
            },
          ],
        },
        {
          titulo: 'Pensão alimentícia',
          perguntas: [
            {
              pergunta: 'A pensão já foi definida ou ainda está em aberto?',
              opcoes: ['Já definida, mas não está sendo paga', 'Já definida e paga em dia', 'Ainda não foi definida'],
            },
            {
              pergunta: 'Você é quem paga ou quem recebe a pensão?',
              opcoes: ['Pago a pensão', 'Recebo a pensão'],
            },
          ],
        },
        {
          titulo: 'União estável',
          perguntas: [
            {
              pergunta: 'A união estável já é reconhecida formalmente (escritura ou contrato)?',
              opcoes: ['Sim, já é formalizada', 'Não, ainda não', 'Não tenho certeza'],
            },
            {
              pergunta: 'O que você precisa neste momento?',
              opcoes: ['Reconhecer ou formalizar a união', 'Encerrar a união', 'Outra questão relacionada'],
            },
          ],
        },
        {
          titulo: 'Regulamentação de convivência',
          perguntas: [
            {
              pergunta: 'Já existe uma decisão anterior sobre a convivência que precisa ser revista?',
              opcoes: ['Sim, existe e precisa mudar', 'Não, seria a primeira vez', 'Não tenho certeza'],
            },
          ],
        },
        {
          titulo: 'Partilha de bens',
          perguntas: [
            {
              pergunta: 'A partilha está relacionada a um divórcio em andamento, já finalizado, ou outra situação?',
              opcoes: ['Divórcio em andamento', 'Divórcio já finalizado', 'Outra situação (união estável, herança etc.)'],
            },
            {
              pergunta: 'Existem imóveis ou veículos envolvidos?',
              opcoes: ['Sim', 'Não', 'Não tenho certeza'],
            },
          ],
        },
        { titulo: 'Outros conflitos familiares' },
      ],
    },
    {
      id: 'trabalhista',
      titulo: 'Direito Trabalhista',
      texto:
        'Análise e orientação sobre situações relacionadas às relações de trabalho, buscando esclarecer direitos, deveres e alternativas jurídicas.',
      botao: 'Solicitar orientação trabalhista',
      mensagem: 'trabalhista' as const,
      imagem: 'trabalhista' as const,
      assuntosPublicados: true, // usados também como opções da triagem de contato
      assuntos: [
        {
          titulo: 'Verbas rescisórias',
          perguntas: [
            {
              pergunta: 'O pagamento das verbas já foi feito ou ainda está pendente?',
              opcoes: ['Ainda pendente', 'Foi pago, mas com valor menor que o esperado', 'Não tenho certeza'],
            },
            { pergunta: 'Há quanto tempo você foi desligado?' },
          ],
        },
        {
          titulo: 'Horas extras',
          perguntas: [
            {
              pergunta: 'Você ainda está no emprego ou já foi desligado?',
              opcoes: ['Ainda estou no emprego', 'Já fui desligado'],
            },
            {
              pergunta: 'As horas extras eram registradas em algum controle de ponto?',
              opcoes: ['Sim, em controle formal', 'Só de forma informal', 'Não havia nenhum controle'],
            },
          ],
        },
        {
          titulo: 'Reconhecimento de vínculo',
          perguntas: [
            {
              pergunta: 'Você trabalhava sem carteira assinada ou como autônomo/PJ?',
              opcoes: ['Sem carteira assinada', 'Como autônomo ou PJ', 'Outra situação'],
            },
            { pergunta: 'Há quanto tempo essa situação vem ocorrendo?' },
          ],
        },
        {
          titulo: 'Demissão',
          perguntas: [
            {
              pergunta: 'A demissão foi com justa causa, sem justa causa, ou você não tem certeza?',
              opcoes: ['Sem justa causa', 'Com justa causa', 'Não tenho certeza'],
            },
          ],
        },
        {
          titulo: 'Assédio no ambiente de trabalho',
          perguntas: [
            {
              pergunta: 'Você ainda está no ambiente onde isso aconteceu?',
              opcoes: ['Sim, ainda estou lá', 'Não, já saí de lá'],
            },
            {
              pergunta: 'Existem mensagens, testemunhas ou outros registros da situação?',
              opcoes: ['Sim', 'Não', 'Não tenho certeza'],
            },
          ],
        },
        { titulo: 'Dúvidas sobre contrato de trabalho' },
      ],
    },
  ],
  nota: 'Os assuntos atendidos são informados no contato inicial, conforme a situação apresentada.',
};

/* ---------------------------------------------------------------------------
 * TRANSIÇÕES NARRATIVAS
 * ---------------------------------------------------------------------------
 * Pequenas legendas entre seções, usadas com moderação para reforçar o fio
 * da história ao rolar a página. Deixe em branco para ocultar uma transição.
 * ------------------------------------------------------------------------ */
export const transicoes = {
  areasParaSobre: 'Conheça quem vai olhar para o seu caso',
  // Removidas a pedido: não faziam sentido nesses pontos da leitura.
  sobreParaAtendimento: '',
  atendimentoParaAvaliacoes: '',
  diferenciaisParaConteudo: '',
  reelsParaDuvidas: '',
  duvidasParaLocalizacao: '',
};

/* ---------------------------------------------------------------------------
 * SOBRE A PROFISSIONAL
 * ---------------------------------------------------------------------------
 * Os itens de `credenciais` só aparecem quando `valor` estiver preenchido.
 * Nada é inventado e nada é exibido enquanto estiver vazio.
 * ------------------------------------------------------------------------ */
export const sobre = {
  sobretitulo: 'Sobre',
  titulo: 'Um atendimento jurídico próximo, claro e responsável.',
  texto:
    'À frente da JK Advocacia, Kerabe Assis Silva oferece orientação jurídica com atenção individual, comunicação acessível e responsabilidade profissional. Antes de qualquer caminho jurídico, vem a escuta — entender com cuidado o que a pessoa está vivendo, para só então explicar as opções com clareza e respeito.',
  /** Segundo fato do revezamento — aprofunda as áreas de atuação, com ênfase em Família. Deixe em branco para ocultar. */
  areasDestaque:
    'A atuação está concentrada em Direito de Família e Direito Trabalhista, com dedicação especial à área de Família — divórcio e separação, guarda dos filhos, pensão alimentícia, união estável e partilha de bens. No Trabalhista, a orientação abrange verbas rescisórias, reconhecimento de vínculo empregatício e demais direitos do trabalhador.',
  /** Data de nascimento (ISO) — usada só para calcular a idade automaticamente, sem precisar atualizar o número a cada ano. */
  nascimento: '1999-08-21',
  /** Fato pessoal breve, exibido junto da idade no carrossel "Sobre". Deixe em branco para ocultar. */
  estado:
    'Casado, pai de um filho — uma vivência que também aproxima do dia a dia de quem procura o escritório para tratar de assuntos de família, especialmente quando há crianças envolvidas.',
  credenciais: [
    { rotulo: 'Inscrição', valor: '' }, // [NÚMERO DA OAB]
    { rotulo: 'Formação', valor: '' }, // [FORMAÇÃO]
    { rotulo: 'Especializações', valor: '' }, // [ESPECIALIZAÇÕES CONFIRMADAS]
    { rotulo: 'Experiência', valor: '' }, // [EXPERIÊNCIA PROFISSIONAL]
    { rotulo: 'Propósito do atendimento', valor: '' }, // [PROPÓSITO OU DIFERENCIAL]
  ],
};

/* ---------------------------------------------------------------------------
 * COMO FUNCIONA O ATENDIMENTO
 * ------------------------------------------------------------------------ */
export const atendimento = {
  sobretitulo: 'Como funciona',
  titulo: 'Do primeiro contato ao acompanhamento.',
  etapas: [
    {
      titulo: 'Primeiro contato',
      texto:
        'Você conta, em poucas palavras, o que está acontecendo — pelo WhatsApp ou pelo formulário do site. Não é preciso ter tudo organizado antes de escrever.',
    },
    {
      titulo: 'Entendimento do caso',
      texto:
        'As informações iniciais são analisadas com cuidado, para entender que tipo de orientação faz sentido para a sua situação específica.',
    },
    {
      titulo: 'Orientação jurídica',
      texto:
        'Você recebe uma explicação clara dos caminhos possíveis, em linguagem direta, e entende o que esperar dos próximos passos.',
    },
    {
      titulo: 'Acompanhamento',
      texto:
        'Se decidir seguir com o escritório, você acompanha o andamento do seu caso com atualizações claras em cada etapa do processo.',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * AGENDAMENTO
 * ---------------------------------------------------------------------------
 * Calendário para sugerir uma data de conversa. Não é uma reserva automática
 * — ao escolher um dia (e, opcionalmente, um período), a pessoa é levada ao
 * WhatsApp com essa preferência já escrita na mensagem, e a confirmação do
 * horário acontece diretamente na conversa, com base nos horários acima.
 * ------------------------------------------------------------------------ */
export const agendamento = {
  sobretitulo: 'Agende uma conversa',
  titulo: 'Escolha um dia para conversarmos.',
  texto:
    'Selecione uma data no calendário ao lado. Sua preferência é enviada pelo WhatsApp, e a confirmação do horário acontece diretamente na conversa.',
  botao: 'Confirmar data pelo WhatsApp',
  aviso: 'A data é uma sugestão inicial — a disponibilidade é confirmada no contato.',
};

/* ---------------------------------------------------------------------------
 * AVALIAÇÕES
 * ---------------------------------------------------------------------------
 * `depoimentos` permanece vazio até que haja autorização expressa.
 * Máximo de 3, sem alterar o sentido das palavras e sem citar processos.
 * ------------------------------------------------------------------------ */
export const avaliacoes = {
  sobretitulo: 'Reputação',
  titulo: 'Confiança construída em cada atendimento.',
  texto:
    'A avaliação pública do escritório reúne a experiência de quem já foi atendido. Os comentários permanecem no perfil do Google, em sua origem.',
  botao: 'Ver avaliações no Google',
  depoimentos: [
    {
      texto:
        'Vim imensamente agradecer ao Dr. Kerabe por abraçar a minha causa, que infelizmente aconteceu uma tragédia durante o processo. Mas seu trabalho foi impecável e super abraçou a minha causa, atencioso, cuidadoso, prestativo. Com certeza ganhou mais uma cliente e recomendo de olhos fechados. Gratidão.',
      autor: 'Cristina Saraiva',
    },
    {
      texto:
        'Muita atenção, empatia e seriedade. Dr. Kerabe esclareceu todas as minhas dúvidas, sempre com muita clareza e empatia. Fez toda diferença para que fosse resolvido o meu caso com acertividade. Recomendo!',
      autor: 'Elaine OSN',
    },
    {
      texto:
        'Um excelente advogado, estou simplesmente sem palavras pra agradecer todo empenho, dedicação e paciência ao decorrer do processo. Com certeza indicarei pra outras pessoas.',
      autor: 'Thayna Santos',
    },
  ] as { texto: string; autor: string }[],
};

/* ---------------------------------------------------------------------------
 * DIFERENCIAIS
 * ------------------------------------------------------------------------ */
export const diferenciais = {
  sobretitulo: 'O atendimento',
  titulo: 'O que orienta o trabalho da JK Advocacia.',
  itens: [
    {
      icone: 'conversa' as const,
      titulo: 'Comunicação acessível',
      texto: 'Explicações claras para que o cliente compreenda cada etapa.',
    },
    {
      icone: 'lupa' as const,
      titulo: 'Análise individual',
      texto: 'Cada situação é tratada considerando suas particularidades.',
    },
    {
      icone: 'escudo' as const,
      titulo: 'Discrição',
      texto: 'Cuidado com informações pessoais e situações sensíveis.',
    },
    {
      icone: 'coracao' as const,
      titulo: 'Proximidade',
      texto: 'Atendimento humano e atenção durante o desenvolvimento do trabalho.',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * CONTEÚDO INFORMATIVO
 * ---------------------------------------------------------------------------
 * Cartões em formato de vídeo curto, no estilo dos Reels. `href` vazio =
 * card sem link (apenas anúncio do tema). `video`/`poster` vazios = o card
 * mostra um selo "em breve" no lugar do vídeo — assim que você tiver os
 * arquivos reais, salve-os em /public/videos e /public/images e preencha
 * os campos aqui; o card passa a tocar o vídeo automaticamente.
 * ------------------------------------------------------------------------ */
export const conteudo = {
  sobretitulo: 'Conteúdo informativo',
  titulo: 'Informação para ajudar você a compreender seus direitos.',
  texto:
    'Vídeos curtos e diretos, em linguagem simples, sobre temas que aparecem com frequência no dia a dia do escritório.',
  artigos: [
    {
      tema: 'Família',
      titulo: 'Ajudou a construir o patrimônio do casal? Isso também pode pesar na partilha de bens.',
      href: '',
      video: '/videos/familia-partilha-bens.mp4',
      poster: '/images/stories/familia-partilha-bens.jpg',
    },
    {
      tema: 'Família',
      titulo: 'Presença no dia a dia também faz parte do exercício da paternidade.',
      href: '',
      video: '/videos/familia-paternidade-presente.mp4',
      poster: '/images/stories/familia-paternidade-presente.jpg',
    },
    {
      tema: 'Família',
      titulo: '3 coisas que madrasta ou padrasto não podem fazer durante a convivência.',
      href: '',
      video: '/videos/familia-madrasta-convivencia.mp4',
      poster: '/images/stories/familia-madrasta-convivencia.jpg',
    },
    {
      tema: 'Família',
      titulo: 'Pagar advogado particular não substitui o pagamento da pensão alimentícia.',
      href: '',
      video: '/videos/familia-pensao-narcisista.mp4',
      poster: '/images/stories/familia-pensao-narcisista.jpg',
    },
    {
      tema: 'Família',
      titulo: 'Como costuma ser, na prática, uma audiência de divórcio.',
      href: '',
      video: '/videos/familia-audiencia-divorcio.mp4',
      poster: '/images/stories/familia-audiencia-divorcio.jpg',
    },
    {
      tema: 'Família',
      titulo: 'Pai autônomo também paga pensão — veja como o valor costuma ser calculado.',
      href: '',
      video: '/videos/familia-pensao-autonomo.mp4',
      poster: '/images/stories/familia-pensao-autonomo.jpg',
    },
    {
      tema: 'Família',
      titulo: 'Guarda compartilhada exige acordo entre as partes — descumprir a convivência pode ter consequências sérias.',
      href: '',
      video: '/videos/familia-guarda-compartilhada.mp4',
      poster: '/images/stories/familia-guarda-compartilhada.jpg',
    },
    {
      tema: 'Trabalho',
      titulo: 'O que observar em uma rescisão trabalhista?',
      href: '',
      video: '',
      poster: '',
    },
    {
      tema: 'Trabalho',
      titulo: 'Quando pode existir reconhecimento de vínculo empregatício?',
      href: '',
      video: '',
      poster: '',
    },
  ],
  aviso:
    'Os conteúdos têm finalidade exclusivamente informativa e não substituem a análise individual de um profissional.',
};

/* ---------------------------------------------------------------------------
 * REELS DO INSTAGRAM
 * ---------------------------------------------------------------------------
 * A seção de Reels não é mais exibida no site (removida a pedido — os
 * Stories cobrem esse espaço agora), mas os dados ficam aqui, sem uso,
 * caso queira reaproveitar os links em outro lugar futuramente.
 *
 * Exemplo:
 * { url: 'https://www.instagram.com/reel/XXXXXXXXXXX/', legenda: 'O que é guarda compartilhada?' },
 * ------------------------------------------------------------------------ */
export const reels = {
  sobretitulo: 'No Instagram',
  titulo: 'Conteúdo em vídeo, direto do dia a dia do escritório.',
  texto:
    'Vídeos curtos publicados no perfil da JK Advocacia, com explicações rápidas sobre temas frequentes de Direito de Família e Direito Trabalhista.',
  botao: 'Ver mais no Instagram',
  itens: [
    { url: 'https://www.instagram.com/p/DY8ejtRxUiP/', legenda: '' },
    { url: 'https://www.instagram.com/p/DYTJMoqxafA/', legenda: '' },
    { url: 'https://www.instagram.com/p/DZGTT9uxilm/', legenda: '' },
    { url: 'https://www.instagram.com/p/DVzUd0zkSlP/', legenda: '' },
    { url: 'https://www.instagram.com/p/DWRm3j8xx7O/', legenda: '' },
    { url: 'https://www.instagram.com/p/DaBvmshRdwH/', legenda: '' },
  ] as { url: string; legenda?: string }[],
};

/* ---------------------------------------------------------------------------
 * PERGUNTAS FREQUENTES
 * ---------------------------------------------------------------------------
 * O primeiro item da lista aparece fixo na coluna esquerda da seção (já
 * respondido, sem precisar clicar). Os demais seguem no acordeão à direita.
 * ------------------------------------------------------------------------ */
export const duvidas = {
  sobretitulo: 'Dúvidas frequentes',
  titulo: 'Perguntas que costumam vir antes do primeiro contato.',
  itens: [
    {
      pergunta: 'O primeiro contato pode ser feito pelo WhatsApp?',
      resposta:
        'Sim. Você pode chamar diretamente pelo WhatsApp e contar, em poucas palavras, o que está acontecendo. A partir daí, o escritório orienta sobre os próximos passos — a análise mais detalhada acontece na conversa, com base nas informações e documentos de cada situação.',
    },
    {
      pergunta: 'Quanto custa o atendimento?',
      resposta:
        'O valor depende da complexidade de cada caso, então não é definido antes de entender a situação. Isso é esclarecido diretamente no primeiro contato, sem compromisso.',
    },
    {
      pergunta: 'Quais documentos preciso apresentar?',
      resposta:
        'Isso varia conforme o caso. Depois da primeira conversa, você recebe uma lista específica do que é necessário para começar a analisar a sua situação — não é preciso reunir nada antes disso.',
    },
    {
      pergunta: 'O escritório atende Direito de Família?',
      resposta:
        'Sim — é uma das duas áreas de atuação do escritório. Isso inclui, por exemplo, divórcio, guarda dos filhos, pensão alimentícia, união estável e partilha de bens.',
    },
    {
      pergunta: 'Também existe atendimento trabalhista?',
      resposta:
        'Sim. O escritório também atua em Direito Trabalhista, auxiliando trabalhadores em questões relacionadas ao vínculo de emprego.',
    },
    {
      pergunta: 'O resultado de um processo pode ser garantido?',
      resposta:
        'Não. Nenhum resultado jurídico pode ser garantido, pois cada situação depende de suas particularidades, documentos, provas e decisões das autoridades competentes.',
    },
    {
      pergunta: 'O atendimento é presencial?',
      resposta:
        'O escritório fica no Jardim Novo Horizonte, em São Paulo, e recebe visitas mediante agendamento prévio. O primeiro contato, porém, pode ser feito a distância, pelo WhatsApp.',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * LOCALIZAÇÃO E CONTATO
 * ------------------------------------------------------------------------ */
export const localizacao = {
  sobretitulo: 'Localização e contato',
  titulo: 'Entre em contato com a JK Advocacia',
  texto:
    'O escritório fica no Jardim Novo Horizonte, na zona sul de São Paulo, em região próxima ao Grajaú e bairros vizinhos.',
  botaoWhatsapp: 'Entrar em contato pelo WhatsApp',
  botaoRota: 'Abrir rota no mapa',
  formulario: {
    titulo: 'Prefere enviar uma mensagem por aqui?',
    texto:
      'Envie apenas as informações necessárias para o primeiro contato. Evite incluir dados sensíveis ou detalhes de processos nesta mensagem.',
    aviso:
      'Ao enviar, você concorda com o tratamento dos dados informados para fins de retorno do contato, conforme a Política de Privacidade.',
  },
};

/* ---------------------------------------------------------------------------
 * CHAMADA FINAL
 * ------------------------------------------------------------------------ */
export const chamadaFinal = {
  titulo:
    'Compreender a situação é o primeiro passo para decidir com mais segurança.',
  texto: 'Entre em contato para obter informações sobre o atendimento da JK Advocacia.',
  botao: 'Entrar em contato',
  observacao:
    'O envio de uma mensagem não estabelece automaticamente uma relação entre advogado e cliente.',
};

/* ---------------------------------------------------------------------------
 * RODAPÉ
 * ------------------------------------------------------------------------ */
export const rodape = {
  aviso:
    'As informações deste site têm caráter exclusivamente informativo e não substituem uma análise jurídica individual.',
  links: [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Aviso legal', href: '/aviso-legal' },
  ],
};
