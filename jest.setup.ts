import '@testing-library/jest-dom';

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

// Suprimir logs do console durante testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
