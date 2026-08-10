import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useTodos } from "../../context/TodoContext";

const ViewDetails = () => {
  const { todos } = useTodos();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const targetTodo = todos.find(p => p.id === id);
  if(!targetTodo) return
  return (
    <div className="fixed inset-0 bg-black/50 items-center flex justify-center" onClick={() => navigate("/todo")}>
      <div className="flex w-[80%] h-[70%] bg-white rounded">
        <div className="w-full h-[20%] bg-green-400 rounded-tl-sm rounded-tr-sm flex items-center p-4" onClick={(e) => e.stopPropagation()}>
          <span className="text-2xl"></span>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
