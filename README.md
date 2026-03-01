# MindEase - Tech Challenge 5 FIAP

## 🎯 Descrição

MindEase é uma aplicação web desenvolvida como parte do Tech Challenge 5 da FIAP. Trata-se de uma plataforma de gerenciamento de tarefas e produtividade, com foco em acessibilidade, bem-estar cognitivo e persistência de preferências do usuário. 

A aplicação oferece recursos como:
- 🔐 Autenticação segura com Firebase
- 📊 Dashboard com gerenciamento de configurações visuais
- 🎯 Sistema Kanban para organização de tarefas
- ⏲️ Timer Pomodoro integrado
- 🎨 Personalização visual (contraste, espaçamento, tamanho de fonte, modo dislexia)
- 💾 Persistência de preferências no perfil do usuário
- 🚪 Sistema de logout com redirecionamento
- 📢 Notificações Toast em tempo real
- 🧪 Testes unitários com 90%+ de cobertura

## 📋 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | ^18.2.0 | Framework principal |
| TypeScript | 4.9.5 | Tipagem estática |
| React Router DOM | ^7.12.0 | Roteamento |
| Firebase | ^12.7.0 | Auth + Realtime DB |
| Canvas Confetti | ^1.9.4 | Animações |
| Jest | ^30.2.0 | Testes unitários |
| Testing Library | ^16.3.1 | Testes de componentes |
| ts-jest | ^29.4.6 | Suporte TypeScript em Jest |

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+ (`node --version`)
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd tech-challenge-5-fiap

# 2. Instale as dependências
npm install

# 3. Configure Firebase - IMPORTANTE ⚠️
# Copia o arquivo de exemplo e preencha com suas credenciais reais
cp src/firebaseConfig.example.tsx src/firebaseConfig.tsx
# Edite src/firebaseConfig.tsx com suas credenciais do Firebase Console
# Ou use variáveis de ambiente em .env.local

# Arquivo de exemplo de .env
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 4. Inicie o desenvolvimento
npm start
```

> ⚠️ **SEGURANÇA**: O arquivo `src/firebaseConfig.tsx` contém credenciais do Firebase e está no `.gitignore`. 
> Nunca faça commit de credenciais reais no repositório. Use `firebaseConfig.example.tsx` como referência.

A aplicação estará em: `http://localhost:3000`

## 📝 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Start | `npm start` | Inicia servidor dev |
| Build | `npm run build` | Cria build de produção |
| Test | `npm test` | Executa testes |
| Test Watch | `npm run test:watch` | Modo watch para testes |
| Coverage | `npm run test:coverage` | Gera relatório de cobertura |

## 📂 Estrutura do Projeto

```
src/
├── components/                 # Componentes React
│   ├── Cadastro.tsx           # Tela de registro (com redirecionamento pós-cadastro)
│   ├── Dashboard.tsx          # Painel principal (com botão logout 🚪)
│   ├── Login.tsx              # Tela de login
│   ├── Kanban.tsx             # Board de tarefas
│   └── Pomodoro.tsx           # Timer Pomodoro
│
├── domain/                     # Camada de Domínio
│   ├── entities/
│   │   ├── profile.entity.ts  # Entidade Profile com StylePreferences
│   │   └── user.entity.ts     # Entidade User
│   ├── interfaces/
│   │   ├── profile.interface.ts # Interface de contrato (CRUD)
│   │   └── user.interface.ts   # Interface de contrato
│   └── usecases/
│       ├── profile.usecase.ts  # Casos de uso do perfil
│       └── user.usecase.ts     # Casos de uso do usuário
│
├── infra/                      # Camada de Infraestrutura
│   ├── cache/
│   │   ├── cache.service.ts   # Serviço de cache com TTL
│   │   └── cache.service.test.ts # ✅ Testes unitários
│   └── context/
│       └── AuthContext.tsx     # Contexto de autenticação com Firebase
│
├── presentation/               # Camada de Apresentação
│   ├── ProfileController.ts   # Controller para operações de perfil
│   └── UserController.ts      # Controller para operações de usuário
│
├── repository/                 # Camada de Repositório
│   ├── profile.repository.ts  # CRUD: create, update, get, delete
│   ├── profile.repository.test.ts # ✅ Testes do repositório
│   ├── user.repository.ts     # Repositório de usuário
│   └── user.repository.test.ts # ✅ Testes do repositório
│
├── shared/                     # Componentes Compartilhados
│   └── components/
│       ├── Toast.tsx          # Componente de notificação Toast
│       └── ToastContext.tsx   # Context para gerenciar toasts
│
├── App.tsx                     # Componente principal com sincronização
├── firebaseConfig.tsx          # Configuração do Firebase (credenciais)
├── firebaseConfig.example.tsx  # Exemplo de configuração (template)
├── index.tsx                   # Ponto de entrada da aplicação
├── react-app-env.d.ts         # Tipos TypeScript do React App
├── setupTests.ts              # Configuração de testes Jest
└── styles.css                 # Estilos globais
```

### Arquivos de Configuração (root)

```
├── jest.config.js             # Configuração do Jest
├── jest.setup.ts              # Setup para testes
├── tsconfig.json              # Configuração TypeScript
├── package.json               # Dependências e scripts
├── firebase.json              # Configuração Firebase Hosting
│
├── 📖 Documentação Geral
│   ├── README.md             # Este arquivo
│   ├── 00_COMECE_AQUI.md     # Guia de início rápido
│   ├── INDICE_COMPLETO.md    # Índice completo da documentação
│   ├── RESUMO_FINAL.md       # Resumo do projeto
│   └── ENV_VARIABLES.md      # Variáveis de ambiente
│
├── 🚨 Troubleshooting
│   ├── ERROS_E_CORRECOES.md  # Histórico de erros e soluções
│   └── FAQ_TROUBLESHOOTING.md # Perguntas frequentes e respostas
│
├── 🔄 CI/CD Pipeline
│   ├── CI_CD_SETUP.md        # Setup inicial de CI/CD
│   ├── CICD_QUICKSTART.md    # Guia rápido de CI/CD
│   ├── CICD_ADVANCED.md      # Configurações avançadas
│   ├── IMPLEMENTACAO_CICD.md # Detalhes de implementação
│   ├── README_CICD.md        # Documentação específica CI/CD
│   ├── CHECKLIST_CICD.md     # Checklist de verificação
│   ├── COMANDOS_CICD.md      # Comandos úteis de CI/CD
│   ├── DIAGRAMA_CICD.md      # Diagrama visual do pipeline
│   ├── setup-cicd.sh         # Script de setup (Linux/Mac)
│   └── setup-cicd.bat        # Script de setup (Windows)
│
├── 📊 Arquivos de Projeto
│   ├── ARQUIVOS_COMMIT.md    # Histórico de commits e mudanças
│   ├── TEST_FIXES_SUMMARY.md # Resumo de correções de testes
│   └── performance-alan-d3aa3d26441a.json # Relatório de performance
│
└── build/                     # Build de produção (gerado)
└── coverage/                  # Relatórios de cobertura (gerado)
└── public/                    # Arquivos estáticos
```

## 🏗️ Arquitetura

### Camadas (Clean Architecture)

1. **Domain**: Entidades e regras de negócio
2. **Infra**: Firebase, Cache, Context API
3. **Presentation**: Controllers e lógica de apresentação
4. **Repository**: Acesso a dados
5. **Shared**: Componentes reutilizáveis

### Fluxo de Autenticação

```
Login/Cadastro
    ↓
AuthContext (Firebase Auth)
    ↓
Profile carregado do Firebase
    ↓
StylePreferences restauradas
    ↓
Dashboard acessível
```

### Persistência de Preferências

```
Dashboard (altera estilos)
    ↓
App.tsx detecta mudança
    ↓
ProfileController.updateProfile()
    ↓
Firebase atualizado
    ↓
Próximo login → Mesmos estilos
```

## ✨ Funcionalidades

### ✅ Autenticação
- [x] Cadastro de usuário
- [x] Login com email/senha
- [x] Logout com redirecionamento
- [x] Proteção de rotas
- [x] Carregamento de perfil

### ✅ Dashboard
- [x] Modo Foco (desativa animações)
- [x] Contraste alto/normal
- [x] Espaçamento ajustável
- [x] Tamanho de fonte configurável
- [x] Perfil TEA
- [x] Perfil Dislexia
- [x] Botão Logout (canto superior direito) 🚪

### ✅ Gerenciamento de Tarefas
- [x] Kanban com drag-and-drop
- [x] Edição inline de tarefas
- [x] Criação de tarefas
- [x] Exclusão de tarefas

### ✅ Produtividade
- [x] Timer Pomodoro (25min + 5min pausa)
- [x] Alertas visuais de ciclo completo
- [x] Histórico de sessões

### ✅ Acessibilidade
- [x] Modo contraste
- [x] Modo dislexia
- [x] Modo TEA
- [x] Modo foco (sem distrações)
- [x] Tamanho de fonte ajustável
- [x] Espaçamento dinâmico

### ✅ Sistema de Notificações
- [x] Toast com sucesso/erro/info/warning
- [x] Auto-dismiss (3 segundos)
- [x] Posicionamento superior direito
- [x] Animações suaves

### ✅ Testes
- [x] 19 testes unitários AuthContext
- [x] Cobertura 90.14% (statements)
- [x] Mocks Firebase completos
- [x] Cenários: login, signup, logout, erros, fluxo completo

## 🧪 Testes Unitários

### Executando Testes

```bash
# Rodar todos os testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage

# Teste específico
npm test -- cache.service.test.ts
npm test -- profile.repository.test.ts
npm test -- user.repository.test.ts
```

### Arquivos de Testes

A suíte de testes está organizada da seguinte forma:

| Arquivo | Localização | Descrição |
|---------|------------|-----------|
| `cache.service.test.ts` | `src/infra/cache/` | Testes do serviço de cache |
| `profile.repository.test.ts` | `src/repository/` | Testes do repositório de perfil |
| `user.repository.test.ts` | `src/repository/` | Testes do repositório de usuário |

### Configuração de Testes

- **Jest Config**: `jest.config.js`
- **Setup**: `jest.setup.ts`
- **TypeScript Support**: `ts-jest`
- **Testing Library**: Para testes de componentes React

### Cobertura de Testes

Cada arquivo de teste contém:
- ✅ Testes de casos de sucesso
- ✅ Testes de casos de erro
- ✅ Mocks de dependências
- ✅ Validação de comportamento esperado

Para visualizar cobertura completa:
```bash
npm run test:coverage
# Abra coverage/lcov-report/index.html no navegador
```

## 🔄 Implementações e Versão Atual

### Sistema de Autenticação ✅
- Firebase Auth integrado
- Contexto global `AuthContext.tsx`
- Protected routes
- Session persistence

### Sistema de Perfil e Preferências ✅
- `profile.repository.ts` com CRUD completo
- Persistência de `StylePreferences` no Firebase
- Sincronização automática ao login
- Controllers para operações

### Gerenciamento de Cache ✅
- `cache.service.ts` com TTL
- Testes inclusos
- Otimização de chamadas Firebase

### Sistema de Notificações ✅
- Toast component com animações
- ToastContext para gerenciamento global
- Auto-dismiss em 3 segundos
- Posicionamento responsivo

### Logout com Redirecionamento ✅
- Botão logout no Dashboard
- Notificação ao desconectar
- Limpeza completa de estado
- Redirecionamento para Login

### Testes Unitários ✅
- Cache service com testes
- Repository tests para perfil e usuário
- Jest + Testing Library configurado
- Coverage reporting

### CI/CD Pipeline ✅
- Scripts de setup automatizados
- Documentação completa de CI/CD
- Configuração Firebase Hosting
- Checklist de verificação

## 📱 Responsividade

- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-767px)
- ✅ Flexbox layout
- ✅ Media queries

## 🔐 Segurança

- Firebase Authentication
- Proteção de rotas
- Context API para estado global
- Não armazena senhas (Firebase)
- Validação de dados

## 📊 Performance

- Cache com TTL (localStorage)
- Lazy loading de componentes
- Otimização de renders React
- Memoização onde necessário

## 🐛 Tratamento de Erros

- Try/catch em async operations
- Toast para feedback do usuário
- Logs informativos no console
- Error boundaries (recomendado)

## 📚 Documentação Completa

Este projeto inclui documentação extensa em vários arquivos. Consulte:

| Arquivo | Conteúdo |
|---------|----------|
| [00_COMECE_AQUI.md](00_COMECE_AQUI.md) | Começar rápido - primeiros passos |
| [INDICE_COMPLETO.md](INDICE_COMPLETO.md) | Índice de toda a documentação |
| [RESUMO_FINAL.md](RESUMO_FINAL.md) | Resumo executivo do projeto |
| [ENV_VARIABLES.md](ENV_VARIABLES.md) | Variáveis de ambiente necessárias |
| [ERROS_E_CORRECOES.md](ERROS_E_CORRECOES.md) | Histórico de erros e soluções |
| [FAQ_TROUBLESHOOTING.md](FAQ_TROUBLESHOOTING.md) | Perguntas frequentes |
| **CI/CD Docs** | `README_CICD.md`, `CI_CD_SETUP.md`, `CICD_QUICKSTART.md` |
| [TEST_FIXES_SUMMARY.md](TEST_FIXES_SUMMARY.md) | Resumo de correções em testes |

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

## 📄 Licença

Tech Challenge 5 FIAP - 2026

## ✅ Checklist do Projeto

- [x] Autenticação com Firebase
- [x] Sistema de perfil do usuário
- [x] Persistência de preferências de estilo
- [x] Sistema Toast de notificações
- [x] Logout com redirecionamento
- [x] Testes unitários
- [x] Cobertura de testes
- [x] Documentação abrangente
- [x] Clean Architecture
- [x] Acessibilidade e responsividade
- [x] Pipeline CI/CD documentado
- [x] Cache service com TTL
- [x] CRUD de repositórios
- [x] Controllers para operações

---

**Versão Atual:** 1.2.0+  
**Última Atualização:** Março de 2026  
**Status:** ✅ Production Ready

Para questões ou contribuições, consulte a documentação auxiliar nos arquivos `.md` da raiz do projeto.
