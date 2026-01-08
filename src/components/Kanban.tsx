import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

type ChecklistItem = { text:string; done:boolean };
type TaskType = { text:string; checklist:ChecklistItem[]; adding?:boolean };
type Tasks = {
  todo: TaskType[];
  doing: TaskType[];
  done: TaskType[];
};

export default function Kanban() {
  const [newTask, setNewTask] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [inputError,setInputError] = useState(false);
  const [deleteModal,setDeleteModal]=useState<{col:keyof Tasks,index:number}|null>(null);
  const [confirmDone,setConfirmDone]=useState<{col:keyof Tasks,index:number}|null>(null);

  const [globalInputAlert, setGlobalInputAlert] = useState(false);

  const globalInputTimer = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<any>(null);

  function startInactivityTimer() {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if(
        inputRef.current &&
        inputRef.current === document.activeElement &&
        inputRef.current.value.trim() === ''
      ) setShowAlert(true);
    }, 15000);
  }

  function resetAlertAndRestart() {
    setShowAlert(false);
    startInactivityTimer();
  }

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.addEventListener('focus', startInactivityTimer);
      inputRef.current.addEventListener('input', startInactivityTimer);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  /* ===============================
     GLOBAL INPUT COGNITIVE ALERT
  =============================== */
  useEffect(() => {
    function startGlobalTimer() {
      clearTimeout(globalInputTimer.current);
      globalInputTimer.current = setTimeout(() => {
        setGlobalInputAlert(true);
      }, 5000);
    }

    function clearGlobalTimer() {
      clearTimeout(globalInputTimer.current);
    }

    function handleFocusIn(e: Event) {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'INPUT') {
        startGlobalTimer();
      }
    }

    function handleInput() {
      startGlobalTimer();
    }

    function handleFocusOut() {
      clearGlobalTimer();
    }

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('input', handleInput);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      clearGlobalTimer();
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
  /* =============================== */

  function addTask() {
    if(!newTask.trim()) {
      setInputError(true);
      return;
    }

    setTasks(prev=> ({
      ...prev,
      todo:[...prev.todo, { text:newTask, checklist:[] }]
    }));

    setNewTask('');
    setInputError(false);
  }

  const [tasks, setTasks] = useState<Tasks>({
    todo: [],
    doing: [],
    done: []
  });

  function confirmDelete(){
    if(!deleteModal) return;
    const {col,index}=deleteModal;
    const updated = structuredClone(tasks);
    updated[col].splice(index,1);
    setTasks(updated);
    setDeleteModal(null);
  }

  function toggleChecklist(col:keyof Tasks, idx:number, ci:number){
    const updated = structuredClone(tasks);
    updated[col][idx].checklist[ci].done = !updated[col][idx].checklist[ci].done;
    setTasks(updated);
  }

  function enableChecklistInput(col:keyof Tasks, idx:number){
    const updated = structuredClone(tasks);
    updated[col][idx].adding = true;
    setTasks(updated);
  }

  function saveChecklist(col:keyof Tasks, idx:number, value:string){
    const updated = structuredClone(tasks);
    if(value.trim() !== ''){
      updated[col][idx].checklist.push({text:value,done:false});
    }
    updated[col][idx].adding = false;
    setTasks(updated);
  }

  function progress(t:TaskType){
    if(t.checklist.length===0) return 0;
    const done = t.checklist.filter(c=>c.done).length;
    return Math.round((done / t.checklist.length) * 100);
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, column: keyof Tasks, index: number) {
    e.dataTransfer.setData('source', JSON.stringify({ column, index }));
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>, target: keyof Tasks) {
    const raw = e.dataTransfer.getData('source');
    if (!raw) return;

    const data = JSON.parse(raw);
    if (!data) return;

    if (target === 'done') {
      setConfirmDone({ col: data.column, index: data.index });
      return;
    }

    const updated = structuredClone(tasks);
    const item = updated[data.column][data.index];

    updated[data.column].splice(data.index, 1);
    updated[target].push(item);

    setTasks(updated);
  }

  function confirmMoveToDone(){
    if(!confirmDone) return;

    const updated = structuredClone(tasks);
    const task = updated[confirmDone.col][confirmDone.index];

    task.checklist = task.checklist.map(c=>({...c,done:true}));

    updated[confirmDone.col].splice(confirmDone.index,1);
    updated.done.push(task);
    setTasks(updated);
    setConfirmDone(null);

    if(!document.querySelector('.app.tea')){
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  return (
    <section className="kanban">

      {showAlert && (
        <div className="modal-overlay" onClick={resetAlertAndRestart}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h2>⚠️ Pausa Cognitiva</h2>
            <p>Você está há bastante tempo parado nesta ação. Que tal respirar um pouco?</p>
            <button className="btn primary" onClick={resetAlertAndRestart}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {globalInputAlert && (
        <div className="modal-overlay" onClick={() => setGlobalInputAlert(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Alerta Cognitivo</h3>
            <p>
              Você está há algum tempo nesta tarefa sem interação.
              <br />
              Que tal fazer uma pequena pausa?
            </p>
            <button className="btn primary" onClick={() => setGlobalInputAlert(false)}>
              Continuar
            </button>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="modal-overlay" onClick={()=>setDeleteModal(null)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h3>Excluir tarefa?</h3>
            <p>Tem certeza que deseja excluir esta tarefa?</p>
            <div style={{display:"flex",gap:"10px"}}>
              <button className="btn danger" onClick={confirmDelete}>Sim</button>
              <button className="btn secondary" onClick={()=>setDeleteModal(null)}>Não</button>
            </div>
          </div>
        </div>
      )}

      {confirmDone && (
        <div className="modal-overlay" onClick={()=>setConfirmDone(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>Concluir tarefa?</h3>
            <p>
              Ao mover a tarefa para concluído, ela não poderá mais ser movimentada.
              <br/>Confirma?
            </p>
            <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
              <button className="btn primary" onClick={confirmMoveToDone}>Confirmar</button>
              <button className="btn secondary" onClick={()=>setConfirmDone(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="add-area">
        <input
          ref={inputRef}
          value={newTask}
          onChange={e => {
            setNewTask(e.target.value);
            if(e.target.value.trim() !== '') setInputError(false);
          }}
          placeholder={inputError ? "Nome da tarefa obrigatório" : "Digite uma tarefa..."}
          className={`task-input ${inputError ? "error" : ""}`}
        />
        <button className="btn add" onClick={addTask}>Adicionar</button>
      </div>

      {Object.entries(tasks).map(([key, list]) => {
        const typedKey = key as keyof Tasks;
        return (
          <div
            className="column"
            key={key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, typedKey)}
          >
            <h3>{key === 'todo' ? 'A Fazer' : key === 'doing' ? 'Em Progresso' : 'Concluído'}</h3>

            {list.map((task, i) => (
              <div
                className={`card ${key === 'done' ? 'done' : ''}`}
                key={i}
                draggable={key !== 'done'}
                onDragStart={(e) => onDragStart(e, typedKey, i)}
              >
                <div className="task-header">
                  <span>{task.text}</span>
                  <button className="delete-btn" onClick={()=>setDeleteModal({col:typedKey,index:i})}>🗑️</button>
                </div>

                {key !== 'done' && !task.adding && (
                  <button className="btn tiny" onClick={()=>enableChecklistInput(typedKey,i)}>
                    + Adicionar checklist
                  </button>
                )}

                {task.adding && (
                  <input
                    autoFocus
                    className="task-input"
                    placeholder="Digite o item"
                    onBlur={(e)=>saveChecklist(typedKey,i,e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key==="Enter"){
                        saveChecklist(typedKey,i,(e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                )}

                {task.checklist.length > 0 && (
                  <>
                    <div className="progress-bar">
                      <div className="progress" style={{width:progress(task)+'%'}} />
                    </div>

                    <ul className="checklist">
                      {task.checklist.map((c,ci)=>(
                        <li key={ci}>
                          <input
                            className="check"
                            type="checkbox"
                            checked={c.done}
                            onChange={()=>toggleChecklist(typedKey,i,ci)}
                          />
                          {c.text}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
