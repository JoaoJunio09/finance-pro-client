# Instruções do projeto Capto

## Código

- Não adicione complexidade nas tarefas simples;
- Não crie códigos ou adicione informações redundantes;
- Evite código "sujo", e mantenha a organização do código para garantir uma boa leitura e a manutenibilidade;
- Siga rigorosamente a arquitura da aplicação: architeture by feature;
- Componentes (Visual), Hooks (Lógica), Styles CSS (Estilos de cores/animações);
- Não misture arquivos .tsx/.ts com .module.css, cada um deve ficar em um pacote responsável por si mesmo para garantir a boa prática da arquitetura da aplicação;
- Está permitido misturar arquivos .tsx/.ts com .module.css em casos específicos como: Componentes compartilhados(Layout, Ui, Shared) mas cada um deve ficar em seu pacote.

## Instruções Geral:

Antes de criar ou alterar telas, textos, cálculos, alertas ou personalizações relacionados a perfil financeiro, leia integralmente a especificação canônica em:

`../../../ws-intelliJ/financePro/docs/perfil-financeiro-capto.md`

Princípios obrigatórios:

- o Índice Financeiro Geral do Capto é a média das seis dimensões;
- o perfil financeiro é formado pela combinação das dimensões e regras críticas, não apenas pela média;
- as dimensões são Segurança, Resiliência, Organização e controle, Regulação de impulsos, Orientação para o futuro e Equilíbrio e liberdade;
- resultados descrevem o momento e o comportamento, nunca a identidade ou o valor da pessoa;
- o índice próprio do Capto não pode ser chamado de I-SFB;
- o usuário deve poder revisar respostas e discordar do perfil com acolhimento;
- gasto de lazer isolado não caracteriza irresponsabilidade.

Se a especificação canônica não estiver disponível no ambiente, não invente regras de cálculo: solicite ou recupere o documento antes de implementar o domínio de perfil financeiro.


## Primeiros passos e questionário de vida financeira:

Quando estiver trabalhando no questionário e primeiros passos do usuário, acesse e leia integralmente as intruções referentes para ter como base:

`../../../ws-intelliJ/financePro/docs/first-steps-and-quiz.md`