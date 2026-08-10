import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import TodoRoutes from './TodoRoutes'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/todo/*' element={<TodoRoutes/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
