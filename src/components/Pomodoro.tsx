
import { useEffect,useState } from 'react';

export default function Pomodoro(){
 const [baseMinutes,setBaseMinutes]=useState(25);
 const [seconds,setSeconds]=useState(1500);
 const [running,setRunning]=useState(false);
 const [phase,setPhase]=useState<'focus'|'break'>('focus');
 const [show,setShow]=useState(false);

 useEffect(()=>{
   if(!running) return;
   const t=setInterval(()=>setSeconds(s=>s-1),1000);
   return()=>clearInterval(t);
 },[running]);

 useEffect(()=>{
  if(seconds<=0){
    setShow(true);
    if(phase==='focus'){ setPhase('break'); setSeconds(300); }
    else{ setPhase('focus'); setSeconds(baseMinutes*60); }
  }
 },[seconds,phase]);

 return(
  <div className="pomodoro">
    {show && (
      <div className="modal-overlay" onClick={()=>setShow(false)}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <h2>{phase==='focus'?'Hora de focar novamente!':'Hora de respirar um pouco!'}</h2>
          <button className="btn primary" onClick={()=>setShow(false)}>Ok</button>
        </div>
      </div>
    )}
    <h3>Pomodoro Cognitivo</h3>
    <div className="config-row">
  <label>Tempo de foco (min): </label>
  <input
    type="number"
    min={1}
    value={baseMinutes}
    onChange={(e:any)=>{
      setBaseMinutes(parseInt(e.target.value)||1);
      setSeconds((parseInt(e.target.value)||1)*60);
    }}
    className="task-input"
  />
</div>
<div className="timer">
      {String(Math.floor(seconds/60)).padStart(2,'0')}:
      {String(seconds%60).padStart(2,'0')}
    </div>
    <button className="btn add" onClick={()=>setRunning(!running)}>{running?'Pausar':'Iniciar'}</button>
    <button className="btn secondary" onClick={()=>{setRunning(false);setPhase('focus');setSeconds(baseMinutes*60);}}>Resetar</button>
  </div>
 );
}
