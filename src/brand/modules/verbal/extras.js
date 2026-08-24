export default {
    downloadName:'05-verbal-identity',
    questions:['A voz permanece reconhecível quando o canal muda?','As regras dizem o que fazer, não só o que evitar?','O tom considera o estado emocional da audiência?','Existem exemplos suficientes para alguém escrever sem depender do autor original?','As decisões de linguagem podem ser usadas por IA sem perder os guardrails?'],
    voicePrinciples:[
      {name:'Direta',do:'Chega ao ponto e deixa a próxima ação clara.',dont:'Não é brusca nem elimina contexto necessário.'},
      {name:'Especialista',do:'Explica com precisão e mostra trade-offs.',dont:'Não usa complexidade para performar superioridade.'},
      {name:'Próxima',do:'Fala com pessoas, não com “usuários abstratos”.',dont:'Não força intimidade, gíria ou excesso de informalidade.'},
      {name:'Responsável',do:'Diferencia fato, hipótese e opinião.',dont:'Não promete certeza que a marca não pode sustentar.'}
    ],
    toneContexts:[
      {id:'institutional',name:'Institucional',formality:72,warmth:52,energy:34,humor:8,directness:78,example:'Apresentamos a decisão, o contexto e os resultados esperados sem linguagem corporativa vazia.'},
      {id:'campaign',name:'Campanha',formality:34,warmth:70,energy:82,humor:34,directness:72,example:'Uma ideia forte primeiro. Depois, prova e convite claro para agir.'},
      {id:'social',name:'Social',formality:24,warmth:82,energy:72,humor:46,directness:66,example:'Mais espontânea e conversacional, sem copiar gírias ou tendências fora do território da marca.'},
      {id:'support',name:'Suporte',formality:42,warmth:88,energy:26,humor:4,directness:86,example:'Reconheça o impacto, explique o que ocorreu e dê o próximo passo.'},
      {id:'crisis',name:'Crise',formality:68,warmth:56,energy:10,humor:0,directness:94,example:'Fatos primeiro: impacto, o que sabemos, o que estamos fazendo e quando haverá nova atualização.'},
      {id:'sales',name:'Vendas',formality:46,warmth:72,energy:66,humor:18,directness:82,example:'Conecte necessidade, benefício e prova. Sem urgência artificial ou superlativos vazios.'}
    ],
    matrix:[
      ['Diretos','Grosseiros','Dizemos o essencial com contexto suficiente.'],
      ['Especialistas','Arrogantes','Usamos precisão para ajudar, não para impressionar.'],
      ['Próximos','Íntimos demais','Somos humanos sem presumir relação ou informalidade.'],
      ['Confiantes','Absolutos','Assumimos posição e deixamos limites visíveis.'],
      ['Claros','Simplistas','Reduzimos ruído sem apagar complexidade relevante.']
    ],
    beforeAfter:[
      {context:'Institucional',before:'Estamos comprometidos em entregar soluções inovadoras que potencializam resultados.',after:'Criamos este sistema para reduzir retrabalho e tornar decisões de marca mais consistentes.',why:'Troca abstração e promessa genérica por ação, propósito e efeito concreto.'},
      {context:'Suporte',before:'Oops! Parece que algo deu errado 😅',after:'Não conseguimos concluir o envio. Tente novamente em alguns minutos.',why:'Respeita a frustração e prioriza resolução.'},
      {context:'Vendas',before:'Última chance! Não perca esta oportunidade imperdível.',after:'Compare os planos e escolha o que atende melhor ao seu cenário.',why:'Remove pressão artificial e devolve controle à pessoa.'},
      {context:'Social',before:'Nós, enquanto empresa, temos o prazer de comunicar o lançamento.',after:'Chegou. Veja o que mudou e por que isso importa.',why:'Reduz formalidade e começa pela novidade.'},
      {context:'Técnico',before:'Nossa tecnologia revolucionária simplifica tudo automaticamente.',after:'Automatizamos três etapas do processo. Você ainda revisa e aprova antes de publicar.',why:'Substitui superlativo por mecanismo e limite verificável.'},
      {context:'Crise',before:'Lamentamos qualquer inconveniente e estamos trabalhando para normalizar a situação.',after:'O serviço está indisponível desde 14h20. Estamos trabalhando na recuperação e atualizaremos o status às 15h.',why:'Torna impacto, ação e próxima atualização explícitos.'}
    ],
    vocabulary:[
      ['clareza','complexidade simplificada','Use quando houver redução real de ruído ou ambiguidade.'],
      ['contexto','visão 360º','Prefira informação concreta a clichês corporativos.'],
      ['começar','dar início à sua jornada','Verbo direto para ações simples.'],
      ['ajuda','suporte especializado','Use “especializado” apenas quando isso for relevante e verdadeiro.'],
      ['decidir','tomar uma decisão assertiva','Evite intensificadores desnecessários.'],
      ['melhorar','revolucionar','Escolha o verbo proporcional à mudança real.']
    ],
    ctas:[
      ['Começar','Criar projeto','Começar agora','Evitar: Vamos nessa!'],
      ['Explorar','Ver exemplos','Explorar opções','Evitar: Saiba mais quando houver ação específica'],
      ['Aprender','Ler o guia','Entender como funciona','Evitar: Descobrir o segredo'],
      ['Comparar','Comparar planos','Ver diferenças','Evitar: Escolher o melhor sem contexto'],
      ['Ajuda','Falar com especialista','Pedir ajuda','Evitar: Fale conosco já!'],
      ['Download','Baixar guideline','Baixar template','Evitar: Clique aqui']
    ],
    channels:[
      ['Institucional','Autoridade tranquila','Dados, contexto, consequência','Jargão corporativo e autocelebração'],
      ['Campanha','Mais energia e contraste','Ideia forte + prova + ação','Promessa vazia ou barulho sem significado'],
      ['Social','Mais espontânea','Conversação, resposta, timing','Copiar gíria ou trend sem legitimidade'],
      ['Suporte','Mais empática e direta','Impacto, explicação, próximo passo','Humor em falha relevante ou culpa no cliente'],
      ['Crise','Máxima precisão','Fatos, impacto, ação, atualização','Spin, promoção, especulação ou humor'],
      ['Vendas','Confiante e útil','Necessidade, benefício, prova, CTA','Pressão artificial, medo ou superlativo']
    ]
};
