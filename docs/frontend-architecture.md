# Organização do front-end

O projeto mantém a organização por funcionalidade. As rotas ficam em `src/routes`, as páginas de entrada em `src/pages` e a implementação de cada área em `src/features`.

## Responsabilidades

- `pages`: conectam a rota à funcionalidade e ao layout da aplicação.
- `features/<área>/<Área>.tsx`: compõem a tela e conectam os eventos dos componentes.
- `features/<área>/components`: apresentam partes com uma responsabilidade clara, recebendo dados e callbacks por propriedades.
- `features/<área>/hooks`: concentram estado e comportamento que precisam ser separados da apresentação.
- `features/<área>/data`: guardam conteúdo fixo e configurações de apresentação.
- `features/<área>/mocks`: guardam dados fictícios usados em prévias visuais.
- `features/<área>/types` e `utils`: guardam os tipos e as transformações específicas daquela funcionalidade.
- `components/shared` e `components/ui`: recebem componentes efetivamente reutilizados entre áreas.
- `utils`: reúne funções comuns, como os formatadores de moeda já existentes.

Não é necessário criar todas essas pastas em cada funcionalidade. Uma função curta usada em um único local pode continuar junto de quem a utiliza. Evite componentes intermediários e hooks que apenas repassem propriedades ou valores.