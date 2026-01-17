
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './shared/components/ToastContext';
import { useAuth } from './infra/context/AuthContext';
import { ProfileConstroller } from './presentation/ProfileController';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import Pomodoro from './components/Pomodoro';
import Login from './components/Login';


export default function App(){
  const [focusMode,setFocusMode]=useState(false);
  const [contrast,setContrast]=useState<'normal' | 'high'>('normal');
  const [spacing,setSpacing]=useState<'normal' | 'compact' | 'spacious'>('normal');
  const [fontSize,setFontSize]=useState<'normal' | 'small' | 'large'>('normal');
  const [teaMode,setTeaMode]=useState(false);
  const [dyslexiaMode,setDyslexiaMode]=useState(false);

  const [profile,setProfile]=useState<'normal'|'tea'|'dyslexia'>('normal');
  
  const { user } = useAuth();
  const profileController = new ProfileConstroller();

  // Carregar preferências do perfil do usuário ao fazer login
  useEffect(()=>{
    const loadUserPreferences = async () => {
      if (user?.user?.uid) {
        const userProfile = await profileController.getProfile(user.user.uid);
        if (userProfile?.stylePreferences) {
          const prefs = userProfile.stylePreferences;
          setFocusMode(prefs.focusMode || false);
          setContrast(prefs.contrast || 'normal');
          setSpacing(prefs.spacing || 'normal');
          setFontSize(prefs.fontSize || 'normal');
          setTeaMode(prefs.teaMode || false);
          setDyslexiaMode(prefs.dyslexiaMode || false);
          console.log("✅ Preferências carregadas do perfil");
        } else {
          // Se não houver preferências salvas, carrega do localStorage
          const saved=localStorage.getItem('prefs');
          if(saved){
            const p=JSON.parse(saved);
            setFocusMode(p.focusMode);
            setContrast(p.contrast);
            setSpacing(p.spacing);
            setFontSize(p.fontSize);
          }
        }
      } else {
        // Se não estiver logado, carrega do localStorage
        const saved=localStorage.getItem('prefs');
        if(saved){
          const p=JSON.parse(saved);
          setFocusMode(p.focusMode);
          setContrast(p.contrast);
          setSpacing(p.spacing);
          setFontSize(p.fontSize);
        }
      }
    };
    loadUserPreferences();
  },[user]);

  // Salvar preferências no localStorage e no perfil do usuário
  useEffect(()=>{
    localStorage.setItem('prefs',JSON.stringify({focusMode,contrast,spacing,fontSize}));
    
    // Salvar no perfil do usuário se estiver logado
    if (user?.user?.uid) {
      const savePreferencesToProfile = async () => {
        const userProfile = await profileController.getProfile(user.user.uid);
        if (userProfile) {
          userProfile.stylePreferences = {
            focusMode,
            contrast,
            spacing,
            fontSize,
            teaMode,
            dyslexiaMode
          };
          await profileController.updateProfile(userProfile);
          console.log("💾 Preferências salvas no perfil do usuário");
        }
      };
      savePreferencesToProfile();
    }
  },[focusMode,contrast,spacing,fontSize,teaMode,dyslexiaMode,user]);

  return(
    <ToastProvider>
      <BrowserRouter>
        <div className={`app 
          ${focusMode ? 'focus' : ''} 
          ${teaMode ? 'tea' : ''} 
          ${dyslexiaMode ? 'dyslexia' : ''} 
          ${contrast === 'high' ? 'contrast' : ''} 
          ${spacing} 
          ${fontSize}`}
>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={
              <>
                <Dashboard
                  focus={focusMode}
                  onFocusToggle={()=>setFocusMode(!focusMode)}
                  onContrast={()=>setContrast(contrast==='normal'?'high':'normal')}
                  spacing={spacing}
                  setSpacing={(v: string) => { setSpacing(v as 'normal' | 'compact' | 'spacious'); }}
                  fontSize={fontSize}
                  setFontSize={(v: string) => { setFontSize(v as 'normal' | 'small' | 'large'); }}
                  tea={teaMode}
                  onTea={()=>{ setTeaMode(!teaMode); if(!teaMode) setDyslexiaMode(false); }}
                  dyslexia={dyslexiaMode}
                  onDyslexia={()=>{ setDyslexiaMode(!dyslexiaMode); if(!dyslexiaMode) setTeaMode(false); }}
                />
                <Pomodoro/>
                <Kanban/>
              </>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}