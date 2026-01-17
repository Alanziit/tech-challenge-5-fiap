import { useAuth } from "../infra/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../shared/components/ToastContext";

interface Props{
  focus:boolean;
  onFocusToggle:()=>void;

  onContrast:()=>void;

  spacing:string;
  setSpacing:(v:string)=>void;

  fontSize:string;
  setFontSize:(v:string)=>void;

  tea:boolean;
  onTea:()=>void;

  dyslexia:boolean;
  onDyslexia:()=>void;
}

export default function Dashboard(props:Props){
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      addToast("Logout realizado com sucesso!", "success");
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      addToast("Erro ao fazer logout. Tente novamente.", "error");
    }
  };

  return(
    <header className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <h1 className="logo">MindEase</h1>
          <p className="subtitle">Experiência cognitiva leve e guiada</p>
        </div>
        <button
          className="btn secondary"
          onClick={handleLogout}
          style={{
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.3s',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
          title="Sair do sistema"
        >
          🚪 Logout
        </button>
      </div>

      <div className="controls">

        <button className="btn secondary" onClick={props.onFocusToggle}>
          {props.focus ? 'Desativar Modo Foco' : 'Modo Foco'}
        </button>

        <button className="btn secondary" onClick={props.onContrast}>
          Contraste
        </button>

        <select
          className="styled-select"
          value={props.spacing}
          onChange={e=>props.setSpacing(e.target.value)}
        >
          <option value="compact">Compacto</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Espaçado</option>
        </select>

        <select
          className="styled-select"
          value={props.fontSize}
          onChange={e=>props.setFontSize(e.target.value)}
        >
          <option value="small">Pequena</option>
          <option value="normal">Normal</option>
          <option value="large">Grande</option>
        </select>

        <button className="btn secondary" onClick={props.onTea}>
          {props.tea ? 'Perfil TEA Ativo' : 'Perfil TEA'}
        </button>

        <button className="btn secondary" onClick={props.onDyslexia}>
          {props.dyslexia ? 'Perfil Dislexia Ativo' : 'Perfil Dislexia'}
        </button>

      </div>
    </header>
  );
}