import React, { useState } from 'react';
import App from '../App';
import Cadastro from './Cadastro';
import { useAuth } from '../infra/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../shared/components/ToastContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCadastro, setShowCadastro] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isLogged = await login(email, password);

    if (isLogged) {
      addToast("Login realizado com sucesso!", "success");
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } else {
      addToast("Erro ao realizar login. Verifique suas credenciais.", "error");
    }
  };

  if (showCadastro) {
    return <Cadastro onBack={() => setShowCadastro(false)} />;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom, #e0f7ff 0%, #ffffff 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#FFF',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#000000', marginBottom: '20px' }}>MindEase</h2>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder='Insira seu email do sistema'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #159fd7',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>Senha do sistema</label>
          <input
            type="password"
            id="password"
            placeholder='Insira a senha cadastrada no sistema'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #159fd7',
              borderRadius: '4px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#159fd7',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}>
          Acessar Sistema
        </button>
        <button type="button" onClick={() => setShowCadastro(true)} style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'transparent',
          color: '#159fd7',
          border: '1px solid #159fd7',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Login;