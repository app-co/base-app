module.exports = function (plop) {
  // cria um novo componente
  plop.setGenerator('Novo Componente', {
    description: 'Gerador para criar um novo componente React',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome do componente?',
      },
      {
        type: 'list',
        name: 'tipoAcao',
        message: 'Qual tipo de ação você quer criar?',
        choices: ['cmp-app', 'full-app', 'page-app', 'excluir'],
      },
    ],
    actions(dados) {
      let actions = [];

      // adiciona uma ação com base na escolha do usuário
      if (dados.tipoAcao === 'cmp-app') {
        actions = [
          {
            type: 'add',
            path: '../src/components/{{pascalCase name}}/index.tsx',
            templateFile: 'templates/index.tsx.hbs',
          },

          {
            type: 'add',
            path: '../src/components/{{pascalCase name}}/styles.ts',
            templateFile: 'templates/styles.ts.hbs',
          },
        ];
      } else if (dados.tipoAcao === 'full-app') {
        actions = [
          {
            type: 'add',
            path: '../src/components/{{pascalCase name}}Comp/index.tsx',
            templateFile: 'templates/index.tsx.hbs',
          },

          {
            type: 'add',
            path: '../src/components/{{pascalCase name}}Comp/styles.ts',
            templateFile: 'templates/styles.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/pages/{{pascalCase name}}/index.tsx',
            templateFile: 'templates/index.tsx.hbs',
          },

          {
            type: 'add',
            path: '../src/pages/{{pascalCase name}}/styles.ts',
            templateFile: 'templates/styles.ts.hbs',
          },
        ];
      } else if (dados.tipoAcao === 'page-app') {
        actions = [
          {
            type: 'add',
            path: '../src/pages/{{pascalCase name}}/index.tsx',
            templateFile: 'templates/index.tsx.hbs',
          },

          {
            type: 'add',
            path: '../src/pages/{{pascalCase name}}/styles.ts',
            templateFile: 'templates/styles.ts.hbs',
          },
        ];
      }

      return actions;
    },
  });
};
