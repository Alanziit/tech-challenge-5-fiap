# MindEase

## Descrição

MindEase é uma aplicação web desenvolvida como parte do Tech Challenge 5 da FIAP. Trata-se de uma plataforma de gerenciamento de tarefas e produtividade, com foco em acessibilidade e bem-estar cognitivo. A aplicação permite a criação, edição e organização de tarefas através de um sistema de kanban, com recursos de personalização visual e alertas cognitivos.

## Tecnologias Utilizadas

- **React**: ^18.2.0
- **Node.js**: Recomendado versão 16.x ou superior (verifique com `node --version`)
- **TypeScript**: 4.9.5
- **Firebase**: ^12.7.0 (para autenticação e armazenamento)
- **React Router DOM**: ^7.12.0 (para roteamento)
- **Canvas Confetti**: ^1.9.4 (para animações)

## Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- npm ou yarn

## Como Inicializar o Projeto

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd tech-challenge-5-fiap
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. A aplicação estará disponível em `http://localhost:3000`

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma build de produção
- `npm test`: Executa os testes
- `npm run eject`: Remove as configurações do Create React App (irreversível)

## Estrutura e Arquitetura do Projeto

O projeto segue uma arquitetura em camadas inspirada em Clean Architecture, organizada da seguinte forma:

```
src/
├── components/          # Componentes de UI (Login, Dashboard, Kanban, etc.)
├── domain/              # Camada de domínio
│   ├── entities/        # Entidades de negócio (User, Profile)
│   ├── interfaces/      # Interfaces e contratos
│   └── usecases/        # Casos de uso da aplicação
├── infra/               # Camada de infraestrutura
│   ├── cache/           # Serviço de cache (localStorage)
│   └── context/         # Contextos React (AuthContext)
├── presentation/        # Camada de apresentação
│   └── controllers/     # Controladores (UserController)
└── repository/          # Camada de repositório
    └── interfaces/      # Interfaces de repositório
```

### Principais Componentes

- **AuthContext**: Gerenciamento de autenticação com Firebase
- **CacheService**: Serviço de cache com TTL para otimização de performance
- **Kanban**: Sistema de drag-and-drop para gerenciamento de tarefas
- **Dashboard**: Painel principal com métricas e navegação
- **Pomodoro**: Timer para técnica Pomodoro

### Arquitetura de Autenticação

- Utiliza Firebase Authentication para login/cadastro
- Context API do React para gerenciamento de estado global
- Proteção de rotas baseada em estado de autenticação

### Persistência de Dados

- Firebase para autenticação e dados do usuário
- localStorage para cache e preferências locais
- Estrutura preparada para integração com APIs REST

## Funcionalidades Implementadas

- ✅ Sistema de autenticação (login/cadastro)
- ✅ Gerenciamento de tarefas com Kanban
- ✅ Drag and Drop entre colunas
- ✅ Edição inline de tarefas
- ✅ Dashboard com métricas
- ✅ Ajustes de acessibilidade (contraste, foco, espaçamento, fonte)
- ✅ Alertas cognitivos
- ✅ Persistência de dados
- ✅ Timer Pomodoro
- ✅ Cache inteligente com expiração

## Desenvolvimento

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## Licença

Este projeto é parte do Tech Challenge 5 da FIAP e segue as diretrizes do programa.
