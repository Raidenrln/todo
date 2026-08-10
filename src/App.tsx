import { TodoProvider } from './context/TodoContext'
import AppRoutes from './routers/AppRoutes'

function App() {
  return (
    <div className='bg-black'>
      <TodoProvider>
        <AppRoutes/>
      </TodoProvider>
    </div>

  )
}

export default App
