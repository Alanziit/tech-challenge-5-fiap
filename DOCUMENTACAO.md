# 📚 MindEase - Documentação Completa do Projeto

**Versão:** 1.2.0  
**Data:** Março de 2026  
**Status:** ✅ Production Ready

---

## 📑 Índice

1. [Início Rápido](#-início-rápido)
2. [Estrutura do Projeto](#-estrutura-do-projeto)
3. [Tecnologias](#-tecnologias)
4. [Instalação e Setup](#-instalação-e-setup)
5. [Testes Unitários](#-testes-unitários)
6. [CI/CD Pipeline](#-cicd-pipeline)
7. [Variáveis de Ambiente](#-variáveis-de-ambiente)
8. [Troubleshooting](#-troubleshooting)
9. [Arquitetura](#-arquitetura)
10. [Contribuindo](#-contribuindo)

---

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ (`node --version`)
- npm ou yarn
- Conta Firebase com projeto criado

### Instalação em 3 Passos

```bash
# 1. Clone e instale dependências
git clone <url-do-repositorio>
cd tech-challenge-5-fiap
npm install

# 2. Configure Firebase
cp src/firebaseConfig.example.tsx src/firebaseConfig.tsx
# Edite src/firebaseConfig.tsx com suas credenciais

# 3. Inicie o servidor
npm start
```

A aplicação abrirá em `http://localhost:3000`

---

## 📂 Estrutura do Projeto

### Diretórios Principais

```
src/
├── components/              # Componentes React
│   ├── Cadastro.tsx        # Tela de registro
│   ├── Dashboard.tsx       # Painel principal
│   ├── Login.tsx           # Tela de login
│   ├── Kanban.tsx          # Gerenciador de tarefas
│   └── Pomodoro.tsx        # Timer Pomodoro
│
├── domain/                  # Camada de Domínio (Clean Architecture)
│   ├── entities/           # Entidades do negócio
│   │   ├── profile.entity.ts
│   │   └── user.entity.ts
│   ├── interfaces/         # Contratos
│   │   ├── profile.interface.ts
│   │   └── user.interface.ts
│   └── usecases/           # Casos de uso
│       ├── profile.usecase.ts
│       └── user.usecase.ts
│
├── infra/                   # Camada de Infraestrutura
│   ├── cache/
│   │   ├── cache.service.ts
│   │   └── cache.service.test.ts
│   └── context/
│       └── AuthContext.tsx  # Contexto de autenticação
│
├── presentation/            # Camada de Apresentação
│   ├── ProfileController.ts
│   └── UserController.ts
│
├── repository/              # Camada de Repositório
│   ├── profile.repository.ts
│   ├── profile.repository.test.ts
│   ├── user.repository.ts
│   └── user.repository.test.ts
│
├── shared/                  # Componentes Compartilhados
│   └── components/
│       ├── Toast.tsx        # Notificações
│       └── ToastContext.tsx # Gerenciador de toasts
│
├── App.tsx                  # Componente principal
├── firebaseConfig.tsx       # Credenciais Firebase
├── index.tsx               # Entrada da app
└── styles.css              # Estilos globais

📦 Raiz
├── jest.config.js          # Configuração Jest
├── jest.setup.ts           # Setup de testes
├── tsconfig.json           # Configuração TypeScript
├── package.json            # Dependências e scripts
├── firebase.json           # Configuração Firebase Hosting
├── .firebaserc             # ID do projeto Firebase
└── setup-cicd.{sh,bat}     # Scripts de setup CI/CD
```

---

## 🛠️ Tecnologias

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

---

## 📥 Instalação e Setup

### 1. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie ou selecione um projeto
3. Vá para **Project Settings** → **General**
4. Role até **Your apps** e clique em **Web** (ícone `</>``)
5. Copie as credenciais exibidas

**Arquivo `src/firebaseConfig.tsx`:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
```

### 2. Variáveis de Ambiente (Opcional)

Crie `.env.local` na raiz:
```env
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu-projeto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### 3. Scripts Disponíveis

```bash
npm start              # Inicia servidor de desenvolvimento
npm run build          # Build de produção
npm test               # Executa todos os testes
npm run test:watch    # Modo watch para testes
npm run test:coverage # Gera relatório de cobertura

# CI/CD
./setup-cicd.sh       # Setup CI/CD (Mac/Linux)
.\setup-cicd.bat      # Setup CI/CD (Windows)
```

---

## 🧪 Testes Unitários

### Arquivos de Teste

O projeto inclui testes em:
- `src/infra/cache/cache.service.test.ts` - Testes do serviço de cache
- `src/repository/profile.repository.test.ts` - Testes do repositório de perfil
- `src/repository/user.repository.test.ts` - Testes do repositório de usuário

### Executando Testes

```bash
# Todos os testes
npm test

# Modo watch (reexecuta ao salvar)
npm run test:watch

# Com cobertura de código
npm run test:coverage

# Teste específico
npm test -- cache.service.test.ts
```

### Visualizar Cobertura

```bash
npm run test:coverage
# Abra: coverage/lcov-report/index.html
```

### Configuração Jest

- **Config:** `jest.config.js`
- **Setup:** `jest.setup.ts`
- **TypeScript:** Usando `ts-jest`
- **Testing Library:** Para testes de componentes React

---

## 🔄 CI/CD Pipeline

### O que é Implementado

✅ **Build Automático** - Instala dependências e compila código  
✅ **Testes Automáticos** - Executa suite de testes  
✅ **Deploy Firebase** - Deploy automático no Firebase Hosting  
✅ **Trigger em Push** - Dispara ao fazer push para main/develop  

### Como Configurar

#### Opção 1: Automática (Recomendado)

**Windows:**
```bash
.\setup-cicd.bat
```

**Mac/Linux:**
```bash
chmod +x setup-cicd.sh
./setup-cicd.sh
```

#### Opção 2: Manual

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá para **Project Settings** → **Service Accounts**
4. Clique em **Generate New Private Key** e salve o JSON

No GitHub:
1. Vá para seu repositório
2. **Settings** → **Secrets and variables** → **Actions**
3. Adicione estes secrets:

| Nome | Valor |
|------|-------|
| `FIREBASE_PROJECT_ID` | `seu-projeto-id` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Conteúdo do arquivo JSON |

### Verificar Status

1. Vá para **Actions** no seu repositório
2. Veja os workflows em execução
3. Ao completar, seu app estará em: `https://SEU_PROJECT_ID.firebaseapp.com`

### Deploy Manual

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## 📝 Variáveis de Ambiente

### Para Desenvolvimento

Arquivo `.env.local`:
```env
# Firebase
REACT_APP_FIREBASE_API_KEY=AIzaSyD...
REACT_APP_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu-projeto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123def456

# App Config
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### Para Produção (GitHub Secrets)

- `FIREBASE_PROJECT_ID` - ID do projeto
- `FIREBASE_SERVICE_ACCOUNT_JSON` - Chave de serviço (JSON completo)

---

## 🐛 Troubleshooting

### ❓ Como encontrar credenciais Firebase?

1. Firebase Console → Seu projeto
2. ⚙️ Project Settings → **General**
3. Role até **Your apps**
4. Clique em **Config** do app web
5. Copie as credenciais

### ❓ Erro "Cannot find module 'react'"

```bash
npm install
```

### ❓ Testes não funcionam

```bash
npm install
npm test -- --clearCache
npm test
```

### ❓ Build falha com erro TypeScript

Verifique `tsconfig.json` está correto e execute:
```bash
npm run build
```

### ❓ App não conecta ao Firebase

1. Verifique `src/firebaseConfig.tsx` tem credenciais corretas
2. Confirme que Firebase Realtime Database está habilitado
3. Verifique regras de segurança (Rules) no Firebase

### ❓ GitHub Actions falhando

1. Verifique se secrets estão configurados corretamente
2. Confirme Service Account Key está válida
3. Consulte logs em: GitHub → Actions → Seu workflow

### ❓ Posso usar branches diferentes de `main`?

Sim! Edite `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: [main, develop, staging]
```

### ❓ Como fazer deploy manual?

```bash
firebase login
firebase deploy
```

### ❓ Verificar app em produção

Acesse: `https://SEU_PROJECT_ID.firebaseapp.com`

---

## 🏗️ Arquitetura

### Clean Architecture

O projeto segue princípios de Clean Architecture com 5 camadas:

```
┌─────────────────────────┐
│   Components (React)    │ ← UI
├─────────────────────────┤
│   Presentation          │ ← Controllers
├─────────────────────────┤
│   Repository            │ ← Padrão Repository
├─────────────────────────┤
│   Infra (Firebase)      │ ← Cache, Context
├─────────────────────────┤
│   Domain (Use Cases)    │ ← Lógica de negócio
└─────────────────────────┘
```

### Fluxo de Autenticação

```
Login/Signup
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
StateChange detectada
    ↓
ProfileController.updateProfile()
    ↓
Firebase atualizado
    ↓
Próximo login → Mesmos estilos
```

---

## ✨ Funcionalidades

### ✅ Autenticação
- Cadastro de usuário
- Login com email/senha
- Logout com redirecionamento
- Proteção de rotas

### ✅ Dashboard
- Modo Foco (desativa animações)
- Contraste alto
- Espaçamento ajustável
- Tamanho de fonte configurável
- Perfil TEA
- Perfil Dislexia

### ✅ Gerenciamento de Tarefas
- Kanban com drag-and-drop
- Edição inline
- Criação e exclusão de tarefas

### ✅ Produtividade
- Timer Pomodoro (25min + 5min pausa)
- Alertas visuais
- Histórico de sessões

### ✅ Acessibilidade
- Modo contraste
- Modo dislexia
- Modo TEA
- Modo foco
- Tamanho de fonte ajustável
- Espaçamento dinâmico

### ✅ Sistema de Notificações
- Toast com sucesso/erro/info/warning
- Auto-dismiss (3 segundos)
- Posicionamento responsivo

---

## 🤝 Contribuindo

### Fluxo de Desenvolvimento

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Faça suas mudanças
4. Execute testes: `npm test`
5. Commit: `git commit -m 'feat: descrição da feature'`
6. Push: `git push origin feature/sua-feature`
7. Abra um Pull Request

### Padrões de Commit

```
feat: adiciona nova feature
fix: corrige bug
docs: atualiza documentação
test: adiciona testes
refactor: refatora código
```

---

## 📊 Performance

- Cache com TTL (localStorage)
- Lazy loading de componentes
- Otimização de renders React
- Memoização estratégica

---

## 🔐 Segurança

- Firebase Authentication
- Proteção de rotas com Context
- Credenciais não são commitadas (`.gitignore`)
- Validação de dados em todas as camadas
- Secrets seguros em GitHub

---

## 📱 Responsividade

- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-767px)

---

## 📄 Licença

Tech Challenge 5 FIAP - 2026

---

## ✅ Checklist de Implementação

- [x] Autenticação com Firebase
- [x] Sistema de perfil do usuário
- [x] Persistência de preferências
- [x] Sistema Toast de notificações
- [x] Logout com redirecionamento
- [x] Testes unitários
- [x] Cobertura de testes
- [x] Clean Architecture
- [x] Acessibilidade
- [x] Responsividade
- [x] Pipeline CI/CD
- [x] Cache service com TTL
- [x] CRUD de repositórios
- [x] Controllers

---

**Versão:** 1.2.0  
**Última Atualização:** Março de 2026  
**Status:** ✅ Production Ready
