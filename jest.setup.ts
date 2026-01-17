import '@testing-library/jest-dom';

// Mock do Firebase App
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

// Mock do Firebase Auth
jest.mock('firebase/auth', () => ({
  initializeApp: jest.fn(),
  getApp: jest.fn(),
  getApps: jest.fn(() => []),
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  EmailAuthProvider: {
    credential: jest.fn(),
  },
  reauthenticateWithCredential: jest.fn(),
}));

// Mock do Firebase Realtime Database
jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(() => ({})),
  ref: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
}));

// Mock do Firebase Storage
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
}));

// Mock do firebaseConfig para evitar erro ao importar
// Mocka tanto o arquivo real quanto o exemplo para suportar
// desenvolvimento local e CI/CD logo após clonar o repositório
jest.mock('./src/firebaseConfig', () => ({
  app: {},
  auth: {
    currentUser: null,
  },
  storage: {},
  database: {},
}));

jest.mock('./src/firebaseConfig.example', () => ({
  app: {},
  auth: {
    currentUser: null,
  },
  storage: {},
  database: {},
}));

// Suprimir logs do console durante testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
