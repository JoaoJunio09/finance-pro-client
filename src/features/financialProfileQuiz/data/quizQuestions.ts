import type { QuizQuestion } from "../types/quiz";

const frequencyOptions = [
  "Nunca",
  "Raramente",
  "Às vezes",
  "Frequentemente",
  "Quase sempre",
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    eyebrow: "Seu ponto de partida",
    title:
      "Nos últimos três meses, como ficaram seus gastos em relação ao dinheiro que entrou?",
    helper: "Pense no conjunto dos meses, não em um mês fora da curva.",
    dimension: "Segurança financeira",
    options: [
      "Gastaram bem menos do que entrou",
      "Gastaram um pouco menos",
      "Ficaram praticamente iguais",
      "Gastaram um pouco mais",
      "Gastaram bem mais",
      "Não sei dizer",
    ],
  },
  {
    id: 2,
    eyebrow: "Seu ponto de partida",
    title: "Nesse mesmo período, como foi o pagamento das suas contas?",
    dimension: "Segurança financeira",
    options: [
      "Todas foram pagas antes ou no prazo",
      "Quase todas foram pagas no prazo",
      "Algumas atrasaram",
      "Várias atrasaram",
      "Precisei deixar alguma conta sem pagar",
    ],
  },
  {
    id: 3,
    eyebrow: "Seu ponto de partida",
    title: "Depois dos gastos essenciais e compromissos do mês, normalmente…",
    dimension: "Segurança financeira",
    options: [
      "Sobra uma quantia confortável",
      "Sobra um pouco",
      "Fico praticamente no zero",
      "Falta um pouco",
      "Preciso recorrer a crédito, empréstimo ou atraso de contas",
    ],
  },
  {
    id: 4,
    eyebrow: "Quando algo sai do plano",
    title:
      "Se aparecesse hoje uma despesa inesperada de cerca de 20% da sua renda mensal, o que aconteceria?",
    helper: "Não precisa fazer contas exatas. Escolha o cenário mais provável.",
    dimension: "Resiliência",
    options: [
      "Eu pagaria usando uma reserva",
      "Conseguiria pagar reorganizando o mês",
      "Parcelaria, mas manteria as outras contas",
      "Precisaria adiar uma conta ou pedir dinheiro emprestado",
      "Eu não saberia o que fazer",
    ],
  },
  {
    id: 5,
    eyebrow: "Quando algo sai do plano",
    title:
      "Se sua principal fonte de renda parasse hoje, por quanto tempo manteria os gastos essenciais?",
    dimension: "Resiliência",
    options: [
      "Menos de uma semana",
      "Algumas semanas",
      "De um a três meses",
      "De três a seis meses",
      "Mais de seis meses",
      "Não sei dizer",
    ],
  },
  {
    id: 6,
    eyebrow: "Seu jeito de acompanhar",
    title: "Eu acompanho quanto ainda posso gastar antes do fim do mês.",
    helper: "Escolha o que mais se aproxima da sua rotina atual.",
    dimension: "Organização e controle",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 7,
    eyebrow: "Seu jeito de acompanhar",
    title: "Eu sei quais contas e compromissos ainda estão por vencer.",
    dimension: "Organização e controle",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 8,
    eyebrow: "Seu jeito de acompanhar",
    title: "Quando defino uma meta financeira, separo algum valor para ela.",
    dimension: "Organização e controle",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 9,
    eyebrow: "Seu jeito de acompanhar",
    title:
      "Evito olhar o saldo, a fatura ou as contas quando acho que não vou gostar do que verei.",
    dimension: "Organização e controle",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 10,
    eyebrow: "Quando aparece algo que você quer",
    title:
      "Antes de uma compra não essencial de valor relevante, o que mais costuma acontecer?",
    dimension: "Regulação de impulsos",
    options: [
      "Espero um pouco e penso se ainda quero comprar",
      "Comparo opções e verifico se cabe no orçamento",
      "Compro se parecer que consigo pagar",
      "Compro e reorganizo as contas depois",
      "Geralmente compro sem verificar o impacto",
    ],
  },
  {
    id: 11,
    eyebrow: "Quando aparece algo que você quer",
    title: "Com que frequência você faz uma compra não planejada e depois se arrepende?",
    dimension: "Regulação de impulsos",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 12,
    eyebrow: "Quando aparece algo que você quer",
    title:
      "Estresse, ansiedade, tédio ou pressão de outras pessoas fazem você gastar mais do que pretendia?",
    dimension: "Regulação de impulsos",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 13,
    eyebrow: "Escolhas e prioridades",
    title:
      "Com que frequência você mantém um gasto de lazer mesmo sabendo que existe uma conta importante pendente?",
    helper: "Sem julgamento — o contexto também importa.",
    dimension: "Equilíbrio e liberdade",
    layout: "scale",
    options: [...frequencyOptions, "Não se aplica"],
  },
  {
    id: 14,
    eyebrow: "Presente e futuro",
    title:
      "Quando entra um dinheiro que você não esperava, qual opção mais se parece com você?",
    dimension: "Orientação para o futuro",
    options: [
      "Guardo ou uso para reduzir dívidas",
      "Divido entre objetivos futuros e algo para aproveitar agora",
      "Planejo alguma compra ou experiência",
      "Costumo gastar livremente enquanto está disponível",
      "Depende muito da situação",
    ],
  },
  {
    id: 15,
    eyebrow: "Presente e futuro",
    title: "Qual frase mais combina com você atualmente?",
    dimension: "Orientação para o futuro",
    options: [
      "Abro mão de algumas coisas agora para ter mais segurança no futuro",
      "Equilibro o que quero hoje com meus planos futuros",
      "Aproveito o presente, desde que minhas contas estejam cobertas",
      "Priorizo o presente e resolvo o restante depois",
    ],
  },
  {
    id: 16,
    eyebrow: "Dinheiro também precisa permitir viver",
    title:
      "Com que frequência você deixa de comprar algo essencial para manter gastos com lazer, compras ou experiências?",
    dimension: "Equilíbrio e liberdade",
    layout: "scale",
    options: frequencyOptions,
  },
  {
    id: 17,
    eyebrow: "Seu retrato, hoje",
    title: "Qual destas situações mais representa sua vida neste momento?",
    helper: "Última pergunta. Escolha a que parece mais verdadeira agora.",
    dimension: "Equilíbrio e liberdade",
    options: [
      "Cuido tanto do futuro que às vezes não aproveito o presente",
      "Aproveito o presente sem comprometer meus planos",
      "Às vezes exagero, mas normalmente consigo me reorganizar",
      "Frequentemente gasto mais do que pretendia",
      "Minhas decisões de gasto estão prejudicando compromissos importantes",
    ],
  },
];
