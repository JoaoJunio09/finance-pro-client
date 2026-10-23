## Primeiros passos

`FirstSteps.tsx` coordena o nome, a aparência e a entrada no questionário. `NicknameStep`, `ThemeStep` e `ThemePreview` apresentam essas etapas; `FirstStepsProgress` apresenta a navegação. As opções de aparência ficam em `data/firstSteps.ts`, e os valores fictícios do minipainel ficam em `mocks/themePreview.ts`.

`FinancialProfileQuiz.tsx` compõe a introdução, as perguntas e a conclusão. O hook `useFinancialProfileQuiz` mantém respostas, etapa atual, retorno, revisão e avanço automático. Os componentes `QuizIntro`, `QuizQuestions`, `QuizContextPanel` e `QuizComplete` recebem os dados e as ações necessárias.

As 17 perguntas ficam em `financialProfileQuiz/data/quizQuestions.ts`; os rótulos e ícones das seis dimensões ficam em `data/quizDimensions.ts`. Esses arquivos são conteúdo do questionário, e não resultados mockados ou regras de pontuação.

Os primeiros passos continuam sendo uma prévia local: nome e respostas ficam em memória, sem envio ao backend. A seleção de aparência continua usando o `ThemeContext` existente. Não há cálculo de perfil nem persistência de respostas nessa prévia. As rotas e os destinos dos botões permanecem os mesmos.

Os CSS Modules continuam junto da funcionalidade, preservando os estilos compartilhados entre etapas e suas regras responsivas. Não é necessário duplicar esses estilos em cada componente.

Qualquer mudança futura no domínio de perfil financeiro deve seguir o documento canônico indicado no `AGENTS.md`.

## Verificação

Execute `npm run build` para validar TypeScript e gerar a aplicação, e `npm run lint` para inspecionar os diagnósticos estáticos. Para conferir os primeiros passos, abra `/primeiros-passos`; o questionário também permanece disponível em `/validacao/perfil-financeiro`.

Confira nome vazio e preenchido, temas claro e escuro, retorno pelas etapas, avanço das 17 perguntas, correção de respostas, conclusão e revisão. A ação de responder depois mantém o destino existente, `/dashboard`.