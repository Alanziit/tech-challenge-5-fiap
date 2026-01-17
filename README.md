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
│   │   ├── profile.entity.ts  # Interface Profile com StylePreferences
│   │   └── user.entity.ts
│   ├── interfaces/
│   │   ├── profile.interface.ts # Repo interface (CRUD completo)
│   │   └── user.interface.ts
│   └── usecases/
│       ├── profile.usecase.ts  # Casos de uso do perfil
│       └── user.usecase.ts
│
├── infra/                      # Camada de Infraestrutura
│   ├── cache/
│   │   └── cache.service.ts   # Serviço de cache com TTL
│   └── context/
│       ├── AuthContext.tsx     # Contexto de autenticação
│       └── AuthContext.test.tsx # ✅ 19 testes unitários
│
├── presentation/               # Camada de Apresentação
│   ├── ProfileController.ts   # Controller com CRUD
│   └── UserController.ts
│
├── repository/                 # Camada de Repositório
│   ├── profile.repository.ts  # CRUD: create, update, get
│   └── user.repository.ts
│
├── shared/                     # Componentes Compartilhados
│   └── components/
│       ├── Toast.tsx          # Componente de notificação
│       └── ToastContext.tsx   # Context para gerenciar toasts
│
├── App.tsx                     # Component principal com sincronização
├── firebaseConfig.tsx          # Configuração do Firebase
└── styles.css
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
npm test -- AuthContext.test.tsx
```

### Cobertura (AuthContext.tsx)

| Métrica | Cobertura | Status |
|---------|-----------|--------|
| Statements | 90.14% | ✅ Excelente |
| Branches | 50% | ✅ Threshold |
| Functions | 77.77% | ✅ Excelente |
| Lines | 88.67% | ✅ Excelente |

### Testes Implementados (19 total)

**Suite 1: Estado Inicial (2)**
- ✅ Inicialização com valores padrão
- ✅ Disponibilidade de funções

**Suite 2: Login (4)**
- ✅ Login bem-sucedido
- ✅ Falha em login
- ✅ Loading state
- ✅ Parâmetros corretos

**Suite 3: Signup (4)**
- ✅ Criação bem-sucedida
- ✅ Falha em criação
- ✅ Loading state
- ✅ Parâmetros corretos

**Suite 4: Logout (4)**
- ✅ Logout bem-sucedido
- ✅ Erro em logout
- ✅ Limpeza de dados
- ✅ Chamada Firebase

**Suite 5: Erros (3)**
- ✅ Erro de rede
- ✅ Usuário não encontrado
- ✅ Erro Firebase

**Suite 6: Hook useAuth (1)**
- ✅ Erro fora do provider

**Suite 7: Fluxo Completo (1)**
- ✅ Signup → Login → Logout

## 🔄 Recentes Implementações

### ✨ Nova: Sistema de Toast (v1.1)
- Componente `Toast.tsx` com animações
- Context `ToastContext.tsx` para gerenciamento
- Integrado em Login, Cadastro, Dashboard

### ✨ Nova: Persistência de Preferências (v1.1)
- `StylePreferences` interface adicionada ao Profile
- Sincronização automática com Firebase
- Carregamento ao login
- Fallback para localStorage

### ✨ Nova: Logout com Redirecionamento (v1.2)
- Botão logout no Dashboard (canto superior direito) 🚪
- Redirecionamento para Login
- Notificação Toast
- Limpeza de estado completa

### ✨ Nova: Testes Unitários (v1.2)
- 19 testes para AuthContext
- Jest + Testing Library configurado
- Cobertura 90%+ em AuthContext
- Mocks Firebase completos

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

## 📚 Documentação

Veja [ERROS_E_CORRECOES.md](ERROS_E_CORRECOES.md) para:
- Histórico de erros e correções
- Implementações de features
- Detalhes de testes unitários
- Cobertura de código

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

## 📄 Licença

Tech Challenge 5 FIAP - 2026

## ✅ Checklist Final

- [x] Autenticação com Firebase
- [x] Persistência de preferências
- [x] Sistema Toast compartilhado
- [x] Logout com redirecionamento
- [x] 19 testes unitários
- [x] Cobertura 90%+ (AuthContext)
- [x] Documentação atualizada
- [x] Clean Architecture
- [x] Acessibilidade
- [x] Responsividade

---

**Versão Atual:** 1.2.0  
**Última Atualização:** 17 de Janeiro de 2026  
**Status:** ✅ Production Ready
