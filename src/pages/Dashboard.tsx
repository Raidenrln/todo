import { useNavigate } from 'react-router-dom'
// import { LuPencil } from "react-icons/lu";
// import { LuTrash2 } from "react-icons/lu";
const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className=''>
        <button>Dashboard</button>
        <button onClick={() => navigate("/todo")}>Todo</button>
      </div>
    </div>
  )
}

export default Dashboard
