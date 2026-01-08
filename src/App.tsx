
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import Pomodoro from './components/Pomodoro';
import Profile from './pages/Profile';

export default function App(){
  const [focusMode,setFocusMode]=useState(false);
  const [contrast,setContrast]=useState('normal');
  const [spacing,setSpacing]=useState('normal');
  const [fontSize,setFontSize]=useState('normal');
  const [teaMode,setTeaMode]=useState(false);
  const [dyslexiaMode,setDyslexiaMode]=useState(false);

  const [profile,setProfile]=useState<'normal'|'tea'|'dyslexia'>('normal');

  const [page,setPage]=useState<'home'|'profile'>('home');

  useEffect(()=>{
    const saved=localStorage.getItem('prefs');
    if(saved){
      const p=JSON.parse(saved);
      setFocusMode(p.focusMode);
      setContrast(p.contrast);
      setSpacing(p.spacing);
      setFontSize(p.fontSize);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('prefs',JSON.stringify({focusMode,contrast,spacing,fontSize}));
  },[focusMode,contrast,spacing,fontSize]);

  return(
    <div className={`app 
      ${focusMode ? 'focus' : ''} 
      ${teaMode ? 'tea' : ''} 
      ${dyslexiaMode ? 'dyslexia' : ''} 
      ${contrast === 'high' ? 'contrast' : ''} 
      ${spacing} 
      ${fontSize}`}
>
      <Dashboard
        focus={focusMode}
        onFocusToggle={()=>setFocusMode(!focusMode)}
        onContrast={()=>setContrast(contrast==='normal'?'high':'normal')}
        spacing={spacing}
        setSpacing={setSpacing}
        fontSize={fontSize}
        setFontSize={setFontSize}
        tea={teaMode}
        onTea={()=>{ setTeaMode(!teaMode); if(!teaMode) setDyslexiaMode(false); }}
        dyslexia={dyslexiaMode}
        onDyslexia={()=>{ setDyslexiaMode(!dyslexiaMode); if(!dyslexiaMode) setTeaMode(false); }}
      />
      {page==='home' && <>
        <Pomodoro/>
        <Kanban/>
      </>}
      {page==='profile' && <Profile/>}
    </div>
  );
}