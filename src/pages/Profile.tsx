
import { useEffect,useState } from 'react';

export default function Profile(){
 const [data,setData]=useState<any>({needs:'',routine:'',support:'leve'});

 useEffect(()=>{
  const saved=localStorage.getItem('profile');
  if(saved) setData(JSON.parse(saved));
 },[]);

 function save(){
  localStorage.setItem('profile',JSON.stringify(data));
  alert('Perfil salvo com sucesso');
 }

 return(
  <section className="profile">
    <h2>Perfil Cognitivo</h2>

    <textarea
      placeholder="Necessidades específicas"
      value={data.needs}
      onChange={e=>setData({...data,needs:e.target.value})}
    />

    <textarea
      placeholder="Rotina de estudo/trabalho"
      value={data.routine}
      onChange={e=>setData({...data,routine:e.target.value})}
    />

    <select value={data.support} onChange={e=>setData({...data,support:e.target.value})}>
      <option value="leve">Suporte leve</option>
      <option value="moderado">Suporte moderado</option>
      <option value="intenso">Suporte intenso</option>
    </select>

    <button className="btn primary" onClick={save}>Salvar</button>
  </section>
 );
}
