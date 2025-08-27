# Agendamento de Visitas para Museu

Este projeto é uma aplicação web para agendamento de visitas a um museu na universidade. Ele permite que os usuários criem, visualizem e excluam agendamentos de visitas.

## Estrutura do Projeto

- **src/app.ts**: Ponto de entrada da aplicação. Inicializa o aplicativo Express, configura middleware e define as rotas para o agendamento de visitas.
- **src/controllers/visitasController.ts**: Controlador que gerencia a lógica para criar, recuperar e excluir agendamentos de visitas.
- **src/routes/visitasRoutes.ts**: Define as rotas para o agendamento de visitas, utilizando o `VisitasController`.
- **src/types/index.ts**: Define as interfaces para os dados de visita e a carga útil da solicitação para criar uma visita.
- **tsconfig.json**: Configuração do TypeScript, especificando opções do compilador e arquivos a serem incluídos na compilação.
- **package.json**: Configuração do npm, listando dependências e scripts do projeto.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd agendamento-museu
   ```
3. Instale as dependências:
   ```
   npm install
   ```

## Uso

Para iniciar o servidor, execute:
```
npm start
```

O aplicativo estará disponível em `http://localhost:3000`. Você pode usar ferramentas como Postman ou Insomnia para testar as rotas de agendamento de visitas.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra um pull request ou crie uma issue para discutir mudanças.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.