import React, { useState } from 'react';
import { useAuth } from '../infra/context/AuthContext';
import { Profile } from '../domain/entities/profile.entity';
import { ProfileConstroller } from '../presentation/ProfileController';

const Cadastro: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const profileController = new ProfileConstroller();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const signupResult = await signup(email, password);

    if (!signupResult) {
      return;
    }

    const { user } = signupResult;

    const profile: Profile = {
      userName: username,
      id: user.uid,
      dataCriacao: new Date,
    };

    const resp = await profileController.createProfile(profile);

    if (resp) {
      console.log("Perfil criado com sucesso!");
    }
    console.log('Cadastro - Username:', username, 'Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);

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
        <h2 style={{ color: '#000000', marginBottom: '20px' }}>MindEase - Cadastro</h2>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>
            Nome de usuário para cadastro
          </label>
          <input
            type="text"
            id="username"
            placeholder='Insira seu nome de usuário do sistema'
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
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>
            Email para cadastro
          </label>
          <input
            type="email"
            id="email"
            placeholder='Insira seu email'
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
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>Senha do sistema</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder='Insira a senha para cadastro'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                paddingRight: '40px',
                border: '1px solid #159fd7',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', color: '#000000', marginBottom: '5px' }}>Confirmar senha do sistema</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder='Insira novamente a senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                paddingRight: '40px',
                border: '1px solid #159fd7',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button  type="submit" onClick={handleSubmit} style={{
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
          Realizar Cadastro
        </button>
        {onBack && (
          <button type="button" onClick={onBack} style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'transparent',
            color: '#159fd7',
            border: '1px solid #159fd7',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Realizar Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Cadastro;