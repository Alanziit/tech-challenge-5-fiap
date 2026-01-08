import React, { useState } from 'react';

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }
      // Handle register logic here
      console.log('Register - Username:', username, 'Password:', password);
    } else {
      // Handle login logic here
      console.log('Login - Username:', username, 'Password:', password);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

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
          <label htmlFor="username" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>
            {isRegister ? 'Nome de usuário para cadastro' : 'Nome de usuário'}
          </label>
          <input
            type="text"
            id="username"
            placeholder='Insira seu do de usuário do sistema'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div style={{ marginBottom: isRegister ? '15px' : '20px' }}>
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
        {isRegister && (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>Confirmar senha do sistema</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Insira novamente a senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        )}
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
          {isRegister ? 'Realizar Cadastro' : 'Acessar Sistema'}
        </button>
        <button type="button" onClick={toggleMode} style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'transparent',
          color: '#159fd7',
          border: '1px solid #159fd7',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          {isRegister ? 'Já possui cadastro? Clique aqui para acessar o sistema' : 'Ainda não é cadastrado? Clique aqui e realize o cadastro no sistema'}
        </button>
      </form>
    </div>
  );
};

export default Login;