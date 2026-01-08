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
  return(
    <header className="dashboard">
      <h1 className="logo">MindEase</h1>
      <p className="subtitle">Experiência cognitiva leve e guiada</p>

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