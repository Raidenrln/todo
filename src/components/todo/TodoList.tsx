import { Calendar, Timer, Trash2, Pencil, Save } from 'lucide-react';
import { type TodoModel, useTodos } from "../../context/TodoContext";
import { useState } from 'react';
const TodoList = () => {
  const { todos, handleEdit, handleSave } = useTodos();
  const [editingTodo, setEditingTodo] = useState<TodoModel | null>(null)

  const startEditing = (todo: TodoModel) => {
    setEditingTodo({...todo})
  }
  const saveEdit = () => {
    if(!editingTodo) return
    handleSave(editingTodo);
    setEditingTodo(null)
  }
  if(!todos){
    return
  }
  const STATUS = {
  "Missed": { bar: "bg-red-500", chip: "bg-red-100 text-red-700", ring: "focus:ring-slate-400" },
  "In Progress": { bar: "bg-amber-400", chip: "bg-amber-100 text-amber-700", ring: "focus:ring-amber-400" },
  "Done": { bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700", ring: "focus:ring-emerald-400" },
  };  
  
  return (
  <div className='flex flex-col gap-2 bg-white h-full'>
  {todos.map((t) => 

      <div key={t.id} className="flex flex-col items-center rounded-xl overflow-hidden shadow-sm border border-stone-200">
        <div className={`${STATUS[t.status].bar} w-full h-2`}></div>  
        <div className="w-full p-4">
        <div className="w-full flex gap-2 justify-between">
          {t.isEditable ? <input className='w-full border-2 border-stone-200' value={editingTodo?.name || t.name} onChange={(e) => {setEditingTodo(prev => prev ? {...prev, name: e.target.value} : {...t, name: e.target.value})}}></input> 
          : <p className="text-base font-semibold text-stone-900 truncate">{t.name}</p>
          }
          <div className="flex items-center gap-4">
          {t.isEditable ? <Save size={16} color="blue" onClick={() => {handleEdit(t.id, !t.isEditable); saveEdit()}}/> : 
          <Pencil size={16} color="grey" onClick={() => {handleEdit(t.id, !t.isEditable); startEditing(t)}}/>
            }
          <Trash2 size={16} color="red"/>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
          <div className={`${STATUS[t.status].chip} inline-block text-xs font-medium rounded-full px-3 py-1 `}>
          <span>{t.status}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Calendar size={12}/>
            <span>Created at {t.createdAt}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Timer className='translate-y-[-1.1px]' size={12}/>
            <span>Due {t.deadline}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-stone-200">
          <p className="text-sm text-stone-600 leading-relaxed">{t.description}
          </p>
        </div>
        </div>

    </div>
  )}

  </div>
    

  )
}

export default TodoList
